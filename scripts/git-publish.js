#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGES_DIR = path.join(__dirname, '../packages');

/**
 * Execute command and return output
 */
function exec(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return result ? result.trim() : '';
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return '';
  }
}

/**
 * Get all package directories
 */
function getPackages() {
  return fs.readdirSync(PACKAGES_DIR)
    .filter(name => {
      const pkgPath = path.join(PACKAGES_DIR, name);
      return fs.statSync(pkgPath).isDirectory();
    })
    .map(name => ({
      name,
      path: path.join(PACKAGES_DIR, name),
      packageJsonPath: path.join(PACKAGES_DIR, name, 'package.json')
    }))
    .filter(pkg => fs.existsSync(pkg.packageJsonPath));
}

/**
 * Read package.json
 */
function readPackageJson(pkgPath) {
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

/**
 * Check if git repo is clean
 */
function isGitClean() {
  const status = exec('git status --porcelain', { silent: true });
  return status === '';
}

/**
 * Get current git branch
 */
function getCurrentBranch() {
  return exec('git rev-parse --abbrev-ref HEAD', { silent: true });
}

/**
 * Main execution
 */
function main() {
  console.log('\n🚀 Publishing components to Git repository...\n');

  // Check if we're in a git repository
  try {
    exec('git rev-parse --git-dir', { silent: true });
  } catch (error) {
    console.error('❌ Error: Not a git repository');
    process.exit(1);
  }

  // Check if working directory is clean
  if (!isGitClean()) {
    console.error('❌ Error: Working directory is not clean');
    console.error('Please commit or stash your changes before publishing');
    process.exit(1);
  }

  const packages = getPackages();
  const tags = [];

  // Get package versions and create tags
  console.log('📦 Package versions:\n');
  packages.forEach(pkg => {
    const packageJson = readPackageJson(pkg.packageJsonPath);
    const tag = `${pkg.name}@${packageJson.version}`;
    tags.push({ name: pkg.name, version: packageJson.version, tag });
    console.log(`  ${packageJson.name}: v${packageJson.version}`);
  });

  console.log('\n🔨 Building packages...\n');
  
  // Build all packages to ensure dist files are up to date
  exec('npm run build');
  console.log('  ✓ All packages built');

  console.log('\n📝 Committing changes...\n');
  
  // Add all changes including dist files
  exec('git add .');
  
  // Create commit message
  const commitMessage = `Release: ${tags.map(t => `${t.name}@${t.version}`).join(', ')}`;
  exec(`git commit -m "${commitMessage}"`, { ignoreError: true });

  console.log('\n🏷️  Creating Git tags...\n');
  
  // Create tags for each package
  tags.forEach(({ name, version, tag }) => {
    try {
      exec(`git tag -a ${tag} -m "Release ${name} v${version}"`, { silent: true });
      console.log(`  ✓ Created tag: ${tag}`);
    } catch (error) {
      console.log(`  ⚠️  Tag ${tag} already exists, skipping`);
    }
  });

  console.log('\n📤 Pushing to remote...\n');
  
  const branch = getCurrentBranch();
  
  // Push commits
  try {
    exec(`git push origin ${branch}`);
    console.log(`  ✓ Pushed commits to ${branch}`);
  } catch (error) {
    console.error('  ❌ Failed to push commits');
    process.exit(1);
  }

  // Push tags
  try {
    exec('git push --tags');
    console.log('  ✓ Pushed tags');
  } catch (error) {
    console.error('  ❌ Failed to push tags');
    process.exit(1);
  }

  console.log('\n✅ Publishing complete!\n');
  console.log('📋 Installation instructions:\n');
  
  const repoUrl = exec('git config --get remote.origin.url', { silent: true });
  
  packages.forEach(pkg => {
    const packageJson = readPackageJson(pkg.packageJsonPath);
    const tag = `${pkg.name}@${packageJson.version}`;
    console.log(`  npm install ${repoUrl}#${tag}`);
  });
  
  console.log('');
}

main();