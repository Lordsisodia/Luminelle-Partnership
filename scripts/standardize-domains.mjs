import fs from 'fs';
import path from 'path';

const DOMAINS_DIR = path.join(process.cwd(), 'src/domains');

// The new structure:
// domain/
//   ui/ (pages, sections, components, layouts)
//   logic/
//   data/
//   hooks/

const UI_FOLDERS = [
    'components',
    'layouts',
    'pages',
    'sections'
];

const ROOT_FOLDERS = [
    'data',
    'hooks',
    'logic',
    'ui'
];

// Get all domains
const domains = fs.readdirSync(DOMAINS_DIR).filter(file => {
    return fs.statSync(path.join(DOMAINS_DIR, file)).isDirectory();
});

console.log(`Found domains: ${domains.join(', ')}`);

domains.forEach(domain => {
    const domainPath = path.join(DOMAINS_DIR, domain);

    // 1. Create Domain Root README
    const rootReadmePath = path.join(domainPath, 'README.md');
    if (!fs.existsSync(rootReadmePath)) {
        fs.writeFileSync(rootReadmePath, `# ${domain.charAt(0).toUpperCase() + domain.slice(1)} Domain\n\nDomain-specific logic for ${domain}.`);
        console.log(`Created README for ${domain}`);
    }

    // 2. Create Root Folders (data, hooks, logic, ui)
    ROOT_FOLDERS.forEach(folder => {
        const folderPath = path.join(domainPath, folder);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Created folder: ${domain}/${folder}`);
        }

        const folderReadmePath = path.join(folderPath, 'README.md');
        if (!fs.existsSync(folderReadmePath)) {
            const title = folder.charAt(0).toUpperCase() + folder.slice(1);
            fs.writeFileSync(folderReadmePath, `# ${title}\n\n${title} for the ${domain} domain.`);
            console.log(`Created README for ${domain}/${folder}`);
        }
    });

    // 3. Create UI Subfolders (components, layouts, pages, sections)
    UI_FOLDERS.forEach(folder => {
        const folderPath = path.join(domainPath, 'ui', folder);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Created folder: ${domain}/ui/${folder}`);
        }

        const folderReadmePath = path.join(folderPath, 'README.md');
        if (!fs.existsSync(folderReadmePath)) {
            const title = folder.charAt(0).toUpperCase() + folder.slice(1);
            fs.writeFileSync(folderReadmePath, `# ${title}\n\n${title} for the ${domain} domain.`);
            console.log(`Created README for ${domain}/ui/${folder}`);
        }
    });
});

console.log('Standardization complete.');
