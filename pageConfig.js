export default class Page{
    constructor()
    {
        this.turn = document.querySelector("#left");
        this.correctAnswer = document.querySelector("#correct-answer");
        this.wrongAnswer = document.querySelector("#wrong-answer");
        this.questionArea = document.querySelector(".question");
        this.man = document.querySelectorAll(".man-item");
        this.manItemLength = this.man.length;
        this.secretArea = document.querySelector(".secret");
        this.letters = document.querySelectorAll("#alphabet span");
        this.popup = document.querySelector(".popup-container");
        this.message = document.querySelector(".message");
        this.restartBtn = document.querySelector("#restart");
    }

    reset() {

        this.popup.style.display = "none";
        this.man.forEach(item => {
            item.style.display = "none";
        });
        this.letters.forEach(letter => {
            letter.removeAttribute("class");
        });

        this.correctAnswer.textContent = "Doğru: 0";
        this.wrongAnswer.textContent = "Yanlış: 0";
    }
}

