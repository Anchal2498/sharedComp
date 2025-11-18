#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGES_DIR = path.join(__dirname, '../packages');
const versionType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Invalid version type. Use: patch, minor, or major');
  process.exit(1);
}

/**
 * Execute command
 */
function exec(command, options = {}) {
  return execSync(command, { encoding: 'utf8', stdio: 'inherit', ...options });
}

/**
 * Bump version number based on type
 */
function bumpVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
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
 * Write package.json
 */
function writePackageJson(pkgPath, data) {
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2) + '\n');
}

/**
 * Get Git repository URL
 */
function getGitRepoUrl() {
  try {
    const url = execSync('git config --get remote.origin.url', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return url ? url.trim() : null;
  } catch (error) {
    return null;
  }
}

/**
 * Update dependencies to use Git URLs
 */
function updateDependencies(packageJson, updatedVersions, repoUrl) {
  let updated = false;
  
  ['dependencies', 'devDependencies'].forEach(depType => {
    if (packageJson[depType]) {
      Object.keys(packageJson[depType]).forEach(depName => {
        if (updatedVersions[depName]) {
          const pkgName = depName.split('/').pop(); // Get package name without scope
          const newVersion = `${repoUrl}#${pkgName}@${updatedVersions[depName]}`;
          if (packageJson[depType][depName] !== newVersion) {
            packageJson[depType][depName] = newVersion;
            updated = true;
            console.log(`  ✓ Updated ${depName} to Git tag ${pkgName}@${updatedVersions[depName]}`);
          }
        }
      });
    }
  });
  
  return updated;
}

/**
 * Main execution
 */
function main() {
  console.log(`\n🚀 Bumping ${versionType} version for Git-based publishing...\n`);
  
  const repoUrl = getGitRepoUrl();
  if (!repoUrl) {
    console.error('❌ Error: Could not get Git repository URL');
    console.error('Make sure you are in a Git repository with a remote origin');
    process.exit(1);
  }
  
  console.log(`📦 Repository: ${repoUrl}\n`);
  
  const packages = getPackages();
  const updatedVersions = {};
  
  // Step 1: Bump versions for all packages
  console.log('Step 1: Bumping package versions\n');
  packages.forEach(pkg => {
    const packageJson = readPackageJson(pkg.packageJsonPath);
    const oldVersion = packageJson.version;
    const newVersion = bumpVersion(oldVersion, versionType);
    
    packageJson.version = newVersion;
    writePackageJson(pkg.packageJsonPath, packageJson);
    
    updatedVersions[packageJson.name] = newVersion;
    console.log(`✓ ${packageJson.name}: ${oldVersion} → ${newVersion}`);
  });
  
  // Step 2: Update dependencies to use Git URLs
  console.log('\nStep 2: Updating dependencies to Git URLs\n');
  packages.forEach(pkg => {
    const packageJson = readPackageJson(pkg.packageJsonPath);
    console.log(`Checking ${packageJson.name}...`);
    
    const hasUpdates = updateDependencies(packageJson, updatedVersions, repoUrl);
    
    if (hasUpdates) {
      writePackageJson(pkg.packageJsonPath, packageJson);
    } else {
      console.log('  No dependency updates needed');
    }
  });
  
  // Step 3: Rebuild all packages
  console.log('\nStep 3: Rebuilding packages\n');
  try {
    exec('npm run build', { cwd: path.join(__dirname, '..') });
    console.log('\n✓ All packages rebuilt successfully');
  } catch (error) {
    console.error('\n✗ Build failed:', error.message);
    process.exit(1);
  }
  
  console.log('\n✅ Version bump complete!\n');
  console.log('Updated versions:');
  Object.entries(updatedVersions).forEach(([name, version]) => {
    console.log(`  ${name}: ${version}`);
  });
  
  console.log('\n📝 Next steps:');
  console.log('  1. Review the changes');
  console.log('  2. Run: npm run publish:git');
  console.log('');
}

main();