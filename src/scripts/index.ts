import { actionByResult } from './action';

voiceRecognition();
function voiceRecognition() {
  // @ts-ignore
  const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognizer = new Recognition();
  recognizer.lang = 'ja-JP';
  recognizer.interimResults = true;
  recognizer.continuous = true;

  // register event
  const startBtn = document.getElementById('js-start-btn');
  const stopBtn = document.getElementById('js-stop-btn');
  startBtn.addEventListener('click', function () {
    startRecognizer();
  });
  stopBtn.addEventListener('click', function () {
    stopRecognizer();
  });
  let isListening: boolean = false;
  function startRecognizer() {
    if (isListening) {
      return;
    }
    startBtn.innerHTML = '音声認識中...';
    startBtn.setAttribute('disabled', '');
    recognizer.start();
    isListening = true;
  }
  function stopRecognizer() {
    if (!isListening) {
      return;
    }
    startBtn.innerHTML = '音声認識スタート';
    startBtn.removeAttribute('disabled');
    recognizer.stop();
    isListening = false;
  }

  // show result
  const resultDiv = document.getElementById('js-result');
  let prevResultText: string;
  recognizer.onresult = function (event) {
    const results = event.results;
    const resultText = results[results.length - 1][0].transcript.trim();
    if (prevResultText === resultText) {
      return;
    }
    prevResultText = resultText;
    console.log(resultText);
    resultDiv.innerHTML = resultText;
    actionByResult(resultText);
  }

  recognizer.onend = function () {
    isListening = false;
    if (errorFlg) return;
    startRecognizer();
  };

  let errorFlg = false;
  const statusDiv = document.getElementById('js-status');
  recognizer.onsoundstart = function () {
    statusDiv.innerHTML = "認識中";
    errorFlg = false;
  };
  recognizer.onnomatch = function () {
    startRecognizer();
  };
  recognizer.onerror = function (err) {
    statusDiv.innerHTML = "エラー";
    console.error(err);
    stopRecognizer();
    errorFlg = true;
  };
  recognizer.onsoundend = function () {
    statusDiv.innerHTML = "停止中";
  };
}
