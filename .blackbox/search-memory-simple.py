#!/usr/bin/env python3
"""
Simple semantic search for Blackbox4
Uses ChromaDB for vector search and sentence-transformers for embeddings
"""
import sys
import os
from pathlib import Path
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import hashlib

# Configuration
BLACKBOX_ROOT = Path(__file__).parent
CHROMA_DB_PATH = BLACKBOX_ROOT / ".memory" / "extended" / "chroma-db"
COLLECTION_NAME = "blackbox_memory"

def get_embedding_model():
    """Load or download the embedding model"""
    print("🔄 Loading embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✅ Embedding model loaded")
    return model

def get_chroma_client():
    """Get or create ChromaDB client"""
    CHROMA_DB_PATH.mkdir(parents=True, exist_ok=True)
    client = chromadb.PersistentClient(path=str(CHROMA_DB_PATH))
    return client

def get_or_create_collection(client):
    """Get or create the memory collection"""
    try:
        collection = client.get_collection(name=COLLECTION_NAME)
        print(f"📚 Found existing collection with {collection.count()} documents")
    except:
        collection = client.create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )
        print("📚 Created new collection")
    return collection

def index_file(collection, model, file_path):
    """Index a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if too large or empty
        if len(content) < 50 or len(content) > 100000:
            return False

        # Create embedding
        embedding = model.encode(content).tolist()

        # Create document ID from file path
        doc_id = hashlib.md5(str(file_path).encode()).hexdigest()

        # Add to collection
        collection.add(
            documents=[content],
            embeddings=[embedding],
            metadatas=[{"source": str(file_path), "type": "file"}],
            ids=[doc_id]
        )
        return True
    except Exception as e:
        return False

def index_blackbox(collection, model):
    """Index all markdown files in blackbox"""
    print("\n🔍 Scanning for markdown files...")

    md_files = list(BLACKBOX_ROOT.rglob("*.md"))
    total = len(md_files)
    indexed = 0
    skipped = 0

    print(f"📄 Found {total} markdown files")

    for i, file_path in enumerate(md_files, 1):
        # Skip certain directories
        if any(x in str(file_path) for x in ['.git', 'node_modules', '__pycache__']):
            skipped += 1
            continue

        if i % 100 == 0:
            print(f"\r[{i}/{total}] Processed {indexed} files", end="")

        if index_file(collection, model, file_path):
            indexed += 1
        else:
            skipped += 1

    print(f"\n\n✅ Indexed {indexed} files, skipped {skipped}")
    return indexed

def search(collection, model, query, n_results=5):
    """Search the memory"""
    print(f"\n🔍 Searching for: '{query}'")

    # Create query embedding
    query_embedding = model.encode(query).tolist()

    # Search
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    if not results['documents'][0]:
        print("❌ No results found")
        return

    # Display results
    print(f"\n📊 Found {len(results['documents'][0])} results:\n")

    for i, (doc, metadata, distance) in enumerate(zip(
        results['documents'][0],
        results['metadatas'][0],
        results['distances'][0]
    ), 1):
        # Convert distance to similarity score
        similarity = 1 - distance
        source = metadata.get('source', 'Unknown')

        # Get preview
        preview = doc[:200] + "..." if len(doc) > 200 else doc

        print(f"{i}. **{source}**")
        print(f"   Similarity: {similarity:.2%}")
        print(f"   Preview: {preview}")
        print()

def main():
    """Main entry point"""
    print("🧠 Blackbox4 Semantic Search")
    print("=" * 50)

    # Load model
    model = get_embedding_model()

    # Get ChromaDB client
    client = get_chroma_client()

    # Get or create collection
    collection = get_or_create_collection(client)

    # Check if we need to index
    if collection.count() == 0:
        print("\n📭 No indexed documents found. Indexing now...")
        index_blackbox(collection, model)
    else:
        print(f"\n✅ Already indexed {collection.count()} documents")

    # Get query
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
    else:
        query = input("\nEnter your search query: ")

    if not query:
        print("❌ No query provided")
        sys.exit(1)

    # Search
    search(collection, model, query)

if __name__ == "__main__":
    main()
