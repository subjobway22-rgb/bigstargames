// Real rewarded ads for the Android build (Capacitor AdMob). Loaded only when running natively.
// Replace the TEST ids with your AdMob unit ids before release. Test ids below are Google's official ones.
const UNIT = { android: 'ca-app-pub-3940256099942544/5224354917' };
export async function initAdMob() {
  const cap = window.Capacitor; if (!cap?.isNativePlatform?.()) return;
  const { AdMob, RewardAdPluginEvents } = cap.Plugins;
  await AdMob.initialize({ initializeForTesting: true });
  window.BSG_AD_PROVIDER = {
    show: (placement) => new Promise(async (res) => {
      let rewarded = false;
      const h1 = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewarded = true; });
      const h2 = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => { h1.remove(); h2.remove(); res(rewarded); });
      try { await AdMob.prepareRewardVideoAd({ adId: UNIT.android }); await AdMob.showRewardVideoAd(); }
      catch { h1.remove(); h2.remove(); res(false); }
    }),
  };
}
