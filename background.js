let phishingPatterns = [];

async function loadPhishingPatterns() {
  const files = [
    "phishing_keywords.lst",
    "brand_names.lst",
    "common_terms.lst",
    "extra_terms.txt"
  ];
  
  try {
    const allPatterns = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(chrome.runtime.getURL(file));
        const text = await response.text();
        return text.split(/\r?\n/).filter(Boolean);
      })
    );
    phishingPatterns = allPatterns.flat();
  } catch (error) {
    console.error("Failed to load phishing patterns:", error);
    phishingPatterns = [];
  }
}

loadPhishingPatterns();

async function checkUrlWithGoogleSafeBrowsing(url) {
  const apiKey = "AIzaSyDcle4eVt7i39KnZ57vi0iK8qX8WQpA5LU";
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "phishing-detector",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: url }],
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.matches ? true : false;
  } catch (error) {
    console.error("Safe Browsing API error:", error);
    return false;
  }
}

function heuristicCheck(url) {
  const suspiciousTLDs = [".co", ".tk", ".ml", ".ga", ".cf", ".gq"];
  const lowerUrl = url.toLowerCase();
  
  return (
    phishingPatterns.some((pattern) => lowerUrl.includes(pattern)) ||
    suspiciousTLDs.some((tld) => lowerUrl.endsWith(tld))
  );
}

async function isPhishingLink(link) {
  const isGooglePhishing = await checkUrlWithGoogleSafeBrowsing(link);
  const isHeuristicPhishing = heuristicCheck(link);
  return isGooglePhishing || isHeuristicPhishing;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractLinks") {
    const validateLinks = async () => {
      const results = await Promise.all(
        message.links.map(async (link) => ({
          link: link,
          isPhishing: await isPhishingLink(link),
          isClickjacking: message.clickjackingDetected
        }))
      );
      chrome.runtime.sendMessage({
        action: "displayResults",
        results: results
      });
    };
    validateLinks();
  }
});
