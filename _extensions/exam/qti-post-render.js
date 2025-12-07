#!/usr/bin/env node
/**
 * Quarto Exam Post-Render Script
 * Converts rendered Markdown to QTI format using the qti-convert CLI
 * 
 * Usage: Called automatically by Quarto post-render when output: qti is set
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { dirname, basename, join } from 'path';

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

try {
  // Use the qti-convert CLI from this package
  const cliPath = join(dirname(import.meta.url.replace('file://', '')), '..', 'dist', 'index.js');
  
  execSync(`node "${cliPath}" "${inputFile}" -o "${outputFile}"`, {
    stdio: 'inherit',
    cwd: dir
  });
  
  console.log(`✓ QTI package generated: ${outputFile}`);
} catch (error) {
  console.error('Error generating QTI:', error.message);
  process.exit(1);
}
