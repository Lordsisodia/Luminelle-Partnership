#!/bin/bash
#
# Session Capture Verification Script
# Run this immediately after a Claude Code session ends
# to verify the hooks fired correctly.
#

echo "=== Blackbox5 Session Capture Verification ==="
echo ""

MEMORY_BASE="./blackbox5/5-project-memory/lumelle"

# Check if session folder was created
echo "1. Checking for new session folder..."
LATEST_SESSION=$(ls -t "$MEMORY_BASE/operations/sessions/" 2>/dev/null | head -1)
if [[ -n "$LATEST_SESSION" ]]; then
    echo "   ✅ Found: $LATEST_SESSION"
    SESSION_PATH="$MEMORY_BASE/operations/sessions/$LATEST_SESSION"

    # Check files in session folder
    echo ""
    echo "2. Verifying session files..."
    for file in context.json metrics.json README.md transcript.jsonl; do
        if [[ -f "$SESSION_PATH/$file" ]]; then
            echo "   ✅ $file"
        else
            echo "   ❌ $file (missing)"
        fi
    done

    # Show context summary
    echo ""
    echo "3. Session context summary:"
    if [[ -f "$SESSION_PATH/context.json" ]]; then
        jq -r '"   Session ID: \(.session_id)
   Timestamp: \(.timestamp)
   Working Directory: \(.working_directory)
   Git Branch: \(.git_branch)
   Duration: \(.duration_minutes) minutes
   Git Changes: \(.git_changes_count) files"' "$SESSION_PATH/context.json" 2>/dev/null || echo "   Could not parse context.json"
    fi

else
    echo "   ❌ No session folder found"
fi

# Check timeline update
echo ""
echo "4. Checking timeline update..."
if [[ -f "$MEMORY_BASE/project/timeline.yaml" ]]; then
    # Count session events in timeline
    SESSION_EVENTS=$(grep -c "type: session" "$MEMORY_BASE/project/timeline.yaml" 2>/dev/null || echo "0")
    if [[ "$SESSION_EVENTS" -gt 0 ]]; then
        echo "   ✅ Found $SESSION_EVENTS session event(s) in timeline"
        echo ""
        echo "   Latest session event:"
        grep -A3 "type: session" "$MEMORY_BASE/project/timeline.yaml" | tail -4 | sed 's/^/     /'
    else
        echo "   ❌ No session events found in timeline"
    fi
else
    echo "   ⚠️  timeline.yaml does not exist"
fi

# Check session log
echo ""
echo "5. Checking session log..."
if [[ -f "$MEMORY_BASE/operations/session-log.txt" ]]; then
    LOG_ENTRIES=$(wc -l < "$MEMORY_BASE/operations/session-log.txt" 2>/dev/null || echo "0")
    echo "   ✅ Session log has $LOG_ENTRIES entries"
    echo ""
    echo "   Latest log entry:"
    tail -1 "$MEMORY_BASE/operations/session-log.txt" | sed 's/^/     /'
else
    echo "   ⚠️  session-log.txt does not exist"
fi

# Check for reflections (async, may not exist immediately)
echo ""
echo "6. Checking for reflections (async, may take ~30s)..."
REFLECTION_COUNT=$(ls -1 "$MEMORY_BASE/operations/reflections/" 2>/dev/null | wc -l)
if [[ "$REFLECTION_COUNT" -gt 0 ]]; then
    echo "   ✅ Found $REFLECTION_COUNT reflection(s)"
else
    echo "   ⏳ No reflections yet (may take ~30s to generate)"
fi

echo ""
echo "=== Verification Complete ==="
echo ""
echo "To see the latest session details:"
echo "  cat \"$SESSION_PATH/README.md\""
echo ""
