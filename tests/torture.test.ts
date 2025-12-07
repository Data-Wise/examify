import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { QtiValidator } from '../src/diagnostic/validator';

describe('Torture Tests (Integration)', () => {
  const outputDir = join(__dirname, 'torture_out');
  const fixturePath = join(__dirname, 'fixtures', 'torture.md');
  const outputPath = join(outputDir, 'torture.qti.zip');

  beforeAll(() => {
    if (existsSync(outputDir)) rmSync(outputDir, { recursive: true, force: true });
    mkdirSync(outputDir, { recursive: true });
    // Ensure asset exists
    copyFileSync(join(__dirname, 'fixtures', 'sample-graph.svg'), join(__dirname, 'fixtures', 'sample-graph.svg'));
  });

  afterAll(() => {
    // rmSync(outputDir, { recursive: true, force: true });
  });

  it('should generate QTI from torture markdown', () => {
    // Run CLI build
    try {
        execSync(`node dist/index.js "${fixturePath}" -o "${outputPath}"`, { stdio: 'pipe' });
    } catch (e: any) {
        console.error(e.stdout?.toString());
        console.error(e.stderr?.toString());
        throw e;
    }
    expect(existsSync(outputPath)).toBe(true);
  });

  it('should pass validation (except for intentional XSS)', async () => {
    const validator = new QtiValidator();
    const report = await validator.validatePackage(outputPath);
    
    // We expect validity to be TRUE generally, but we might have specific security errors
    // strict mode would fail on XSS. 
    // Let's check if it caught the XSS
    const xssErrors = report.errors.filter(e => e.includes('Potential malicious content'));
    
    // We expect the validator to catch the XSS attempt
    // const xssErrors = ... (already declared above)
    
    // The validator SHOULD flag this, so the package is technically "invalid" per our strict rules
    expect(report.isValid).toBe(false);
    expect(xssErrors.length).toBeGreaterThan(0);
    expect(xssErrors[0]).toContain('<script');

    // Confirm no OTHER critical errors (like Canvas import failures)
    const otherErrors = report.errors.filter(e => 
        !e.includes('Potential malicious content') && 
        !e.includes('Security Error')
    );
    expect(otherErrors).toHaveLength(0);
  });
});
