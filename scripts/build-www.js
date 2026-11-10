// Copies the game's static files into www/ (the Capacitor web dir). Server/docs are NOT shipped.
import fs from 'node:fs';
fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www', { recursive: true });
for (const f of ['index.html', 'style.css', 'manifest.webmanifest', 'js', 'icons', 'art']) fs.cpSync(f, 'www/' + f, { recursive: true });
console.log('www/ ready');
