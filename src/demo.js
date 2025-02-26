let scriptLoaded = false;

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const licenseKey = params.get("licenseKey");
  const videoUrl = params.get("videoUrl");
  return { licenseKey, videoUrl };
}

function renderPlayer({ licenseKey, videoUrl }) {
  if (!licenseKey || !videoUrl) return;

  if (licenseKey && !scriptLoaded) {
    const script = document.createElement("script");
    script.src = `https://cdn.jwplayer.com/libraries/${licenseKey}.js`;
    script.onload = function () {
      scriptLoaded = true;

      if (videoUrl) {
        jwplayer("app").setup({ file: videoUrl });
      }
    };
    script.onerror = function () {
      console.error("Failed to load JW Player script");
    };
    document.head.appendChild(script);
  } else if (licenseKey && scriptLoaded) {
    if (videoUrl) {
      jwplayer("app").setup({ file: videoUrl });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const { licenseKey, videoUrl } = getQueryParams();

  renderPlayer({ licenseKey, videoUrl });
});
