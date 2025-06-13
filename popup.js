document.getElementById("scan").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayResults") {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    message.results.forEach((result) => {
      const li = document.createElement("li");

      const linkSpan = document.createElement("span");
      linkSpan.textContent = result.link;
      linkSpan.style.color = result.isPhishing ? "red" : "green";

      const statusSpan = document.createElement("div");
      statusSpan.innerHTML = `
        Phishing: ${result.isPhishing ? "True" : "False"}<br>
        Clickjacking: ${result.isClickjacking ? "True" : "False"}
      `;
      statusSpan.style.fontSize = "small";
      statusSpan.style.marginLeft = "10px";

      li.appendChild(linkSpan);
      li.appendChild(statusSpan);

      resultsContainer.appendChild(li);
    });
  }
});
