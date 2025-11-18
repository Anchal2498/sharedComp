# Architecture Documentation

## 🏗️ System Overview

This monorepo uses **npm workspaces** to manage multiple React component packages with automatic dependency version synchronization.

## 📁 Project Structure

```
sharedComp/
├── packages/                    # Component packages
│   ├── button/
│   │   ├── src/
│   │   │   ├── Button.tsx      # Component implementation
│   │   │   ├── Button.css      # Component styles
│   │   │   └── index.ts        # Public exports
│   │   ├── dist/               # Build output (generated)
│   │   │   ├── index.js        # CommonJS bundle
│   │   │   ├── index.esm.js    # ES Module bundle
│   │   │   └── index.d.ts      # TypeScript definitions
│   │   ├── package.json        # Package configuration
│   │   └── tsconfig.json       # TypeScript config
│   └── card/
│       └── [same structure]
├── scripts/
│   └── version-bump.js         # Automatic version management
├── examples/
│   └── demo/                   # Demo application
├── package.json                # Root workspace config
└── README.md
```

## 🔧 Core Technologies

### Build System
- **esbuild**: Fast JavaScript bundler
  - Builds ESM and CJS formats
  - Bundles CSS with components
  - Extremely fast compilation

### TypeScript
- Type checking and definitions
- Generates `.d.ts` files for consumers
- Strict mode enabled

### npm Workspaces
- Manages multiple packages in one repo
- Symlinks packages for local development
- Shared dependency installation

## 🔄 How It Works

### 1. Package Structure

Each component is an independent npm package:

```json
{
  "name": "@anchalverma/button",
  "version": "1.0.0",
  "main": "dist/index.js",        // CommonJS entry
  "module": "dist/index.esm.js",  // ESM entry
  "types": "dist/index.d.ts",     // TypeScript definitions
  "peerDependencies": {
    "react": "^18.0.0"            // React is peer dependency
  }
}
```

### 2. Build Process

```
Source Code (src/)
    ↓
TypeScript Compilation (types only)
    ↓
esbuild (ESM + CJS bundles)
    ↓
Output (dist/)
```

**Build commands:**
```bash
# ESM build
esbuild src/index.ts --bundle --format=esm --outfile=dist/index.esm.js

# CJS build
esbuild src/index.ts --bundle --format=cjs --outfile=dist/index.js

# Types
tsc --emitDeclarationOnly --declaration --declarationDir dist
```

### 3. Dependency Management

When Card depends on Button:

```json
// packages/card/package.json
{
  "dependencies": {
    "@sharedcomp/button": "^1.0.0"
  }
}
```

npm workspaces automatically symlinks the local Button package during development.

### 4. Version Synchronization

The `version-bump.js` script:

1. **Reads all packages** in `packages/` directory
2. **Bumps versions** based on type (patch/minor/major)
3. **Updates dependencies** in all packages
4. **Rebuilds everything**

Example flow:
```
Button: 1.0.0 → 1.0.1
Card dependencies: @sharedcomp/button: ^1.0.0 → ^1.0.1
Card: 1.0.0 → 1.0.1
```

## 🎯 Design Decisions

### Why npm Workspaces?

**Pros:**
- Native to npm (no extra tools)
- Simple configuration
- Good IDE support
- Automatic local linking

**Alternatives considered:**
- Lerna (more complex, overkill for this use case)
- Yarn workspaces (requires Yarn)
- pnpm workspaces (requires pnpm)

### Why esbuild?

**Pros:**
- Extremely fast (10-100x faster than webpack)
- Zero configuration
- Bundles CSS automatically
- Supports both ESM and CJS

**Alternatives considered:**
- Rollup (slower, more config needed)
- Webpack (much slower, complex config)
- Vite library mode (good but esbuild is simpler)

### Why Both ESM and CJS?

**ESM (index.esm.js):**
- Modern bundlers (Vite, Webpack 5+)
- Tree-shaking support
- Future-proof

**CJS (index.js):**
- Node.js compatibility
- Older bundlers
- Wider compatibility

### Why Peer Dependencies for React?

React should be installed once in the consuming project:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

This prevents multiple React instances and version conflicts.

## 🔐 Version Strategy

### Semantic Versioning (SemVer)

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (2.0.0)
  - Changed component API
  - Removed props
  - Changed behavior

- **MINOR**: New features (1.1.0)
  - New props (backward compatible)
  - New components
  - New features

- **PATCH**: Bug fixes (1.0.1)
  - Bug fixes
  - Style tweaks
  - Documentation

### Dependency Versioning

Using caret (`^`) ranges:
```json
{
  "dependencies": {
    "@sharedcomp/button": "^1.0.0"
  }
}
```

Allows: `1.0.0`, `1.0.1`, `1.1.0`
Blocks: `2.0.0`

## 🚀 Build Optimization

### Bundle Size

Each component bundles only what it needs:

```bash
# Button component
dist/index.esm.js    # ~2KB (minified)
dist/index.js        # ~2KB (minified)
dist/index.d.ts      # ~1KB
```

### Tree Shaking

ESM format enables tree shaking in consuming projects:

```tsx
// Only Button code is included
import { Button } from '@sharedcomp/button';
```

### CSS Bundling

CSS is bundled with JavaScript:
- No separate CSS imports needed
- Scoped to component
- Automatically loaded

## 🔍 Development Workflow

### Local Development

```
1. Edit component → 2. Build → 3. Test in demo
         ↑                              ↓
         └──────── Iterate ←────────────┘
```

### Publishing Workflow

```
1. Make changes
         ↓
2. Run version:patch/minor/major
         ↓
3. Automatic: version bump + dependency update + rebuild
         ↓
4. npm publish --workspaces
         ↓
5. Packages available on npm
```

## 🧩 Component Architecture

### Component Pattern

```tsx
// 1. Props interface
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// 2. Component implementation
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button className={`btn btn--${variant}`} {...props} />;
}

// 3. Export from index
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Styling Pattern

```css
/* BEM-like naming */
.btn { /* base styles */ }
.btn--primary { /* variant */ }
.btn--sm { /* size */ }
```

## 📊 Scalability

### Adding More Components

The architecture scales linearly:
- 10 components = 10 packages
- 100 components = 100 packages

Each package is independent, so:
- Build times don't compound
- Dependencies are explicit
- Testing is isolated

### Performance Considerations

- **Build**: esbuild is fast enough for 100+ packages
- **Install**: npm workspaces handles hoisting efficiently
- **Development**: Only rebuild changed packages

## 🔒 Type Safety

### Full TypeScript Support

```tsx
import { Button, type ButtonProps } from '@sharedcomp/button';

// TypeScript knows all props
<Button variant="primary" size="lg" onClick={handler} />
```

### Generated Definitions

```typescript
// dist/index.d.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
export function Button(props: ButtonProps): JSX.Element;
```

## 🎓 Best Practices

1. **One component per package** - Easier to version and publish
2. **Explicit dependencies** - Always declare what you use
3. **Peer dependencies for React** - Avoid version conflicts
4. **Build before publish** - Always test the built output
5. **Semantic versioning** - Follow SemVer strictly
6. **TypeScript strict mode** - Catch errors early
7. **CSS co-location** - Keep styles with components

## 🔮 Future Enhancements

Possible improvements:
- Add Storybook for component documentation
- Add unit tests (Jest + React Testing Library)
- Add visual regression tests
- Add automated publishing (GitHub Actions)
- Add component playground
- Add CSS-in-JS option (styled-components)
- Add theme system