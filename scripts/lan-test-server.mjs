import express from 'express';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browserDir = join(root, 'dist', 'hostinger-upload');
const port = Number(process.env.PORT || 4300);

if (!existsSync(join(browserDir, 'index.html')) && !existsSync(join(browserDir, 'index.csr.html'))) {
  console.error('No build found. Run: npm run build:hostinger');
  process.exit(1);
}

const indexFile = existsSync(join(browserDir, 'index.html'))
  ? 'index.html'
  : 'index.csr.html';

const app = express();
app.use(express.static(browserDir, { index: indexFile, fallthrough: true }));
app.get('{*path}', (_req, res) => {
  res.sendFile(join(browserDir, indexFile));
});

const server = createServer(app);
server.listen(port, '0.0.0.0', () => {
  const nets = networkInterfaces();
  const lan = Object.values(nets)
    .flat()
    .find((n) => n && n.family === 'IPv4' && !n.internal)?.address;
  console.log(`AmpleLite test server (static, no SSR)`);
  console.log(`  This PC:     http://localhost:${port}/`);
  console.log(`  Other PCs:   http://${lan || 'YOUR-IP'}:${port}/`);
  console.log('Keep this window open. Testers must use the Other PCs link, not localhost.');
});
