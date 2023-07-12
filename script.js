import Game from "./game.js";
import Page from "./pageConfig.js";

let page = new Page();
let game = new Game();

document.addEventListener("keydown", (e) => {
    game.controlLetter(e.key);
});

page.restartBtn.addEventListener("click", (e) => {
    page.reset()
    game = new Game();
});




(function () {
    page.correctAnswer.textContent = "Doğru: 0";
    page.wrongAnswer.textContent = "Yanlış: 0";
    page.popup.style.display = "none"
})();