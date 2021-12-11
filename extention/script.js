function $eeae273b763c7127$export$9ad17b9ce2011a8d(resultText) {
    let isPlaying1;
    switch(resultText){
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


(function() {
    const recognizer1 = initRecognizer();
    const startBtn = window.document.getElementById('js-start-btn');
    const stopBtn = window.document.getElementById('js-stop-btn');
    const contentDiv = window.document.getElementById('js-content');
    startBtn.addEventListener('click', function() {
        recognizerEvent(recognizer1);
    });
    stopBtn.addEventListener('click', function() {
        stopRecognizer(false);
    });
    function stopRecognizer(isRestart) {
        if (!isRestart) {
            recognizer1.onend = function() {
            };
            startBtn.innerHTML = '音声認識スタート';
            startBtn.removeAttribute('disabled');
        }
        recognizer1.stop();
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
        recognizer.onresult = function(event) {
            stopRecognizer(true);
            if (event.results[0].isFinal) {
                const resultText = event.results[0][0].transcript;
                contentDiv.innerHTML = resultText;
                $eeae273b763c7127$exports.eventHandlerByRecognizerResult(resultText);
            }
        };
        recognizer.onend = function() {
            startRecognizer();
        };
        function startRecognizer() {
            startBtn.innerHTML = '音声認識中...';
            startBtn.setAttribute('disabled', '');
            recognizer.start();
        }
    }
})();


