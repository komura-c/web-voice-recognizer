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
  recognizer.onresult = function (event) {
    const results = event.results;
    const resultText = results[results.length - 1][0].transcript.trim();
    console.log(resultText);
    resultDiv.innerHTML = resultText;
    actionByResult(resultText);
    startRecognizer();
  }

  const statusDiv = document.getElementById('js-status');
  recognizer.onsoundstart = function () {
    statusDiv.innerHTML = "認識中";
  };
  recognizer.onnomatch = function () {
    startRecognizer();
  };
  recognizer.onerror = function () {
    statusDiv.innerHTML = "エラー";
    startRecognizer();
  };
  recognizer.onsoundend = function () {
    statusDiv.innerHTML = "停止中";
  };
}
