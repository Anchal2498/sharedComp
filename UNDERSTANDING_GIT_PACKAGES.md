# Understanding Git-Based Packages

## 🤔 Why You Don't See "Packages" on GitHub

**Important:** Git-based packages work differently from npm packages!

### How npm Works
- Packages are uploaded to npm registry
- You see them at npmjs.com
- Install with: `npm install package-name`

### How Git-Based Packages Work
- Packages stay in your Git repository
- They're identified by **Git tags**
- Install with: `npm install <git-url>#<tag>`

## 📍 Where Are Your Packages?

Your packages **ARE** published! They're in your Git repository as **tags**.

### On GitHub

1. **Go to your repository:** https://github.com/Anchal2498/sharedComp

2. **Click on "Tags"** (or go to releases)
   - URL: https://github.com/Anchal2498/sharedComp/tags

3. **You'll see tags like:**
   - `button@1.0.2`
   - `card@1.0.2`
   - `@anchalverma/button@1.1.16`
   - etc.

### Each Tag = One Package Version

```
button@1.0.2  ← This is your Button package v1.0.2
card@1.0.2    ← This is your Card package v1.0.2
```

## 📦 How to Install Your Packages

### Installation Command

```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.2
```

### Breaking Down the URL

```
https://github.com/Anchal2498/sharedComp.git  ← Your repository
#button@1.0.2                                  ← The tag (package version)
```

### In package.json

```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.2",
    "@anchalverma/card": "https://github.com/Anchal2498/sharedComp.git#card@1.0.2"
  }
}
```

## 🔍 Verifying Your Packages

### Check Local Tags
```bash
git tag
```

You should see:
```
button@1.0.2
card@1.0.2
```

### Check Remote Tags
```bash
git ls-remote --tags origin
```

### Check on GitHub
1. Go to: https://github.com/Anchal2498/sharedComp/tags
2. You should see all your tags listed

### Test Installation
```bash
# In a test directory
mkdir test-install
cd test-install
npm init -y
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2
```

If this works, your package is published successfully! ✅

## 🎯 What Makes a Git Package "Published"?

A package is published when:
1. ✅ Code is committed to Git
2. ✅ A tag is created (e.g., `button@1.0.2`)
3. ✅ Tag is pushed to remote (GitHub)

That's it! No npm upload needed.

## 📊 Comparison

| Feature | npm Packages | Git Packages |
|---------|-------------|--------------|
| **Where stored** | npm registry | Git repository |
| **How to find** | npmjs.com | GitHub tags |
| **Install command** | `npm install pkg` | `npm install git-url#tag` |
| **Visibility** | Public/Private on npm | Based on repo visibility |
| **Cost** | Free public, paid private | Free (GitHub) |

## 🔄 Your Current Tags

Based on your output, you have these packages published:

**Latest versions:**
- `button@1.0.2`
- `card@1.0.2`
- `@anchalverma/button@1.1.16`
- `@anchalverma/card@1.0.15`

**To install the latest:**
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.2
```

## 🎨 Creating a Release Page (Optional)

To make it easier for users to find your packages:

### On GitHub:
1. Go to: https://github.com/Anchal2498/sharedComp/releases
2. Click "Create a new release"
3. Choose a tag (e.g., `button@1.0.2`)
4. Add release notes
5. Publish

This creates a nice release page that shows:
- What changed
- Installation instructions
- Download links

## 📝 Example README for Users

Create a README in your repository:

```markdown
# SharedComp Components

## Installation

### Button Component
\`\`\`bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2
\`\`\`

### Card Component
\`\`\`bash
npm install https://github.com/Anchal2498/sharedComp.git#card@1.0.2
\`\`\`

## Usage

\`\`\`tsx
import { Button } from '@anchalverma/button';
import { Card } from '@anchalverma/card';

function App() {
  return <Button>Click me</Button>;
}
\`\`\`

## Available Versions

See [Releases](https://github.com/Anchal2498/sharedComp/releases) for all versions.
```

## 🚀 Quick Test

Try this in a new project:

```bash
# Create test project
mkdir ~/test-components
cd ~/test-components
npm init -y

# Install your button component
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2

# Check if it installed
ls node_modules/@anchalverma/
```

If you see `button` folder, it worked! ✅

## ❓ Common Questions

### Q: Why don't I see packages on GitHub like npm?
**A:** GitHub doesn't have a "packages" section for Git-based installs. Your packages are the **tags** in your repository.

### Q: How do users discover my packages?
**A:** 
- Share your GitHub repository URL
- Document installation in README
- Create GitHub releases
- Share on social media/forums

### Q: Can I use both npm and Git?
**A:** Yes! You can:
- Publish to npm: `npm publish`
- Also keep Git tags for backup/private use

### Q: Are my packages public or private?
**A:** Based on your repository visibility:
- Public repo = Anyone can install
- Private repo = Only collaborators can install

### Q: How do I update to a new version?
**A:** Users change the tag in their package.json:
```json
{
  "dependencies": {
    "@anchalverma/button": "https://github.com/Anchal2498/sharedComp.git#button@1.0.3"
  }
}
```

## ✅ Your Packages Are Published!

If you can see tags when you run `git tag`, your packages are published! 

Users can install them using:
```bash
npm install https://github.com/Anchal2498/sharedComp.git#button@1.0.2
```

---

**Need help?** Check [GIT_PUBLISHING.md](./GIT_PUBLISHING.md) for more details.