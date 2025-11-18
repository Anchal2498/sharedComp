#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGES_DIR = path.join(__dirname, '../packages');
const versionType = process.argv[2] || 'patch'; // patch, minor, or major

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Invalid version type. Use: patch, minor, or major');
  process.exit(1);
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
 * Update dependencies in a package
 */
function updateDependencies(packageJson, updatedVersions) {
  let updated = false;
  
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (packageJson[depType]) {
      Object.keys(packageJson[depType]).forEach(depName => {
        if (updatedVersions[depName]) {
          const newVersion = `^${updatedVersions[depName]}`;
          if (packageJson[depType][depName] !== newVersion) {
            packageJson[depType][depName] = newVersion;
            updated = true;
            console.log(`  ✓ Updated ${depName} to ${newVersion}`);
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
  console.log(`\n🚀 Bumping ${versionType} version for all packages...\n`);
  
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
  
  // Step 2: Update dependencies
  console.log('\nStep 2: Updating dependencies\n');
  packages.forEach(pkg => {
    const packageJson = readPackageJson(pkg.packageJsonPath);
    console.log(`Checking ${packageJson.name}...`);
    
    const hasUpdates = updateDependencies(packageJson, updatedVersions);
    
    if (hasUpdates) {
      writePackageJson(pkg.packageJsonPath, packageJson);
    } else {
      console.log('  No dependency updates needed');
    }
  });
  
  // Step 3: Rebuild all packages
  console.log('\nStep 3: Rebuilding packages\n');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
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
  console.log('');
}

main();