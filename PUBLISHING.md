# Publishing Guide

## 📦 Publishing Your Components to npm

### Prerequisites

1. **npm Account**
   - Create account at https://www.npmjs.com/signup
   - Verify your email

2. **Login to npm**
   ```bash
   npm login
   ```
   Enter your username, password, and email.

3. **Update Package Names**
   
   Replace `@sharedcomp` with your npm username in all package.json files:
   
   ```json
   {
     "name": "@your-username/button"
   }
   ```
   
   Files to update:
   - `packages/button/package.json`
   - `packages/card/package.json`
   - Any other packages you create

### Publishing for the First Time

1. **Ensure everything is built:**
   ```bash
   npm run build
   ```

2. **Publish all packages:**
   ```bash
   npm publish --workspaces --access public
   ```

   This publishes all packages in the `packages/` directory.

### Publishing Individual Packages

```bash
# Publish just the button
cd packages/button
npm publish --access public

# Publish just the card
cd packages/card
npm publish --access public
```

### Publishing Updates

When you make changes to components:

1. **Make your changes**
2. **Bump versions:**
   ```bash
   npm run version:patch  # 1.0.0 → 1.0.1
   # or
   npm run version:minor  # 1.0.0 → 1.1.0
   # or
   npm run version:major  # 1.0.0 → 2.0.0
   ```
3. **Publish:**
   ```bash
   npm publish --workspaces --access public
   ```

### Version Bump Strategy

- **Patch (1.0.X):** Bug fixes, typos, small changes
- **Minor (1.X.0):** New features, backward compatible
- **Major (X.0.0):** Breaking changes

### What Gets Published?

Only the `dist/` folder and files listed in `"files"` field:

```json
{
  "files": [
    "dist"
  ]
}
```

This includes:
- `dist/index.js` (CommonJS)
- `dist/index.esm.js` (ES Modules)
- `dist/index.d.ts` (TypeScript definitions)

### Using Your Published Packages

After publishing, anyone can install your packages:

```bash
npm install @your-username/button
npm install @your-username/card
```

And use them:

```tsx
import { Button } from '@your-username/button';
import { Card } from '@your-username/card';

function App() {
  return (
    <Card
      title="Hello"
      actionButton={{
        label: "Click me",
        onClick: () => alert("Hi!")
      }}
    />
  );
}
```

### Checking Published Packages

View your packages on npm:
```
https://www.npmjs.com/package/@your-username/button
https://www.npmjs.com/package/@your-username/card
```

### Unpublishing (Use with Caution)

You can unpublish within 72 hours:

```bash
npm unpublish @your-username/button@1.0.0
```

**Warning:** Unpublishing can break projects that depend on your package!

### Best Practices

1. **Test before publishing:**
   ```bash
   npm run build
   cd examples/demo && npm run dev
   ```

2. **Use semantic versioning correctly**

3. **Update README.md** with usage examples

4. **Add a CHANGELOG.md** to track changes

5. **Tag releases in git:**
   ```bash
   git tag v1.0.0
   git push --tags
   ```

### Automation (Optional)

Create a publish script in root `package.json`:

```json
{
  "scripts": {
    "publish:patch": "npm run version:patch && npm publish --workspaces --access public",
    "publish:minor": "npm run version:minor && npm publish --workspaces --access public",
    "publish:major": "npm run version:major && npm publish --workspaces --access public"
  }
}
```

Then simply run:
```bash
npm run publish:patch
```

### Troubleshooting

**"You must be logged in to publish"**
```bash
npm login
```

**"Package name already exists"**
- Change the package name in package.json
- Use your npm username as scope: `@your-username/package-name`

**"You do not have permission to publish"**
- Make sure you're logged in with the correct account
- Use `--access public` flag for scoped packages

**"Version already published"**
- Bump the version number
- Run `npm run version:patch`

### Private Packages (Paid npm Account)

If you have a paid npm account, you can publish private packages:

```bash
npm publish --access restricted
```

This keeps your packages private and only accessible to you and your team.