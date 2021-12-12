// If you want to action by recognizer result, change this function.
export function actionByResult(resultText: string) {
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
