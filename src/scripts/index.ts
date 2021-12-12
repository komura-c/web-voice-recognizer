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
  let isListening: boolean = false;
  const button = document.getElementById('js-button');
  button.addEventListener('click', function () {
    if (isListening) {
      stopRecognizer();
    } else {
      startRecognizer();
    }
  });
  function startRecognizer() {
    if (isListening) {
      return;
    }
    button.classList.add("on");
    recognizer.start();
    isListening = true;
  }
  function stopRecognizer() {
    if (!isListening) {
      return;
    }
    button.classList.remove("on");
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
    resultDiv.textContent = resultText;
    actionByResult(resultText);
    startRecognizer();
  }

  const statusDiv = document.getElementById('js-status');
  recognizer.onsoundstart = function () {
    statusDiv.textContent = "認識中";
  };
  recognizer.onnomatch = function () {
    startRecognizer();
  };
  recognizer.onerror = function (err) {
    statusDiv.textContent = "エラー";
    console.error(err);
    stopRecognizer();
  };
  recognizer.onsoundend = function () {
    statusDiv.textContent = "停止中";
  };
}
