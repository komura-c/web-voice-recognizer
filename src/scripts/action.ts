// If you want to action by recognizer result, change this function.
export function actionByResult(resultText: string) {
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
