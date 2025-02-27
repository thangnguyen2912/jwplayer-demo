import "./demo.css";

let scriptLoaded = false;

const defaultConfig = {
  autostart: true,
  playsinline: true,
  mute: true,
  repeat: true,
  pipIcon: true,
  aspectratio: "16:9",
};

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return Object.fromEntries(params.entries());
}

function publishGlobalFunction(player) {
  if (!player) return;

  window.getCurrentTime = () => {
    return player.getPosition() || null;
  };

  window.seekTo = (time) => {
    if (player.getState() !== "idle") {
      player.seek(parseFloat(time));
    }
  };
}

function renderPlayer({ licenseKey, videoUrl, thumbnailUrl, ...config }) {
  if (!licenseKey || !videoUrl) return;

  if (licenseKey && !scriptLoaded) {
    const script = document.createElement("script");
    script.src = `https://cdn.jwplayer.com/libraries/${licenseKey}.js`;
    script.onload = function () {
      scriptLoaded = true;

      if (videoUrl) {
        const player = jwplayer("app").setup({
          ...config,
          file: videoUrl,
          image: thumbnailUrl,
        });

        publishGlobalFunction(player);
      }
    };
    script.onerror = function () {
      console.error("Failed to load JW Player script");
    };
    document.head.appendChild(script);
  } else if (licenseKey && scriptLoaded) {
    if (videoUrl) {
      const player = jwplayer("app").setup({
        ...config,
        file: videoUrl,
        image: thumbnailUrl,
      });

      publishGlobalFunction(player);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const params = getQueryParams();

  const {
    licenseKey,
    videoUrl,
    thumbnailUrl,
    autostart,
    mute,
    repeat,
    pipIcon,
    aspectratio,
    playsinline,
  } = params;

  renderPlayer({
    licenseKey,
    videoUrl,
    thumbnailUrl,
    autostart: autostart || defaultConfig.autostart,
    mute: mute || defaultConfig.mute,
    repeat: repeat || defaultConfig.repeat,
    pipIcon: pipIcon || defaultConfig.pipIcon,
    aspectratio: aspectratio || defaultConfig.aspectratio,
    playsinline: playsinline || defaultConfig.playsinline,
  });
});
