// Rewarded-ad abstraction. Ships with a test overlay; swap in a real network by assigning
// window.BSG_AD_PROVIDER = { show: async (placement) => boolean }  (e.g. AdMob via Capacitor).
import { t } from './i18n.js';
export async function showRewarded(placement) {
  const p = window.BSG_AD_PROVIDER;
  if (p) { try { return !!(await p.show(placement)); } catch { return false; } }
  return new Promise((res) => {
    const el = document.createElement('div'); el.className = 'adov';
    let n = 3; const draw = () => el.innerHTML = `<div><b>${t('ad_title')}</b><p>${placement}</p><p class="n">${t('ad_wait', { n })}</p></div>`;
    draw(); document.body.append(el);
    const iv = setInterval(() => { if (--n <= 0) { clearInterval(iv); el.remove(); res(true); } else draw(); }, 1000);
  });
}
