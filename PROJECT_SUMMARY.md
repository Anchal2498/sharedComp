# Project Summary

## 🎯 What This Project Does

This is a **monorepo for creating React components as npm packages** with automatic dependency version management.

### Key Features

✅ **Each component is its own npm package**
- Independent versioning
- Can be published separately
- Reusable across projects

✅ **Automatic dependency updates**
- When Button v1.0.0 → v1.0.1
- Card's dependency automatically updates to ^1.0.1
- No manual version management needed

✅ **No third-party component libraries**
- Pure React components
- Custom CSS styling
- Full control over implementation

✅ **Production-ready build system**
- ESM and CJS formats
- TypeScript definitions
- CSS bundled with components

## 📦 What's Included

### Components

1. **Button Component** (`@sharedcomp/button`)
   - Variants: primary, secondary, outline
   - Sizes: sm, md, lg
   - Fully typed with TypeScript

2. **Card Component** (`@sharedcomp/card`)
   - Uses Button component internally
   - Demonstrates component dependencies
   - Customizable with title, description, content, footer

### Tools

1. **Version Bump Script** (`scripts/version-bump.js`)
   - Automatically bumps all package versions
   - Updates dependencies between packages
   - Rebuilds everything

2. **Demo Application** (`examples/demo/`)
   - Vite + React app
   - Shows all components in action
   - Test your changes visually

### Documentation

- **README.md** - Main documentation
- **QUICKSTART.md** - Get started in 3 steps
- **WORKFLOW.md** - Development workflows
- **ARCHITECTURE.md** - Technical architecture
- **PUBLISHING.md** - How to publish to npm

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build packages
npm run build

# 3. Run demo
cd examples/demo
npm install
npm run dev
```

## 🔄 How Automatic Updates Work

### Scenario: You update the Button component

1. **Edit Button** component in `packages/button/src/Button.tsx`

2. **Run Git release:**
   ```bash
   npm run release:patch
   ```

3. **What happens automatically:**
   - ✅ Button version: 1.0.0 → 1.0.1
   - ✅ Card version: 1.0.0 → 1.0.1
   - ✅ Card's dependency updates to Git URL with new tag
   - ✅ All packages rebuilt
   - ✅ Git tags created (button@1.0.1, card@1.0.1)
   - ✅ Pushed to repository

4. **Result:** Card automatically uses the updated Button! Users can install the new version from Git.

## 🎨 Component Usage

### Using Button

```tsx
import { Button } from '@sharedcomp/button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Using Card

```tsx
import { Card } from '@sharedcomp/card';

<Card
  title="My Card"
  description="Card description"
  actionButton={{
    label: "Action",
    onClick: () => console.log("Clicked!"),
    variant: "primary"
  }}
>
  <p>Card content</p>
</Card>
```

### Card Uses Button Internally

The Card component uses Button for its action button, demonstrating how components can depend on each other.

## 📊 Project Structure

```
sharedComp/
├── packages/              # Component packages
│   ├── button/           # Button component package
│   └── card/             # Card component package
├── scripts/              # Automation scripts
│   └── version-bump.js   # Auto version management
├── examples/             # Example applications
│   └── demo/            # Demo app
├── package.json         # Root workspace config
└── [documentation files]
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **esbuild** - Fast bundler
- **npm workspaces** - Monorepo management
- **Vite** - Demo app bundler

## 📈 Scalability

This architecture scales to:
- ✅ Hundreds of components
- ✅ Complex dependency trees
- ✅ Team collaboration
- ✅ CI/CD pipelines

## 🎯 Use Cases

### 1. Design System
Build a company-wide design system with versioned components.

### 2. Component Library
Create and publish reusable components to npm.

### 3. Micro-Frontend Components
Share components across multiple applications.

### 4. Open Source Components
Publish components for the community.

## 💡 Key Concepts

### Monorepo
Multiple packages in one repository, managed together.

### npm Workspaces
Native npm feature for managing monorepos.

### Semantic Versioning
- Patch: Bug fixes (1.0.X)
- Minor: New features (1.X.0)
- Major: Breaking changes (X.0.0)

### Dependency Management
Automatic updates when dependencies change versions.

## 🔐 Best Practices Implemented

✅ TypeScript for type safety
✅ Semantic versioning
✅ Peer dependencies for React
✅ Both ESM and CJS builds
✅ CSS co-located with components
✅ Comprehensive documentation
✅ Example application

## 🚀 Next Steps

1. **Explore the code** - Look at Button and Card components
2. **Run the demo** - See components in action
3. **Make changes** - Edit a component
4. **Test Git publishing** - Run `npm run release:patch`
5. **Install from Git** - Try in another project
6. **Create new component** - Follow the pattern

## 📚 Learning Resources

- Read [QUICKSTART.md](./QUICKSTART.md) for immediate usage
- Read [GIT_PUBLISHING.md](./GIT_PUBLISHING.md) for Git publishing (recommended)
- Read [WORKFLOW.md](./WORKFLOW.md) for development workflows
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Read [PUBLISHING.md](./PUBLISHING.md) for npm publishing (alternative)

## 🎉 Success Criteria

You'll know the setup works when:
- ✅ `npm run build` succeeds
- ✅ Demo app runs at http://localhost:5173
- ✅ You see Button and Card components
- ✅ `npm run release:patch` creates Git tags and pushes
- ✅ Components can be installed from Git repository

## 🤝 Contributing

To add a new component:
1. Copy the structure from `packages/button/`
2. Create your component
3. Build and test
4. Document in README

## 📞 Support

If something doesn't work:
1. Check [QUICKSTART.md](./QUICKSTART.md)
2. Check [WORKFLOW.md](./WORKFLOW.md) troubleshooting section
3. Ensure Node.js version >= 20.19.0
4. Run `npm install` and `npm run build`

---

**Built with ❤️ for creating scalable React component libraries**