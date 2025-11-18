# SharedComp - React Component Monorepo

A monorepo architecture for creating and managing React components as individual npm packages with automatic dependency version management.

## 🏗️ Architecture

This project uses **npm workspaces** to manage multiple component packages in a single repository. Each component:
- Has its own `package.json` with independent versioning
- Can depend on other components in the monorepo
- Automatically gets updated when dependencies change
- Is built as both ESM and CJS modules
- Includes TypeScript definitions

## 📦 Packages

- **@sharedcomp/button** - A customizable button component
- **@sharedcomp/card** - A card component that uses the button component

## 🚀 Getting Started

### Installation

```bash
# Install all dependencies
npm install

# Build all packages
npm run build
```

### Building Individual Packages

```bash
# Build button component
npm run build:button

# Build card component
npm run build:card
```

## 🔄 Version Management

The monorepo includes an automatic version bumping system that updates both package versions and their dependencies.

### Bump Versions

```bash
# Bump patch version (1.0.0 → 1.0.1)
npm run version:patch

# Bump minor version (1.0.0 → 1.1.0)
npm run version:minor

# Bump major version (1.0.0 → 2.0.0)
npm run version:major
```

**What happens when you bump versions:**
1. All package versions are incremented
2. Dependencies between packages are automatically updated
3. All packages are rebuilt

For example, if you run `npm run version:patch`:
- `@sharedcomp/button` goes from `1.0.0` → `1.0.1`
- `@sharedcomp/card` goes from `1.0.0` → `1.0.1`
- `@sharedcomp/card`'s dependency on `@sharedcomp/button` is updated to `^1.0.1`

## 📝 Creating a New Component

1. **Create package directory:**
```bash
mkdir -p packages/your-component/src
```

2. **Create package.json:**
```json
{
  "name": "@anchalverma/your-component",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "npm run build:esm && npm run build:cjs && npm run build:types",
    "build:esm": "esbuild src/index.ts --bundle --format=esm --outfile=dist/index.esm.js --external:react --external:react-dom",
    "build:cjs": "esbuild src/index.ts --bundle --format=cjs --outfile=dist/index.js --external:react --external:react-dom",
    "build:types": "tsc --emitDeclarationOnly --declaration --declarationDir dist"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

3. **Create your component:**
```tsx
// packages/your-component/src/YourComponent.tsx
export function YourComponent() {
  return <div>Your Component</div>;
}
```

4. **Create index file:**
```ts
// packages/your-component/src/index.ts
export { YourComponent } from './YourComponent';
```

5. **Build and use:**
```bash
npm run build
```

## 🔗 Using Components Locally

To test components locally in another project:

```bash
# In this monorepo
npm run link:local

# In your test project
npm link @sharedcomp/button
npm link @sharedcomp/card
```

## 📤 Publishing Options

### Option 1: Publish to Git Repository (Recommended for Private Use)

**Quick Release:**
```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new features)
npm run release:minor

# Major release (breaking changes)
npm run release:major
```

**What happens:**
- ✅ Bumps all package versions
- ✅ Updates dependencies automatically
- ✅ Creates Git tags for each version
- ✅ Pushes to your Git repository

**Installation by users:**
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.0
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.0
```

See [GIT_PUBLISHING.md](./GIT_PUBLISHING.md) for detailed guide.

### Option 2: Publish to npm (For Public Packages)

```bash
npm login
npm publish --workspaces --access public
```

See [PUBLISHING.md](./PUBLISHING.md) for detailed npm publishing guide.

## 💡 Usage Example

### Installing from Git

```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.0
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.0
```

Or in package.json:
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.0",
    "@anchalverma/card": "https://github.com/Anchal2498/sharedComp.git#card@1.0.0"
  }
}
```

### Using Components

```tsx
import { Button } from '@anchalverma/button';
import { Card } from '@anchalverma/card';

function App() {
  return (
    <Card
      title="Welcome"
      description="This is a card component using the button component"
      actionButton={{
        label: "Click me",
        onClick: () => console.log("Clicked!"),
        variant: "primary"
      }}
    >
      <p>Card content goes here</p>
    </Card>
  );
}
```

## 🛠️ Component APIs

### Button

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  // ... all standard button HTML attributes
}
```

### Card

```tsx
interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}
```

## 🏗️ Project Structure

```
sharedComp/
├── packages/
│   ├── button/
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── card/
│       ├── src/
│       │   ├── Card.tsx
│       │   ├── Card.css
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── scripts/
│   └── version-bump.js
├── package.json
└── README.md
```

## 🔧 Technical Details

- **Build Tool:** esbuild (fast, zero-config bundler)
- **TypeScript:** Full type safety with declaration files
- **Module Formats:** ESM and CommonJS for maximum compatibility
- **CSS:** Scoped CSS files bundled with components
- **Workspaces:** npm workspaces for monorepo management

## 📋 Scripts Reference

### Building
- `npm run build` - Build all packages
- `npm run build:button` - Build button package only
- `npm run build:card` - Build card package only

### Git Publishing (Recommended)
- `npm run release:patch` - Bump patch version and publish to Git
- `npm run release:minor` - Bump minor version and publish to Git
- `npm run release:major` - Bump major version and publish to Git
- `npm run version:patch:git` - Bump patch version (Git mode)
- `npm run version:minor:git` - Bump minor version (Git mode)
- `npm run version:major:git` - Bump major version (Git mode)
- `npm run publish:git` - Publish to Git repository

### npm Publishing
- `npm run version:patch` - Bump patch version (npm mode)
- `npm run version:minor` - Bump minor version (npm mode)
- `npm run version:major` - Bump major version (npm mode)

### Development
- `npm run link:local` - Link packages for local development

## 🤝 Contributing

1. Create a new component in `packages/`
2. Follow the existing structure and naming conventions
3. Build and test your component
4. Update this README with component documentation