import { actionByResult } from './action';

(function () {
  const recognizer = initRecognizer();

  const startBtn = window.document.getElementById('js-start-btn');
  const stopBtn = window.document.getElementById('js-stop-btn');
  const contentDiv = window.document.getElementById('js-content');
  startBtn.addEventListener('click', function () {
    recognizerEvent(recognizer);
  });
  stopBtn.addEventListener('click', function () {
    stopRecognizer(false);
  });
  function stopRecognizer(isRestart: boolean) {
    if (!isRestart) {
      recognizer.onend = function () { };
      startBtn.innerHTML = '音声認識スタート';
      startBtn.removeAttribute('disabled');
    }
    recognizer.stop();
  }

  function initRecognizer() {
    // @ts-ignore
    const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognizer = new Recognition();
    recognizer.lang = 'ja-JP';
    return recognizer;
  }

  function recognizerEvent(recognizer) {
    startRecognizer();

    recognizer.onresult = function (event) {
      stopRecognizer(true);

      if (event.results[0].isFinal) {
        const resultText = event.results[0][0].transcript;
        contentDiv.innerHTML = resultText;

        actionByResult(resultText);
      }
    }
    recognizer.onend = function () {
      startRecognizer();
    };

    function startRecognizer() {
      startBtn.innerHTML = '音声認識中...';
      startBtn.setAttribute('disabled', '');
      recognizer.start();
    }
  }
})()
