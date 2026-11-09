// Minimal zero-dependency server: static files + tiny save-blob API.
//   PUT /api/save/:id?rev=N   (header x-key, body <= 16KB gzip)  -> 204 | 409 if server rev is newer
//   GET /api/save/:id         (header x-key)                     -> gzip blob
// No accounts, no analytics, no polling. Storage = one small file per player.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = process.env.DATA_DIR || path.join(ROOT, 'server', 'data');
const PORT = +process.env.PORT || 8080;
const MAX = 16 * 1024;
fs.mkdirSync(DATA, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const hash = (k) => crypto.createHash('sha256').update(k).digest('hex');
const okId = (s) => /^[0-9a-f]{32}$/.test(s || '');

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const m = u.pathname.match(/^\/api\/save\/([0-9a-f]{32})$/);
  if (u.pathname.startsWith('/api/')) {
    if (!m) { res.writeHead(404).end(); return; }
    const id = m[1], key = req.headers['x-key'];
    if (!okId(key)) { res.writeHead(401).end(); return; }
    const f = path.join(DATA, id + '.json');
    const meta = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
    if (meta && meta.k !== hash(key)) { res.writeHead(403).end(); return; }
    if (req.method === 'GET') {
      if (!meta) { res.writeHead(404).end(); return; }
      res.writeHead(200, { 'content-type': 'application/octet-stream', 'cache-control': 'no-store' }).end(Buffer.from(meta.b, 'base64')); return;
    }
    if (req.method === 'PUT') {
      const chunks = []; let n = 0;
      req.on('data', (c) => { n += c.length; if (n > MAX) { res.writeHead(413).end(); req.destroy(); } else chunks.push(c); });
      req.on('end', () => {
        if (n > MAX) return;
        const rev = +u.searchParams.get('rev') || 0;
        if (meta && meta.rev > rev && !u.searchParams.get('force')) { res.writeHead(409).end(); return; }
        fs.writeFileSync(f, JSON.stringify({ k: hash(key), rev, at: Date.now(), b: Buffer.concat(chunks).toString('base64') }));
        res.writeHead(204).end();
      });
      return;
    }
    res.writeHead(405).end(); return;
  }
  let p = path.normalize(decodeURIComponent(u.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/') || p === '.') p = path.join(p, 'index.html');
  const fp = path.join(ROOT, p);
  if (!fp.startsWith(ROOT) || fp.startsWith(DATA) || p.startsWith('server') || p.startsWith('docs') || p.startsWith('.git')) { res.writeHead(404).end(); return; }
  fs.readFile(fp, (e, b) => {
    if (e) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream', 'cache-control': p === 'sw.js' ? 'no-cache' : 'public, max-age=3600' }).end(b);
  });
}).listen(PORT, () => console.log(`Guild of Ash on http://localhost:${PORT}`));
