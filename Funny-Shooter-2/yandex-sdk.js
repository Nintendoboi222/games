/* Offline stand-in for the Yandex Games SDK: no ads, no tracking.
   Rewarded ads always reward, saves go to localStorage, real-money purchases are unavailable. */
(function () {
  var KEY = 'funny-shooter-2-save';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function store(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  var lang = (navigator.language || 'en').slice(0, 2);
  var player = {
    getData: function (keys) {
      var all = load(), out = {};
      (keys || Object.keys(all)).forEach(function (k) { if (k in all) out[k] = all[k]; });
      return Promise.resolve(out);
    },
    setData: function (data) {
      var all = load();
      Object.keys(data || {}).forEach(function (k) { all[k] = data[k]; });
      store(all);
      return Promise.resolve();
    },
    getName: function () { return ''; },
    getUniqueID: function () { return 'local'; }
  };
  function call(cb, name) {
    var args = Array.prototype.slice.call(arguments, 2);
    if (cb && typeof cb[name] === 'function') { try { cb[name].apply(null, args); } catch (e) { console.error(e); } }
  }
  var sdk = {
    environment: { i18n: { lang: lang, tld: 'com' } },
    getPlayer: function () { return Promise.resolve(player); },
    getPayments: function () { return Promise.reject(new Error('Purchases are not available')); },
    adv: {
      showFullscreenAdv: function (o) {
        var cb = o && o.callbacks;
        setTimeout(function () { call(cb, 'onClose', false); }, 0);
      },
      showRewardedVideo: function (o) {
        var cb = o && o.callbacks;
        setTimeout(function () {
          call(cb, 'onOpen');
          call(cb, 'onRewarded');
          call(cb, 'onClose');
        }, 0);
      },
      showBannerAdv: function () { return Promise.resolve({ stickyAdvIsShowing: false }); },
      hideBannerAdv: function () { return Promise.resolve({ stickyAdvIsShowing: false }); }
    },
    features: { LoadingAPI: { ready: function () {} } },
    feedback: { canReview: function () { return Promise.resolve({ value: false }); } }
  };
  window.YaGames = { init: function () { return Promise.resolve(sdk); } };
})();
