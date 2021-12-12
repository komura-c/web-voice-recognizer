function $03a545ee903107a9$export$9ad64de1a9eede95(resultText1) {
    if (isMatchWord(resultText1, '上')) return scrollUp();
    else if (isMatchWord(resultText1, '下')) return scrollDown();
    function isMatchWord(resultText, keyword) {
        return resultText.indexOf(keyword) != -1;
    }
    function scrollUp() {
        window.scrollBy({
            top: -window.innerHeight / 2,
            behavior: "smooth"
        });
    }
    function scrollDown() {
        window.scrollBy({
            top: window.innerHeight / 2,
            behavior: "smooth"
        });
    }
}


$4f4b950fc6bbd4d0$var$voiceRecognition();
function $4f4b950fc6bbd4d0$var$voiceRecognition() {
    // @ts-ignore
    const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognizer = new Recognition();
    recognizer.lang = 'ja-JP';
    recognizer.interimResults = true;
    recognizer.continuous = true;
    // register event
    let isListening = false;
    const button = document.getElementById('js-button');
    button.addEventListener('click', function() {
        if (isListening) stopRecognizer();
        else startRecognizer();
    });
    function startRecognizer() {
        if (isListening) return;
        button.classList.add("on");
        recognizer.start();
        isListening = true;
    }
    function stopRecognizer() {
        if (!isListening) return;
        button.classList.remove("on");
        recognizer.stop();
        isListening = false;
    }
    // show result
    const resultDiv = document.getElementById('js-result');
    let prevResultText;
    recognizer.onresult = function(event) {
        const results = event.results;
        const resultText = results[results.length - 1][0].transcript.trim();
        if (prevResultText === resultText) return;
        prevResultText = resultText;
        console.log(resultText);
        resultDiv.textContent = resultText;
        $03a545ee903107a9$export$9ad64de1a9eede95(resultText);
        startRecognizer();
    };
    const statusDiv = document.getElementById('js-status');
    recognizer.onsoundstart = function() {
        statusDiv.textContent = "認識中";
    };
    recognizer.onnomatch = function() {
        startRecognizer();
    };
    recognizer.onerror = function(err) {
        statusDiv.textContent = "エラー";
        console.error(err);
        stopRecognizer();
    };
    recognizer.onsoundend = function() {
        statusDiv.textContent = "停止中";
    };
}


