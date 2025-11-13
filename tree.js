#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Directories to show as single entries without recursing
const IGNORED_DIRS = new Set(['node_modules', '.git', '.svn', '.hg', '.DS_Store']);

function isDirectory(targetPath) {
  try {
    return fs.lstatSync(targetPath).isDirectory();
  } catch (error) {
    console.error(`Error reading ${targetPath}: ${error.message}`);
    return false;
  }
}

function readEntries(dirPath) {
  try {
    return fs.readdirSync(dirPath).map((name) => {
      const fullPath = path.join(dirPath, name);
      return { name, fullPath, isDir: isDirectory(fullPath) };
    }).sort((a, b) => {
      if (a.isDir === b.isDir) {
        return a.name.localeCompare(b.name);
      }
      return a.isDir ? -1 : 1;
    });
  } catch (error) {
    console.error(`Error listing ${dirPath}: ${error.message}`);
    return [];
  }
}

function printTree(targetPath, prefix = '', isLast = true, isRoot = false) {
  const displayName = isRoot ? targetPath : path.basename(targetPath);
  const branch = isRoot ? '' : `${prefix}${isLast ? '`-- ' : '|-- '}`;

  if (!isRoot) {
    console.log(`${branch}${displayName}`);
  }

  if (!isDirectory(targetPath)) {
    return;
  }

  const nextPrefix = isRoot
    ? ''
    : `${prefix}${isLast ? '    ' : '|   '}`;

  const entries = readEntries(targetPath);

  entries.forEach((entry, index) => {
    const lastEntry = index === entries.length - 1;

    if (entry.isDir && IGNORED_DIRS.has(entry.name)) {
      console.log(`${nextPrefix}${lastEntry ? '`-- ' : '|-- '}${entry.name}`);
      return;
    }

    if (entry.isDir) {
      printTree(entry.fullPath, nextPrefix, lastEntry);
    } else {
      console.log(`${nextPrefix}${lastEntry ? '`-- ' : '|-- '}${entry.name}`);
    }
  });
}

function main() {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('Usage: node tree.js <directory>');
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Directory does not exist: ${resolvedPath}`);
    process.exit(1);
  }

  console.log(resolvedPath);
  printTree(resolvedPath, '', true, true);
}

main();
