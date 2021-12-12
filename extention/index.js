voiceRecognition();
function voiceRecognition() {
  // @ts-ignore
  const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
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

  recognizer.onsoundstart = function () {
    console.log("状態: 認識中");
  };
  recognizer.onsoundend = function () {
    console.log("状態: 停止中");
    startRecognizer();
  };
  recognizer.onnomatch = function () {
    startRecognizer();
  };
  recognizer.onerror = function () {
    console.log("状態: エラー");
    startRecognizer();
  };

  let prevResultText;
  recognizer.onresult = function (event) {
    const results = event.results;
    const resultText = results[results.length - 1][0].transcript.trim();
    if (prevResultText === resultText) return;
    prevResultText = resultText;
    console.log(resultText);
    actionByResult(resultText);
    startRecognizer();
  };

  recognizer.onend = function () {
    isListening = false;
    startRecognizer();
  };

  startRecognizer();
}

function actionByResult(resultText) {
  switch (resultText) {
    case '上':
      return scrollUp();
    case '下':
      return scrollDown();
    default:
      return;
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
