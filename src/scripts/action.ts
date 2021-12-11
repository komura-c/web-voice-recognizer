// If you want to action by recognizer result, change this function.
export function actionByResult(resultText: string) {
  let isPlaying: boolean;
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
      return playAudio(isPlaying);
    case '停止':
      return stopAudio(isPlaying);
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
    const nextButton = document.querySelector('.player-button next') as HTMLElement;
    nextButton.click();
  }
  function previousAudio() {
    const previousButton = document.querySelector('.player-button prev') as HTMLElement;
    previousButton.click();
  }
  function playAudio(isPlaying: boolean) {
    if (isPlaying) {
      return;
    }
    const playButton = document.querySelector('.play-button') as HTMLElement;
    playButton.click();
    isPlaying = true;
  }
  function stopAudio(isPlaying: boolean) {
    if (!isPlaying) {
      return;
    }
    const playButton = document.querySelector('.play-button') as HTMLElement;
    playButton.click();
    isPlaying = false;
  }
}
