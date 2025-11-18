# Development Workflow Guide

## 🔄 Daily Development Workflow

### Making Changes to a Component

1. **Edit the component** in `packages/<component-name>/src/`
2. **Build the component:**
   ```bash
   npm run build:<component-name>
   # or build all
   npm run build
   ```
3. **Test locally** in the demo app or your own project

### When You Update a Component That Others Depend On

Example: You update the Button component, and Card uses Button.

**Option 1: Git Publishing (Recommended)**
```bash
# This will:
# - Bump all package versions
# - Update dependencies automatically
# - Rebuild everything
# - Create Git tags
# - Push to repository
npm run release:patch
```

**Option 2: Version Bump Only (For Testing)**
```bash
# Bump versions without publishing
npm run version:patch:git

# Then manually publish later
npm run publish:git
```

**Option 3: Build Without Version Change**
```bash
# Just rebuild if you're still developing
npm run build
```

## 📦 Publishing Workflow

### Git Publishing (Recommended)

**Quick Release:**
```bash
# Make your changes, then:
npm run release:patch  # For bug fixes
npm run release:minor  # For new features
npm run release:major  # For breaking changes
```

**What happens:**
1. All package versions are bumped
2. Dependencies are updated to Git URLs
3. Everything is rebuilt
4. Changes are committed
5. Git tags are created
6. Everything is pushed to repository

**Users install with:**
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.0
```

See [GIT_PUBLISHING.md](./GIT_PUBLISHING.md) for complete guide.

### npm Publishing (Alternative)

**First Time Setup:**
1. Create npm account at https://www.npmjs.com/signup
2. Login: `npm login`
3. Update package scopes in `package.json` files

**Publishing:**
```bash
npm run version:patch  # Bump versions
npm publish --workspaces --access public  # Publish to npm
```

See [PUBLISHING.md](./PUBLISHING.md) for complete npm guide.

## 🧪 Testing Components Locally

### In the Demo App

```bash
cd examples/demo
npm install
npm run dev
```

Visit http://localhost:5173 to see your components in action.

### In Another Local Project

1. **Link packages:**
   ```bash
   # In monorepo root
   npm run link:local
   ```

2. **In your test project:**
   ```bash
   npm link @sharedcomp/button
   npm link @sharedcomp/card
   ```

3. **Use the components:**
   ```tsx
   import { Button } from '@sharedcomp/button';
   import { Card } from '@sharedcomp/card';
   ```

4. **Unlink when done:**
   ```bash
   npm unlink @sharedcomp/button
   npm unlink @sharedcomp/card
   npm install
   ```

## 🆕 Adding a New Component

### Step-by-Step

1. **Create directory structure:**
   ```bash
   mkdir -p packages/my-component/src
   ```

2. **Copy package.json from existing component** and modify:
   ```bash
   cp packages/button/package.json packages/my-component/
   # Edit the name, description, etc.
   ```

3. **Copy tsconfig.json:**
   ```bash
   cp packages/button/tsconfig.json packages/my-component/
   ```

4. **Create your component:**
   ```bash
   # packages/my-component/src/MyComponent.tsx
   # packages/my-component/src/MyComponent.css
   # packages/my-component/src/index.ts
   ```

5. **Add build script to root package.json:**
   ```json
   {
     "scripts": {
       "build:my-component": "npm run build --workspace=@sharedcomp/my-component"
     }
   }
   ```

6. **Install dependencies and build:**
   ```bash
   npm install
   npm run build:my-component
   ```

### Using Another Component as Dependency

If your new component needs to use an existing component:

1. **Add to package.json dependencies:**
   ```json
   {
     "dependencies": {
       "@sharedcomp/button": "^1.0.0"
     }
   }
   ```

2. **Add to build externals:**
   ```json
   {
     "scripts": {
       "build:esm": "esbuild src/index.ts --bundle --format=esm --outfile=dist/index.esm.js --external:react --external:react-dom --external:@sharedcomp/button"
     }
   }
   ```

3. **Import and use:**
   ```tsx
   import { Button } from '@sharedcomp/button';
   
   export function MyComponent() {
     return <Button>Click me</Button>;
   }
   ```

## 🔍 Troubleshooting

### "Cannot find module '@sharedcomp/button'"

**Solution:**
```bash
# Rebuild all packages
npm run build

# Or install dependencies
npm install
```

### Changes Not Reflecting

**Solution:**
```bash
# Clean and rebuild
rm -rf packages/*/dist
npm run build
```

### Version Conflicts

**Solution:**
```bash
# Run version bump to sync everything
npm run version:patch
```

### TypeScript Errors

**Solution:**
```bash
# Check tsconfig.json in the package
# Make sure all dependencies are installed
npm install
```

## 📊 Version Bump Strategy

- **Patch (1.0.X):** Bug fixes, small tweaks, no API changes
- **Minor (1.X.0):** New features, backward compatible
- **Major (X.0.0):** Breaking changes, API modifications

## 🎯 Best Practices

1. **Always build before publishing**
2. **Test in demo app before publishing**
3. **Use semantic versioning correctly**
4. **Document component APIs in README**
5. **Keep components focused and single-purpose**
6. **Write TypeScript interfaces for all props**
7. **Include CSS with components**
8. **Mark React as peerDependency, not dependency**

## 🚀 Quick Commands Reference

```bash
# Install everything
npm install

# Build all packages
npm run build

# Build specific package
npm run build:button
npm run build:card

# Bump versions
npm run version:patch
npm run version:minor
npm run version:major

# Link for local development
npm run link:local

# Run demo app
cd examples/demo && npm run dev

# Publish to npm
npm publish --workspaces --access public
```