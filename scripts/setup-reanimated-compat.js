#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules', 'react-native-reanimated-compat');
const packagePath = path.join(__dirname, '..', 'packages', 'react-native-reanimated-compat');

// Create directory if it doesn't exist
if (!fs.existsSync(nodeModulesPath)) {
  fs.mkdirSync(nodeModulesPath, { recursive: true });
}

// Copy files
const filesToCopy = ['index.ts', 'package.json'];
filesToCopy.forEach(file => {
  const source = path.join(packagePath, file);
  const dest = path.join(nodeModulesPath, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`✓ Copied ${file} to node_modules/react-native-reanimated-compat/`);
  }
});

console.log('✓ react-native-reanimated-compat module setup complete');

