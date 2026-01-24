#!/bin/bash

echo "🔍 Checking Lumelle Meta Pixel Deployment Status"
echo "=============================================="
echo ""

# Check if site is accessible
echo "1. Checking if site is accessible..."
if curl -s -o /dev/null -w "%{http_code}" https://lumellebeauty.co.uk | grep -q "200\|301\|302"; then
    echo "   ✅ Site is accessible"
else
    echo "   ❌ Site is not accessible"
fi
echo ""

# Check recent Vercel deployments (if URL is known)
echo "2. Recent commits pushed:"
cd /Users/shaansisodia/DEV/client-projects/lumelle-blogfix 2>/dev/null || cd /Users/shaansisodia/DEV/client-projects/lumelle
git log --oneline -3
echo ""

echo "3. Files changed in latest commits:"
git log --oneline --name-only -2 | tail -20
echo ""

echo "4. Meta Pixel files modified:"
echo "   - src/lib/analytics/metapixel.ts"
echo "   - src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx"
echo "   - src/domains/client/shop/cart/ui/pages/CartPage.tsx"
echo ""

echo "=============================================="
echo "📋 Next Steps:"
echo "  1. Check browser console for 'fbq' function"
echo "  2. Install Meta Pixel Helper extension"
echo "  3. Visit Events Manager in 24-48 hours"
echo "=============================================="
