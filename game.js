import Page from "./pageConfig.js";
let page = new Page();

export default class Game {

    constructor() {
        this.wrong = 7;
        this.questions = [
            {
                question: "Bir Şehir",
                answer: "Ankara"
            },
            {
                question: "Bir programlama dili",
                answer: "PHP"
            },
            {
                question: "Bir eşya",
                answer: "Araba"
            }
        ];
        this.correctAnswers = [];
        this.wrongAnswers = [];
        this.currentQuestion = null;

        this.newQuestion();
    }

    selectQuestion() {
        let index = Math.floor(Math.random() * this.questions.length);
        let question = this.questions[index];
        this.questions.splice(index, 1);
        return question;
    }

    newQuestion() {
        let question = this.selectQuestion();
        this.currentQuestion = question.answer.split("").map(l => { return convertToLower(l) }).join("");
        let letters = question.answer;
        let letterCount = letters.length;
        page.secretArea.innerHTML = "<h6>" + question.question + "</h6>";
        page.questionArea.innerHTML = "<span>&nbsp;</span>".repeat(letterCount);
    }

    controlLetter(keyboardKey)
    {

        let result = true;
        switch (true) {
            case (!keyboardKey.match(/^[a-zA-ZĞÜİŞÖÇığüşçö]+$/)):
                result = false;
                break;
            case (this.correctAnswers.includes(keyboardKey) || this.wrongAnswers.includes(keyboardKey)):
                result = false;
            default:
                break;
        }
                
        if (result)
        {
            this.handleAnswer(keyboardKey);
        }
    }

    handleAnswer(keyboardKey) {
        
        if (this.wrong > 0)
        {
            let classType;
            
            if (!this.currentQuestion.includes(keyboardKey)) {
                
                --this.wrong
                this.wrongAnswers.push(keyboardKey); 
                classType = "selected-wrong";               
                this.handleMan();
            }
            else
            {
                this.correctAnswers.push(keyboardKey);
                classType = "selected-correct";               
            }

            page.questionArea.innerHTML = this.renderQuestion();
            this.handleLetters(keyboardKey, classType);
            this.updateStatus();
            
            if (this.currentQuestion === this.renderQuestion())
            {
                page.message.textContent = "Kazandınız";
                page.popup.style.display = "block";
            }

        }
        
        if (this.wrong === 0) {
            page.message.textContent = "Oyun Bitti";
            page.popup.style.display = "block"
        }
            
    }

    renderQuestion() {
        let word = Array.from(this.currentQuestion).map(letter => {
            return this.correctAnswers.includes(letter) ? letter : "<span>&nbsp;</span>";
        }).join("");

        return convertToLower(word);
    }

    handleMan(){
        for (let i = 0; i < this.wrongAnswers.length; i++) {
            page.man[i].style.display = "inline";
        }
    }

    updateStatus() {

        page.correctAnswer.textContent = "Doğru: " + this.correctAnswers.length;
        page.wrongAnswer.textContent = "Yanlış: " + this.wrongAnswers.length;
    }

  

    handleLetters(keyboardKey, classType){
        
        let nodeListObject = {
            length: page.letters.length,
            item: function (index) {
                return page.letters[index]; 
            },
            forEach: function (callback) {
                 Array.from(page.letters).forEach(function(item){
                     callback(item, keyboardKey, classType);
                 });
            },
        };

        nodeListObject.forEach(markLetter);

    }

}

function convertToLower(letter){
    let myLetters = ["Ğ","Ü","İ","Ş","Ö","Ç"];
    let myLettersLower = ["ğ","ü","i","ş","ö","ç"];

    if (myLetters.includes(letter))
    {
        return myLettersLower[myLetters.indexOf(letter)]
    }
    else
    {
        return letter.toLowerCase();
    }
}

function markLetter(item, keyboardKey, classType)
{
    
    if (convertToLower(item.textContent) === keyboardKey)
    {
        item.classList.toggle(classType);
    }
}
