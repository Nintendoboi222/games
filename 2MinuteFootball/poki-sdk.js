/* Offline stand-in for the Poki SDK: no ads, no tracking. Ad calls resolve right away; rewarded ads always reward. */
(function () {
  var done = function () { return Promise.resolve(); };
  var noop = function () {};
  var sdk = {
    init: done,
    initWithVideoHB: done,
    setDebug: noop,
    setLogging: noop,
    setPlayerAge: noop,
    gameLoadingStart: noop,
    gameLoadingProgress: noop,
    gameLoadingFinished: noop,
    gameInteractive: noop,
    gameplayStart: noop,
    gameplayStop: noop,
    roundStart: noop,
    roundEnd: noop,
    happyTime: noop,
    customEvent: noop,
    logError: noop,
    sendHighscore: noop,
    measure: noop,
    enableEventTracking: noop,
    setDebugTouchOverlayController: noop,
    togglePlayerAdvertisingConsent: noop,
    commercialBreak: function (cb) { if (typeof cb === 'function') cb(); return Promise.resolve(); },
    rewardedBreak: function (opts) {
      var cb = opts && typeof opts === 'object' ? opts.onStart : opts;
      if (typeof cb === 'function') cb();
      return Promise.resolve(true);
    },
    displayAd: noop,
    destroyAd: noop,
    isAdBlocked: function () { return false; },
    getURLParam: function (k) { return new URLSearchParams(location.search).get(k) || ''; },
    getLanguage: function () { return (navigator.language || 'en').slice(0, 2); },
    getIsoLanguage: function () { return (navigator.language || 'en').slice(0, 2); },
    shareableURL: function () { return Promise.resolve(location.href); },
    generateScreenshot: done,
    captureError: noop
  };
  window.PokiSDK = new Proxy(sdk, {
    get: function (t, k) {
      if (k in t) return t[k];
      if (k === 'then' || typeof k === 'symbol') return undefined;
      return noop;
    }
  });
  window.PokiSDK_OK = true;
})();
