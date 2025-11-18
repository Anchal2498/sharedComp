# Git-Based Publishing Guide

## 📦 Publishing Components via Git Repository

Instead of publishing to npm, you can publish your components directly from your Git repository. This is useful for:
- Private components without paying for npm
- Internal company libraries
- Quick sharing without npm account
- Version control integration

## 🚀 How It Works

### Git Tags as Versions

Each component version is tagged in Git:
```
button@1.0.0
button@1.0.1
card@1.0.0
card@1.0.1
```

### Installation from Git

Users install directly from your Git repository:
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.0
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.0
```

## 📋 Publishing Workflow

### 1. Make Changes to Components

Edit your components as usual:
```bash
# Edit packages/button/src/Button.tsx
# Edit packages/card/src/Card.tsx
```

### 2. Bump Versions and Update Dependencies

Use the Git-specific version bump script:

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm run version:patch:git

# For new features (1.0.0 → 1.1.0)
npm run version:minor:git

# For breaking changes (1.0.0 → 2.0.0)
npm run version:major:git
```

**What this does:**
- ✅ Bumps all package versions
- ✅ Updates dependencies to use Git URLs with tags
- ✅ Rebuilds all packages

### 3. Publish to Git

```bash
npm run publish:git
```

**What this does:**
- ✅ Commits all changes
- ✅ Creates Git tags for each package version
- ✅ Pushes commits and tags to remote repository
- ✅ Shows installation instructions

### Quick Release (All-in-One)

Combine version bump and publish:

```bash
# Patch release
npm run release:patch

# Minor release
npm run release:minor

# Major release
npm run release:major
```

## 📥 Installing Published Components

### In Your Project's package.json

```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.0",
    "@anchalverma/card": "https://github.com/Anchal2498/sharedComp.git#card@1.0.0"
  }
}
```

### Using npm install

```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.0
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.0
```

### Using Specific Versions

```bash
# Install specific version
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.1

# Install latest from main branch (not recommended for production)
npm install https://github.com/Anchal2498/sharedComp.git#main
```

## 🔄 Updating Components

### For Component Maintainers

1. **Make changes** to your components
2. **Run release command:**
   ```bash
   npm run release:patch
   ```
3. **Done!** Components are published

### For Component Users

Update the version in package.json:
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.1"
  }
}
```

Then run:
```bash
npm install
```

## 📊 Version Management

### Semantic Versioning

- **Patch (1.0.X):** Bug fixes, no API changes
- **Minor (1.X.0):** New features, backward compatible
- **Major (X.0.0):** Breaking changes

### Git Tags Structure

Each package gets its own tag:
```
button@1.0.0
button@1.0.1
button@1.1.0
card@1.0.0
card@1.0.1
```

### Viewing Published Versions

```bash
# List all tags
git tag

# List tags for specific component
git tag | grep "^button@"
git tag | grep "^card@"
```

## 🔍 Dependency Management

### How Dependencies Work

When Card depends on Button, the dependency is stored as a Git URL:

```json
{
  "name": "@anchalverma/card",
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.0"
  }
}
```

### Automatic Updates

When you run `npm run version:patch:git`:
1. Button version: 1.0.0 → 1.0.1
2. Card's dependency automatically updates to: `button@1.0.1`
3. Card version: 1.0.0 → 1.0.1

## 🎯 Best Practices

### 1. Always Use Tags

❌ **Don't:**
```bash
npm install https://github.com/user/repo.git#main
```

✅ **Do:**
```bash
npm install https://github.com/user/repo.git#button@1.0.0
```

### 2. Keep Git History Clean

- Commit related changes together
- Use meaningful commit messages
- Don't force push after publishing

### 3. Test Before Publishing

```bash
# Build and test
npm run build
cd examples/demo && npm run dev

# Then publish
npm run release:patch
```

### 4. Document Breaking Changes

When releasing a major version, document what changed:
```bash
git tag -a button@2.0.0 -m "Breaking: Removed 'variant' prop, added 'color' prop"
```

## 🔐 Private Repositories

### Using Private Git Repos

For private repositories, users need access:

```bash
# SSH URL (recommended for private repos)
npm install git+ssh://git@github.com:Anchal2498/sharedComp.git#button@1.0.0

# HTTPS with token
npm install https://TOKEN@github.com/Anchal2498/sharedComp.git#button@1.0.0
```

### Setting Up SSH

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy and add to GitHub Settings → SSH Keys
```

## 🛠️ Troubleshooting

### "fatal: not a git repository"

**Solution:**
```bash
git init
git remote add origin https://github.com/Anchal2498/sharedComp.git
```

### "Working directory is not clean"

**Solution:**
```bash
# Commit your changes first
git add .
git commit -m "Your changes"

# Then publish
npm run publish:git
```

### "Tag already exists"

**Solution:**
```bash
# Delete the tag locally and remotely
git tag -d button@1.0.0
git push origin :refs/tags/button@1.0.0

# Then publish again
npm run publish:git
```

### Installation Fails

**Check:**
1. Tag exists: `git tag | grep button@1.0.0`
2. Tag is pushed: `git ls-remote --tags origin`
3. Repository URL is correct
4. You have access to the repository

## 📋 Complete Example Workflow

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/Anchal2498/sharedComp.git
cd sharedComp

# 2. Install dependencies
npm install

# 3. Build packages
npm run build
```

### Making Changes

```bash
# 1. Create a new branch
git checkout -b feature/update-button

# 2. Make your changes
# Edit packages/button/src/Button.tsx

# 3. Test changes
npm run build
cd examples/demo && npm run dev

# 4. Commit changes
git add .
git commit -m "feat: Add new button variant"

# 5. Merge to main
git checkout main
git merge feature/update-button
```

### Publishing

```bash
# 1. Bump version and publish
npm run release:patch

# 2. Verify tags were created
git tag

# 3. Verify tags were pushed
git ls-remote --tags origin
```

### Using in Another Project

```bash
# 1. In your project
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.1

# 2. Use the component
import { Button } from '@anchalverma/button';
```

## 🔄 Migration from npm to Git

If you were previously using npm:

### Update package.json

**Before:**
```json
{
  "dependencies": {
    "@anchalverma/button": "^1.0.0"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.0"
  }
}
```

### Reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Comparison: npm vs Git

| Feature | npm | Git |
|---------|-----|-----|
| **Cost** | Free for public, paid for private | Free |
| **Setup** | npm account required | Git repository required |
| **Privacy** | Paid for private packages | Free private repos (GitHub) |
| **Speed** | Fast (CDN) | Slower (clone repo) |
| **Versioning** | Semantic versioning | Git tags |
| **Discovery** | npmjs.com search | Repository access only |
| **Best For** | Public libraries | Private/internal libraries |

## 🎓 Advanced Topics

### Monorepo with Mixed Publishing

You can publish some packages to npm and others via Git:

```json
{
  "dependencies": {
    "@anchalverma/button": "^1.0.0",  // from npm
    "@anchalverma/card": "https://github.com/Anchal2498/sharedComp.git#card@1.0.0"  // from Git
  }
}
```

### Using GitHub Packages

Alternative to direct Git installation:
1. Publish to GitHub Packages
2. Install using npm with GitHub registry
3. Better caching and performance

### Automated Releases with GitHub Actions

Create `.github/workflows/release.yml`:
```yaml
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm run publish:git
```

## 📞 Support

For issues or questions:
- Check [WORKFLOW.md](./WORKFLOW.md) for development workflows
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Open an issue on GitHub