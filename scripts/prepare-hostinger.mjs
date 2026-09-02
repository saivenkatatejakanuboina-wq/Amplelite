import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browserDir = join(root, 'dist', 'AmpleLiteAngular', 'browser');
const uploadDir = join(root, 'dist', 'hostinger-upload');

function copyRecursive(src, dest) {
  cpSync(src, dest, { recursive: true });
}

if (!existsSync(browserDir)) {
  console.error('Build output not found. Run: npm run build:hostinger');
  process.exit(1);
}

if (existsSync(uploadDir)) {
  rmSync(uploadDir, { recursive: true, force: true });
}
mkdirSync(uploadDir, { recursive: true });

copyRecursive(browserDir, uploadDir);

const csrIndex = join(uploadDir, 'index.csr.html');
const index = join(uploadDir, 'index.html');

if (!existsSync(index) && existsSync(csrIndex)) {
  cpSync(csrIndex, index);
}

const files = readdirSync(uploadDir);
const fileCount = files.length;

console.log('');
console.log('Hostinger upload package ready:');
console.log(`  ${uploadDir}`);
console.log(`  ${fileCount} items in root`);
console.log('');
console.log('Upload everything inside dist/hostinger-upload/ to Hostinger public_html');
console.log('');
