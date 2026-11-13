<!DOCTYPE html>
<html lang="en-us">

<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Block Blast Puzzle</title>
  <link rel="shortcut icon" href="TemplateData/favicon.ico">
  <link rel="stylesheet" href="TemplateData/style.css">
  <link rel="manifest" href="manifest.webmanifest">
</head>

<body>
  <div id="unity-container">
    <canvas id="unity-canvas" width=1080 height=1920 tabindex="-1"></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-warning"> </div>
  </div>

  <script>
    window.addEventListener("load", function() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("ServiceWorker.js");
      }
    });

    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var warningBanner = document.querySelector("#unity-warning");

    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      }
      var div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/BlockBlast1.1-8.loader.js";
    var config = {
      dataUrl: buildUrl + "/BlockBlast1.1-8.data.unityweb",
      frameworkUrl: buildUrl + "/BlockBlast1.1-8.framework.js.unityweb",
      codeUrl: buildUrl + "/BlockBlast1.1-8.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "reun",
      productName: "Block Blast Puzzle",
      productVersion: "1.1",
      showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        loadingBar.style.display = "none";
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
  </script>

</body>

</html>