#!/usr/bin/env node

/**
 * Chrome DevTools MCP Demo
 *
 * This script demonstrates how to use Chrome DevTools MCP for testing.
 * It's designed to be used WITHIN Claude Code, not as a standalone script.
 *
 * INSTRUCTIONS FOR USE IN CLAUDE CODE:
 *
 * 1. Start your dev server: npm run dev
 * 2. In Claude Code, run these commands one by one:
 *
 *    # Navigate to your app
 *    mcp__chrome-devtools__navigate_page(url="http://localhost:5173")
 *
 *    # Take a snapshot to see the page structure
 *    mcp__chrome-devtools__take_snapshot()
 *
 *    # List all console messages
 *    mcp__chrome-devtools__list_console_messages()
 *
 *    # Filter for errors only
 *    mcp__chrome-devtools__list_console_messages(types=["error"])
 *
 *    # Get details of a specific error (replace msgid with actual ID)
 *    mcp__chrome-devtools__get_console_message(msgid=0)
 *
 *    # Take a screenshot
 *    mcp__chrome-devtools__take_screenshot(fullPage=true)
 *
 * 3. Interact with the page:
 *
 *    # Click an element (replace uid with actual ID from snapshot)
 *    mcp__chrome-devtools__click(uid="button-uid")
 *
 *    # Fill a form field
 *    mcp__chrome-devtools__fill(uid="input-uid", value="test@example.com")
 *
 *    # Press a key
 *    mcp__chrome-devtools__press_key(key="Enter")
 *
 * 4. Check console again after interactions
 *
 * COMMON WORKFLOWS:
 */

console.log(`
🎯 Common Testing Workflows
============================

1. CONSOLE MONITORING
   ------------------
   Purpose: Check for JavaScript errors, warnings, and logs

   Steps:
   a) Navigate to page
   b) Wait for page load
   c) List console messages
   d) Filter by error type
   e) Get detailed error information

   Example commands:
   - navigate_page(url="http://localhost:5173")
   - wait_for(text="Welcome", timeout=5000)
   - list_console_messages(types=["error", "warning"])
   - get_console_message(msgid=0)


2. VISUAL TESTING
   ---------------
   Purpose: Ensure UI renders correctly

   Steps:
   a) Navigate to page
   b) Take initial snapshot
   c) Take screenshot
   d) Compare with baseline

   Example commands:
   - navigate_page(url="http://localhost:5173")
   - take_snapshot()
   - take_screenshot(fullPage=true, filePath="baseline.png")


3. FORM TESTING
   -------------
   Purpose: Test form validation and submission

   Steps:
   a) Navigate to form
   b) Take snapshot to find fields
   c) Fill form fields
   d) Submit form
   e) Check for errors

   Example commands:
   - navigate_to(url="http://localhost:5173/contact")
   - take_snapshot()
   - fill_form(elements=[{"uid": "name-field", "value": "Test User"}])
   - click(uid="submit-button")
   - list_console_messages(types=["error"])


4. NAVIGATION TESTING
   ------------------
   Purpose: Test page navigation and routing

   Steps:
   a) Navigate to home page
   b) Click navigation links
   c) Verify page changes
   d) Check console for errors

   Example commands:
   - navigate_page(url="http://localhost:5173")
   - click(uid="nav-about")
   - wait_for(text="About Us")
   - list_console_messages()


5. RESPONSIVE TESTING
   ------------------
   Purpose: Test different screen sizes

   Steps:
   a) Navigate to page
   b) Resize viewport
   c) Take screenshot
   d) Check for console errors

   Example commands:
   - navigate_page(url="http://localhost:5173")
   - resize_page(width=375, height=667)  // Mobile
   - take_screenshot(filePath="mobile.png")
   - resize_page(width=1920, height=1080)  // Desktop
   - take_screenshot(filePath="desktop.png")


6. NETWORK MONITORING
   ------------------
   Purpose: Check API calls and resource loading

   Steps:
   a) Navigate to page
   b) List network requests
   c) Check for failed requests
   d) Get request details

   Example commands:
   - navigate_page(url="http://localhost:5173")
   - list_network_requests()
   - get_network_request(reqid=0)  // Get first request


TIPS FOR BEST RESULTS:
----------------------
✓ Always take a snapshot first to understand page structure
✓ Use wait_for() to ensure elements are loaded before interacting
✓ Check console messages after each interaction
✓ Take screenshots at key points for visual documentation
✓ Test both positive and negative scenarios
✓ Test edge cases (empty fields, invalid data, etc.)

`);

console.log('📚 For more information, check the MCP tool descriptions in Claude Code.\n');
