#!/bin/bash

echo "📦 Checking DynUI-Max bundle size..."

# Build production bundle
pnpm build

# Check if bundle file exists
if [ ! -f "dist/dynui-max.umd.js" ]; then
    echo "❌ Bundle file not found. Make sure build completed successfully."
    exit 1
fi

# Get file size
BUNDLE_SIZE=$(stat -f%z dist/dynui-max.umd.js 2>/dev/null || stat -c%s dist/dynui-max.umd.js)
BUNDLE_SIZE_KB=$((BUNDLE_SIZE / 1024))

echo "Current bundle size: ${BUNDLE_SIZE_KB}KB"
echo "Limit: 150KB"

if [ $BUNDLE_SIZE_KB -gt 150 ]; then
    echo "❌ Bundle size exceeds 150KB limit!"
    
    # Analyze what's taking space
    npx webpack-bundle-analyzer dist/dynui-max.umd.js --mode static --report-filename bundle-analysis.html
    echo "📊 Bundle analysis saved to bundle-analysis.html"
    
    exit 1
else
    echo "✅ Bundle size is within limits (${BUNDLE_SIZE_KB}KB/150KB)"
fi

# Check gzip size as well
if command -v gzip >/dev/null 2>&1; then
    GZIP_SIZE=$(gzip -c dist/dynui-max.umd.js | wc -c)
    GZIP_SIZE_KB=$((GZIP_SIZE / 1024))
    echo "Gzip size: ${GZIP_SIZE_KB}KB"
fi