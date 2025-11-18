#!/bin/bash

echo "🚀 Setting up SharedComp monorepo..."
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install and build button package
echo ""
echo "🔘 Building Button component..."
cd packages/button
npm install
npm run build
cd ../..

# Install and build card package
echo ""
echo "🎴 Building Card component..."
cd packages/card
npm install
npm run build
cd ../..

# Install demo dependencies
echo ""
echo "🎨 Setting up demo app..."
cd examples/demo
npm install
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run 'npm run build' to build all packages"
echo "  2. Run 'cd examples/demo && npm run dev' to see the demo"
echo "  3. Read QUICKSTART.md for more information"
echo ""