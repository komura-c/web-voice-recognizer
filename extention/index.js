// popup.jsからのイベント監視
chrome.runtime.onMessage.addListener(function (message) {
  const recognizer = voiceRecognition();
  console.log(recognizer);
  if (!recognizer) {
    return '読み込み中';
  }
  if (message.type === 'CLICK_START') {
    startRecognizer(recognizer);
  }
  if (message.type === 'CLICK_STOP') {
    stopRecognizer(recognizer);
  }
  return '認識中...'
});

let isListening = false;
function startRecognizer(recognizer) {
  if (isListening) return;
  recognizer.start();
  isListening = true;
}
function stopRecognizer(recognizer) {
  if (!isListening) return;
  recognizer.stop();
  isListening = false;
}

function voiceRecognition() {
  // @ts-ignore
  const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognizer = new Recognition();
  recognizer.lang = 'ja-JP';
  recognizer.interimResults = true;
  recognizer.continuous = true;

  recognizer.onsoundstart = function () {
    console.log("状態: 認識中");
  };
  recognizer.onnomatch = function () {
    recognizer.start();
  };
  recognizer.onerror = function () {
    console.log("状態: エラー");
    recognizer.start();
  };
  recognizer.onsoundend = function () {
    console.log("状態: 停止中");
  };

  let prevResultText;
  recognizer.onresult = function (event) {
    const results = event.results;
    const resultText = results[results.length - 1][0].transcript.trim();
    if (prevResultText === resultText) return;
    prevResultText = resultText;
    console.log(resultText);
    actionByResult(resultText);
    recognizer.start();
  };

  startRecognizer();
  return recognizer;
}

function actionByResult(resultText) {
  let isPlaying1;
  switch (resultText) {
    case '上':
      return scrollUp();
    case '下':
      return scrollDown();
    case '次':
      return nextAudio();
    case '前':
      return previousAudio();
    case '再生':
      return playAudio(isPlaying1);
    case '停止':
      return stopAudio(isPlaying1);
    default:
      return;
  }
  function scrollUp() {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }
  function scrollDown() {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth"
    });
  }
  function nextAudio() {
    const nextButton = document.querySelector('.player-button next');
    nextButton.click();
  }
  function previousAudio() {
    const previousButton = document.querySelector('.player-button prev');
    previousButton.click();
  }
  function playAudio(isPlaying) {
    if (isPlaying) return;
    const playButton = document.querySelector('.play-button');
    playButton.click();
    isPlaying = true;
  }
  function stopAudio(isPlaying) {
    if (!isPlaying) return;
    const playButton = document.querySelector('.play-button');
    playButton.click();
    isPlaying = false;
  }
}
