chrome.extension.onMessage.addListener(function (request) {
  if (request == "action") {
    voiceRecognition();
  }
});

function voiceRecognition() {
  // @ts-ignore
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognizer = new Recognition();
  recognizer.lang = 'ja-JP';
  recognizer.interimResults = true;
  recognizer.continuous = true;

  let isListening = false;
  function startRecognizer() {
    if (isListening) return;
    recognizer.start();
    isListening = true;
  }
  function stopRecognizer() {
    if (!isListening) return;
    recognizer.stop();
    isListening = false;
  }

  let errorFlg = false;
  recognizer.onsoundstart = function () {
    console.log("状態: 認識中");
    errorFlg = false;
  };
  recognizer.onsoundend = function () {
    console.log("状態: 停止中");
    startRecognizer();
  };
  recognizer.onnomatch = function () {
    startRecognizer();
  };
  recognizer.onerror = function (err) {
    console.log("状態: エラー");
    console.error(err);
    stopRecognizer();
    errorFlg = true;
  };

  let prevResultText;
  recognizer.onresult = function (event) {
    const results = event.results;
    const resultText = results[results.length - 1][0].transcript.trim();
    if (prevResultText === resultText) return;
    prevResultText = resultText;
    console.log(resultText);
    actionByResult(resultText);
  };

  recognizer.onend = function () {
    isListening = false;
    if (errorFlg) return;
    startRecognizer();
  };

  startRecognizer();
}

function actionByResult(resultText) {
  if (isMatchWord(resultText, '上')) {
    return scrollUp();
  } else if (isMatchWord(resultText, '下')) {
    return scrollDown();
  }

  function isMatchWord(resultText, keyword) {
    return resultText.indexOf(keyword) != -1
  }

  function scrollUp() {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth"
    });
  }
  function scrollDown() {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }
}
