# Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build All Packages
```bash
npm run build
```

### 3. Run the Demo
```bash
cd examples/demo
npm install
npm run dev
```

Open http://localhost:5173 to see your components!

## 🎯 Common Tasks

### Update a Component
```bash
# 1. Edit the component file
# 2. Rebuild
npm run build:button

# 3. Test in demo
cd examples/demo && npm run dev
```

### Publish to Git (After Making Changes)
```bash
npm run release:patch
```

This automatically:
- ✅ Bumps all package versions
- ✅ Updates dependencies between packages
- ✅ Rebuilds everything
- ✅ Creates Git tags
- ✅ Pushes to repository

Users can then install:
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.1
```

### Add a New Component
```bash
# 1. Create structure
mkdir -p packages/my-component/src

# 2. Copy template files
cp packages/button/package.json packages/my-component/
cp packages/button/tsconfig.json packages/my-component/

# 3. Edit package.json name
# Change "name": "@sharedcomp/my-component"

# 4. Create your component files
# packages/my-component/src/MyComponent.tsx
# packages/my-component/src/index.ts

# 5. Build
npm install
npm run build
```

## 📚 What's Included

- **@sharedcomp/button** - Customizable button with variants and sizes
- **@sharedcomp/card** - Card component that uses the button
- **Automatic versioning** - Dependencies update automatically
- **TypeScript** - Full type safety
- **Demo app** - See components in action

## 🔗 Key Files

- `packages/*/src/` - Component source code
- `packages/*/package.json` - Package configuration
- `scripts/version-bump.js` - Auto-update dependencies
- `examples/demo/` - Demo application

## 💡 Pro Tips

1. **Always build before testing:** `npm run build`
2. **Use Git publishing for updates:** `npm run release:patch`
3. **Check the demo app:** See your changes visually
4. **Read GIT_PUBLISHING.md:** For Git publishing details
5. **Read WORKFLOW.md:** For detailed workflows

## 🆘 Need Help?

- **Build fails?** Run `npm install` first
- **Changes not showing?** Rebuild with `npm run build`
- **Import errors?** Check package names in imports
- **Git publishing fails?** Make sure you committed all changes
- **Can't find published version?** Check `git tag` to see all tags

## 🚀 Next Steps

1. Explore the existing components in `packages/`
2. Try modifying the Button component
3. Run `npm run release:patch` to publish to Git
4. Install from Git in another project
5. Create your own component
6. Read GIT_PUBLISHING.md for advanced publishing

Happy coding! 🎉