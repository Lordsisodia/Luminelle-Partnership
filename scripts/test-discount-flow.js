/**
 * Quick Test Script for Discount/Checkout Flow
 *
 * Run this in your browser console to automate the testing process
 */

console.log('%c🔍 Discount Flow Test Script', 'font-size: 16px; font-weight: bold; color: #0066cc;');
console.log('%c=====================================', 'font-size: 14px; color: #0066cc;');

// Step 1: Clear all cart data
console.log('\n%cStep 1: Clearing cart data...', 'font-weight: bold; color: #ff6600;');
localStorage.removeItem('lumelle_cart');
localStorage.removeItem('lumelle_cart_discount_code');
localStorage.removeItem('lumelle_cart_key');
localStorage.removeItem('lumelle_pending_discount_code');
console.log('✅ Cart data cleared');

// Step 2: Check current state
console.log('\n%cStep 2: Current localStorage state:', 'font-weight: bold; color: #ff6600;');
console.log('lumelle_cart:', localStorage.getItem('lumelle_cart'));
console.log('lumelle_cart_discount_code:', localStorage.getItem('lumelle_cart_discount_code'));
console.log('lumelle_cart_key:', localStorage.getItem('lumelle_cart_key'));

// Step 3: Instructions
console.log('\n%cStep 3: Manual Test Steps', 'font-weight: bold; color: #ff6600;');
console.log('%cPlease follow these steps:', 'font-weight: bold;');
console.log('\n1. Navigate to a shower cap product page');
console.log('2. Open browser DevTools (F12) → Console tab');
console.log('3. Filter console by: 🔍');
console.log('4. Add 2 shower caps to cart');
console.log('5. Check console for discount logs');
console.log('6. Click checkout button');
console.log('7. Check if final URL has ?discount= parameter');

// Step 4: Helper to check cart state
console.log('\n%cStep 4: Cart State Checker', 'font-weight: bold; color: #ff6600;');
window.checkCartState = () => {
  console.log('\n%cCurrent Cart State:', 'font-weight: bold; color: #0066cc;');
  console.log('Items:', localStorage.getItem('lumelle_cart'));
  console.log('Discount Code:', localStorage.getItem('lumelle_cart_discount_code'));
  console.log('Cart Key:', localStorage.getItem('lumelle_cart_key'));
};
console.log('%cRun checkCartState() anytime to see current state', 'color: #666;');

// Step 5: Helper to simulate adding item (for testing)
console.log('\n%cStep 5: Test Helpers', 'font-weight: bold; color: #ff6600;');
window.getCartFromContext = () => {
  // This will work if React DevTools is installed
  console.log('If you have React DevTools, check the CartContext value');
};

console.log('\n%c=====================================', 'font-size: 14px; color: #0066cc;');
console.log('%c✅ Test script loaded!', 'font-size: 14px; font-weight: bold; color: #00cc66;');
console.log('\n%cNext: Refresh the page and follow the manual test steps above', 'color: #ff6600; font-weight: bold;');
