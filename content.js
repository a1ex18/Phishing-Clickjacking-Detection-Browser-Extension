(function () {
  const anchorTags = Array.from(document.querySelectorAll("a"));
  const hrefs = anchorTags.map((a) => a.href);

  function detectAdvancedClickjacking() {
    const iframes = document.getElementsByTagName('iframe');
    let clickjackingFound = false;

    for (let iframe of iframes) {
      const style = window.getComputedStyle(iframe);

      const opacity = parseFloat(style.opacity);
      const zIndex = parseInt(style.zIndex, 10);
      const transform = style.transform;
      const pointerEvents = style.pointerEvents;

      const suspiciousOpacity = opacity < 0.1;
      const suspiciousZIndex = !isNaN(zIndex) && zIndex > 1000;
      const suspiciousTransform = transform !== 'none';
      const hiddenOrTiny = iframe.offsetWidth < 10 || iframe.offsetHeight < 10;

      if (
        (!hiddenOrTiny && (suspiciousOpacity || suspiciousZIndex || suspiciousTransform)) ||
        pointerEvents === 'none'
      ) {
        clickjackingFound = true;
        break;
      }
    }

    return clickjackingFound;
  }

  const clickjackingDetected = detectAdvancedClickjacking();

  chrome.runtime.sendMessage({
    action: "extractLinks",
    links: hrefs,
    clickjackingDetected: clickjackingDetected
  });
})();
