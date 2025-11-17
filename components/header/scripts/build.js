// Simple build script for header component
const fs = require('fs');
const path = require('path');

// In a real scenario, this would compile/transpile the code
console.log('Building @myorg/header component...');

// Create a dist folder
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy the index.js file to dist
const srcFile = path.join(__dirname, '../index.js');
const destFile = path.join(distDir, 'index.js');

fs.copyFileSync(srcFile, destFile);

console.log('Build completed for @myorg/header');