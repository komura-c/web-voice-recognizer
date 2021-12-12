document.addEventListener('DOMContentLoaded', function () {
  // register event
  const startBtn = document.getElementById('js-start-btn');
  const stopBtn = document.getElementById('js-stop-btn');

  startBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log({ type: 'CLICK_START' });
      chrome.tabs.sendMessage(tabs[0].id, { type: 'CLICK_START' }, function (response) {
        startBtn.textContent = '音声認識中...';
        startBtn.setAttribute('disabled', '');
        console.log(response);
      });
    });
  });
  stopBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log({ type: 'CLICK_STOP' });
      chrome.tabs.sendMessage(tabs[0].id, { type: 'CLICK_STOP' }, function (response) {
        startBtn.textContent = '音声認識スタート';
        startBtn.removeAttribute('disabled');
        console.log(response);
      });
    });
  });
});
