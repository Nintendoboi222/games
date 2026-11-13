/* Offline stand-in for the GameDistribution SDK: no ads, no tracking. Ad calls finish right away. */
(function () {
  var opts = window.GD_OPTIONS || window.gdApi || {};
  function emit(name) {
    if (opts && typeof opts.onEvent === 'function') {
      try { opts.onEvent({ name: name, message: name, status: 'success' }); } catch (e) { console.error(e); }
    }
  }
  function adDone() {
    emit('SDK_GAME_PAUSE');
    return new Promise(function (resolve) {
      setTimeout(function () { emit('SDK_GAME_START'); resolve(); }, 0);
    });
  }
  window.gdsdk = {
    showAd: adDone,
    showBanner: adDone,
    preloadAd: function () { return Promise.resolve(); },
    cancelAd: function () { return Promise.resolve(); },
    openConsole: function () {},
    AdType: { Interstitial: 'interstitial', Rewarded: 'rewarded', Display: 'display' }
  };
  setTimeout(function () { emit('SDK_READY'); }, 0);
})();
