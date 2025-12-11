#!/usr/bin/env node
/**
 * Quarto Exam Post-Render Script
 * Converts rendered Markdown to QTI format using examark CLI
 *
 * Usage: Called automatically by Quarto post-render when exam.qti: true
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const inputFile = args[0];

if (!inputFile) {
  console.error('Usage: qti-post-render <input.md>');
  process.exit(1);
}

if (!existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

const dir = dirname(inputFile);
const base = basename(inputFile, '.md');
const outputFile = join(dir, `${base}.qti.zip`);

// Find examark CLI
function findExamarkCli() {
  // Try 1: Global install (npm or homebrew)
  try {
    execSync('which examark', { stdio: 'pipe' });
    return 'examark';
  } catch (e) {
    // Not in PATH
  }

  // Try 2: Development mode - ../../dist/index.js
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const devCliPath = join(scriptDir, '..', '..', 'dist', 'index.js');
  if (existsSync(devCliPath)) {
    return `node "${devCliPath}"`;
  }

  return null;
}

const examarkCmd = findExamarkCli();

if (!examarkCmd) {
  console.error('❌ examark CLI not found.');
  console.error('   Install: npm install -g examark');
  console.error('   Or run manually: examark ' + basename(inputFile) + ' -o ' + basename(outputFile));
  process.exit(1);
}

try {
  const inputFilename = basename(inputFile);
  const outputFilename = basename(outputFile);

  console.log('\n📦 Generating QTI package...');
  execSync(`${examarkCmd} "${inputFilename}" -o "${outputFilename}"`, {
    stdio: 'inherit',
    cwd: dir
  });

  console.log(`✅ QTI package ready: ${outputFilename}\n`);
} catch (error) {
  console.error('❌ Error generating QTI:', error.message);
  process.exit(1);
}
