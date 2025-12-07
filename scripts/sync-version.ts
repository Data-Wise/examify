import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// 1. Get new version from package.json (which npm just updated)
const pkgPath = join(process.cwd(), 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const newVersion = pkg.version;

console.log(`🔄 Syncing version ${newVersion} across files...`);

// 2. Update src/index.ts
const indexPath = join(process.cwd(), 'src/index.ts');
let indexContent = readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(/\.version\('[0-9]+\.[0-9]+\.[0-9]+'\)/, `.version('${newVersion}')`);
writeFileSync(indexPath, indexContent);
console.log('✅ Updated src/index.ts');

// 3. Update _extensions/exam/_extension.yml
const extPath = join(process.cwd(), '_extensions/exam/_extension.yml');
let extContent = readFileSync(extPath, 'utf8');
extContent = extContent.replace(/version: [0-9]+\.[0-9]+\.[0-9]+/, `version: ${newVersion}`);
writeFileSync(extPath, extContent);
console.log('✅ Updated _extensions/exam/_extension.yml');

// 4. Update README.md Badge
const readmePath = join(process.cwd(), 'README.md');
let readmeContent = readFileSync(readmePath, 'utf8');
// Matches regex for the badge URL pattern: vX.Y.Z-COLOR
readmeContent = readmeContent.replace(/v[0-9]+\.[0-9]+\.[0-9]+-[A-F0-9]+/, `v${newVersion}-7C3AED`);
writeFileSync(readmePath, readmeContent);
console.log('✅ Updated README.md');

// 5. Stage files for the commit
try {
  execSync(`git add "${indexPath}" "${extPath}" "${readmePath}"`);
  console.log('✅ Staged files for commit');
} catch (error) {
  console.error('❌ Failed to stage files:', error);
  process.exit(1);
}
