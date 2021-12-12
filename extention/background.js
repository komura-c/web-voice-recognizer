/** @var {boolean} Is the content script always executed. */
let isExecuted = false;

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  console.log(isExecuted);

  if (!isExecuted) {
    chrome.tabs.executeScript(null, { file: "/index.js" });
  }

  isExecuted = true;
});
