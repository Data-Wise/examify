#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join, basename, dirname, resolve } from 'path';
import { parseMarkdown } from './parser/markdown.js';
import { generateItem, generateTest, generateManifest21 } from './generator/qti21.js';
import { QtiValidator } from './diagnostic/validator.js';
import { execSync } from 'child_process';

const program = new Command();

program
  .name('qti-convert')
  .description('Convert Markdown/Text questions to Canvas QTI 2.1 format')
  .version('0.2.0');

program
  .command('verify')
  .description('Verify a QTI package')
  .argument('<path>', 'Path to QTI zip or directory')
  .action(async (path: string) => {
    console.log(`Verifying package: ${path}...`);
    const validator = new QtiValidator();
    const report = await validator.validatePackage(path);
    
    if (report.isValid) {
      console.log('✓ Validation PASSED');
      console.log(`  • Items: ${report.details.itemCount}`);
      console.log(`  • Resources: ${report.details.resourceCount}`);
      if (report.details.testFound) console.log('  • Test/Assessment: Found');
      
      if (report.warnings.length > 0) {
        console.log('\nWarnings:');
        report.warnings.forEach(w => console.warn(`  ! ${w}`));
      }
    } else {
      console.error('✗ Validation FAILED');
      report.errors.forEach(e => console.error(`  - ${e}`));
      process.exit(1);
    }
  });

// Default command (convert)
program
  .argument('[input]', 'Input file (markdown or text)')
  .option('-o, --output <file>', 'Output QTI zip file')
  .option('-v, --validate', 'Validate output structure')
  .option('--preview', 'Preview parsed questions without generating file')
  .action(async (input: string, options: { output?: string; validate?: boolean; preview?: boolean }) => {
    if (!input) {
      program.help();
      return;
    }
    // Main conversion logic
    try {
      const content = readFileSync(input, 'utf-8');
      const parsed = parseMarkdown(content);
      
      if (options.preview) {
        console.log('Parsed Questions:');
        console.log(JSON.stringify(parsed, null, 2));
        return;
      }

      // Create QTI 2.1 package with proper folder structure
      const tempDir = mkdtempSync(join(tmpdir(), 'qti21-'));
      const itemsDir = join(tempDir, 'items');
      const testsDir = join(tempDir, 'tests');
      
      try {
        // Create folder structure
        mkdirSync(itemsDir, { recursive: true });
        const imagesDir = join(itemsDir, 'images');
        mkdirSync(imagesDir, { recursive: true });
        mkdirSync(testsDir, { recursive: true });
        
        // Process images and write item files
        for (const question of parsed.questions) {
          // Handle images if present
          if (question.images && question.images.length > 0) {
            const inputDir = join(process.cwd(), dirname(input)); // input path might be relative
            
            question.images = question.images.map(imgRef => {
              try {
                // Resolve source path
                // Handle absolute paths or relative to input file
                const srcPath = join(dirname(input), imgRef); // Use raw input path for resolution
                if (existsSync(srcPath)) {
                   const imgName = basename(srcPath);
                   const destPath = join(imagesDir, imgName);
                   copyFileSync(srcPath, destPath);
                   
                   // Update path in stem/options to be relative for the XML (images/name.png)
                   const relativeRef = `images/${imgName}`;
                   question.stem = question.stem.replace(imgRef, relativeRef);
                   return relativeRef;
                } else {
                  console.warn(`Warning: Image not found: ${srcPath}`);
                  return imgRef;
                }
              } catch (e) {
                console.warn(`Warning: Failed to process image ${imgRef}`, e);
                return imgRef;
              }
            });
          }

          const itemXml = generateItem(question, parsed.title);
          writeFileSync(join(itemsDir, `item_${question.id}.xml`), itemXml);
        }
        
        // Generate and write test.xml
        const testXml = generateTest(parsed);
        writeFileSync(join(testsDir, 'test.xml'), testXml);
        
        // Generate and write imsmanifest.xml
        const manifestXml = generateManifest21(parsed);
        writeFileSync(join(tempDir, 'imsmanifest.xml'), manifestXml);
        
        // Create zip file
        const outputZip = options.output || input.replace(/\.(md|txt)$/, '.qti.zip');
        
        // Use zip command to create package (zip the contents, not the folder)
        execSync(`cd "${tempDir}" && zip -r "${process.cwd()}/${outputZip}" .`, { stdio: 'pipe' });
        
        console.log(`✓ Generated QTI 2.1 Package: ${outputZip}`);
        console.log(`  • ${parsed.questions.length} questions`);
        console.log(`  • ${parsed.sections.length} sections`);
        console.log(`  • Folder structure: items/, tests/, imsmanifest.xml`);
        
      } finally {
        // Clean up temp directory
        rmSync(tempDir, { recursive: true, force: true });
      }
      
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
