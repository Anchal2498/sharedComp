# Getting Started with Git Publishing

## 🚀 Complete Workflow Example

### Step 1: Initial Setup (One-time)

```bash
# Make sure you're in the project directory
cd /home/anchal/projects/sharedComp

# Install dependencies (if not already done)
npm install

# Build all packages
npm run build
```

### Step 2: Make Changes to Components

```bash
# Edit your components
# For example: packages/button/src/Button.tsx
```

### Step 3: Commit Your Changes

**Important:** You must commit all changes before publishing!

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with a meaningful message
git commit -m "feat: Update button component styling"
```

### Step 4: Publish to Git

Now you can publish:

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm run release:patch

# For new features (1.0.0 → 1.1.0)
npm run release:minor

# For breaking changes (1.0.0 → 2.0.0)
npm run release:major
```

**What happens:**
1. ✅ All package versions are bumped
2. ✅ Dependencies are updated to Git URLs
3. ✅ All packages are rebuilt
4. ✅ Changes are committed automatically
5. ✅ Git tags are created (e.g., `button@1.0.1`, `card@1.0.1`)
6. ✅ Everything is pushed to GitHub

### Step 5: Verify Publication

```bash
# Check tags were created
git tag

# Check tags on remote
git ls-remote --tags origin

# You should see tags like:
# button@1.0.1
# card@1.0.1
```

## 📥 Installing Your Published Components

### In Another Project

**Option 1: Using npm install**
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.1
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.1
```

**Option 2: Add to package.json**
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.1",
    "@anchalverma/card": "https://github.com/Anchal2498/sharedComp.git#card@1.0.1"
  }
}
```

Then run:
```bash
npm install
```

### Using the Components

```tsx
import { Button } from '@anchalverma/button';
import { Card } from '@anchalverma/card';

function App() {
  return (
    <Card
      title="Hello World"
      description="This is a card component"
      actionButton={{
        label: "Click Me",
        onClick: () => alert("Hello!"),
        variant: "primary"
      }}
    >
      <p>Card content here</p>
    </Card>
  );
}
```

## 🔄 Updating Components

### When You Make More Changes

1. **Edit your components**
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "fix: Fix button hover state"
   ```
3. **Publish:**
   ```bash
   npm run release:patch
   ```

### Users Update to New Version

Users update the version in their `package.json`:
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.2"
  }
}
```

Then run:
```bash
npm install
```

## 🎯 Common Scenarios

### Scenario 1: First Time Publishing

```bash
# 1. Build everything
npm run build

# 2. Commit current state
git add .
git commit -m "chore: Initial component setup"

# 3. Publish
npm run release:patch
```

### Scenario 2: Update Button, Card Uses Button

```bash
# 1. Edit Button component
# packages/button/src/Button.tsx

# 2. Commit changes
git add .
git commit -m "feat: Add new button variant"

# 3. Publish (this updates both Button AND Card automatically!)
npm run release:minor
```

**What happens:**
- Button: 1.0.0 → 1.1.0
- Card: 1.0.0 → 1.1.0 (automatically updated to use Button@1.1.0)

### Scenario 3: Add New Component

```bash
# 1. Create new component
mkdir -p packages/input/src

# 2. Add component files
# packages/input/src/Input.tsx
# packages/input/src/index.ts
# packages/input/package.json

# 3. Build
npm run build

# 4. Commit
git add .
git commit -m "feat: Add input component"

# 5. Publish
npm run release:minor
```

## ⚠️ Common Errors and Solutions

### Error: "Working directory is not clean"

**Problem:** You have uncommitted changes.

**Solution:**
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Then try publishing again
npm run release:patch
```

### Error: "Not a git repository"

**Problem:** Git is not initialized.

**Solution:**
```bash
git init
git remote add origin https://github.com/Anchal2498/sharedComp.git
```

### Error: "Tag already exists"

**Problem:** You're trying to create a tag that already exists.

**Solution:**
```bash
# Delete the tag locally
git tag -d button@1.0.1

# Delete the tag remotely
git push origin :refs/tags/button@1.0.1

# Try publishing again
npm run release:patch
```

### Error: Build fails

**Problem:** TypeScript or build errors.

**Solution:**
```bash
# Check what's wrong
npm run build

# Fix the errors in your code
# Then try again
```

## 📊 Version Strategy

### When to Use Each Version Type

**Patch (1.0.X):**
- Bug fixes
- Style tweaks
- Documentation updates
- No API changes

**Minor (1.X.0):**
- New features
- New props (backward compatible)
- New components
- Deprecations (with warnings)

**Major (X.0.0):**
- Breaking changes
- Removed props
- Changed behavior
- Renamed components

## 🎓 Best Practices

1. **Always commit before publishing**
   ```bash
   git add .
   git commit -m "Descriptive message"
   npm run release:patch
   ```

2. **Use meaningful commit messages**
   - ✅ `feat: Add disabled state to button`
   - ✅ `fix: Fix card padding on mobile`
   - ❌ `update`
   - ❌ `changes`

3. **Test before publishing**
   ```bash
   npm run build
   cd examples/demo && npm run dev
   # Test your changes
   # Then publish
   ```

4. **Document breaking changes**
   ```bash
   git commit -m "BREAKING: Remove 'variant' prop from Button"
   npm run release:major
   ```

5. **Keep versions in sync**
   - The scripts handle this automatically
   - Don't manually edit version numbers

## 🔍 Checking Published Versions

### List All Tags
```bash
git tag
```

### List Tags for Specific Component
```bash
git tag | grep "^button@"
git tag | grep "^card@"
```

### View Tag Details
```bash
git show button@1.0.1
```

### Check Remote Tags
```bash
git ls-remote --tags origin
```

## 📞 Need Help?

- **Quick reference:** See [QUICKSTART.md](./QUICKSTART.md)
- **Detailed guide:** See [GIT_PUBLISHING.md](./GIT_PUBLISHING.md)
- **Development workflow:** See [WORKFLOW.md](./WORKFLOW.md)
- **Architecture details:** See [ARCHITECTURE.md](./ARCHITECTURE.md)

## ✅ Checklist for First Publish

- [ ] Dependencies installed (`npm install`)
- [ ] All packages built (`npm run build`)
- [ ] Demo app works (`cd examples/demo && npm run dev`)
- [ ] All changes committed (`git status` shows clean)
- [ ] Published to Git (`npm run release:patch`)
- [ ] Tags created (`git tag` shows new tags)
- [ ] Tags pushed (`git ls-remote --tags origin`)
- [ ] Can install in another project

---

**You're all set! 🎉**

Start by running `npm run release:patch` after committing your changes!