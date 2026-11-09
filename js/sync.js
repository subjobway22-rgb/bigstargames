// Optional cloud backup. Zero traffic unless the user enables it.
// In the Android app set window.BSG_API (e.g. https://save.example.com); on the web dev server it is same-origin.
const API = (typeof window !== 'undefined' && window.BSG_API) || '';
// Payload: gzip(JSON of essential state) ≈ 1–3 KB, sent only if state.rev changed, max once / 15 min, plus on hide.
const MIN_GAP = 15 * 60 * 1000;
const strip = (st) => { const o = JSON.parse(JSON.stringify(st)); delete o.pool; delete o.cloud; return o; };
async function gz(str) { const s = new Blob([str]).stream().pipeThrough(new CompressionStream('gzip')); return new Uint8Array(await new Response(s).arrayBuffer()); }
async function ungz(buf) { const s = new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip')); return await new Response(s).text(); }
function ensureId(st) {
  if (!st.cloud.id) { st.cloud.id = crypto.randomUUID().replaceAll('-', ''); st.cloud.key = crypto.randomUUID().replaceAll('-', ''); }
}
export async function upload(st, now = Date.now(), force = false) {
  if (!force && (!st.set.sync || st.rev === st.cloud.rev || now - st.cloud.at < MIN_GAP)) return 'skip';
  ensureId(st);
  try {
    const r = await fetch(`${API}/api/save/${st.cloud.id}?rev=${st.rev}${force ? '&force=1' : ''}`, { method: 'PUT', headers: { 'x-key': st.cloud.key, 'content-type': 'application/octet-stream' }, body: await gz(JSON.stringify(strip(st))) });
    if (r.status === 409) return 'newer';
    if (!r.ok) return 'err';
    st.cloud.rev = st.rev; st.cloud.at = now; return 'ok';
  } catch { return 'err'; }
}
export async function download(st, id, key) {
  try {
    const r = await fetch(`${API}/api/save/${id}`, { headers: { 'x-key': key } });
    if (r.status === 404) return { r: 'none' };
    if (!r.ok) return { r: 'err' };
    const o = JSON.parse(await ungz(await r.arrayBuffer()));
    return { r: 'ok', data: o };
  } catch { return { r: 'err' }; }
}
