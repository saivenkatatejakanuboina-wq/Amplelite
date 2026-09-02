import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = join(root, 'hostinger.config.json');
const browserDir = join(root, 'dist', 'AmpleLiteAngular', 'browser');
const uploadDir = join(root, 'dist', 'hostinger-upload');
const zipPath = join(root, 'dist', 'amplelite-hostinger.zip');

function loadConfig() {
  const defaults = { siteUrl: 'https://yourdomain.com', baseHref: '/' };
  if (!existsSync(configPath)) return defaults;
  try {
    const parsed = JSON.parse(readFileSync(configPath, 'utf8'));
    return {
      siteUrl: parsed.siteUrl || defaults.siteUrl,
      baseHref: parsed.baseHref || defaults.baseHref,
    };
  } catch {
    console.warn('Could not read hostinger.config.json — using defaults.');
    return defaults;
  }
}

function normalizeBaseHref(value) {
  if (!value || value === '/') return '/';
  let href = String(value).trim();
  if (!href.startsWith('/')) href = `/${href}`;
  if (!href.endsWith('/')) href = `${href}/`;
  return href;
}

const config = loadConfig();
const baseHref = normalizeBaseHref(config.baseHref);

console.log(`Building for Hostinger (baseHref: ${baseHref})...`);

execSync(`npx ng build --configuration=hostinger --base-href=${baseHref}`, {
  cwd: root,
  stdio: 'inherit',
});

if (!existsSync(browserDir)) {
  console.error('Build output not found.');
  process.exit(1);
}

if (existsSync(uploadDir)) rmSync(uploadDir, { recursive: true, force: true });
mkdirSync(uploadDir, { recursive: true });
cpSync(browserDir, uploadDir, { recursive: true });

const csrIndex = join(uploadDir, 'index.csr.html');
const index = join(uploadDir, 'index.html');
if (!existsSync(index) && existsSync(csrIndex)) {
  cpSync(csrIndex, index);
}

writeFileSync(
  join(uploadDir, 'UPLOAD-TO-HOSTINGER.txt'),
  [
    'AmpleLite — Hostinger upload instructions',
    '========================================',
    '',
    '1. Log in to Hostinger hPanel',
    '2. Open File Manager → public_html',
    '3. Delete old site files (backup first if needed)',
    '4. Upload ALL files from this folder into public_html',
    '   (include .htaccess — required for page routes)',
    '5. Enable SSL: hPanel → SSL → activate free certificate',
    '',
    `Site URL (edit hostinger.config.json): ${config.siteUrl}`,
    `Base path: ${baseHref}`,
    '',
    'Or upload dist/amplelite-hostinger.zip and extract in public_html.',
    '',
  ].join('\r\n'),
  'utf8',
);

if (existsSync(zipPath)) rmSync(zipPath, { force: true });

if (process.platform === 'win32') {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${uploadDir.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force"`,
    { stdio: 'inherit' },
  );
}

const fileCount = readdirSync(uploadDir).length;

console.log('');
console.log('Ready to deploy!');
console.log(`  Folder: ${uploadDir}`);
if (existsSync(zipPath)) console.log(`  Zip:    ${zipPath}`);
console.log(`  Files:  ${fileCount} items`);
console.log('');
console.log('Upload to Hostinger public_html, then open your domain.');
console.log(`  Config: angular/hostinger.config.json (siteUrl + baseHref)`);
console.log('');
