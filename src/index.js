import { Timer, ScoreBoard } from "./library";
import GameView from "./GameView";
import './assets/style.css'

const container = document.querySelector("#content");

const Game = function() {
    const view = new GameView(container, playRound);
    const timer = new Timer(1, 0, view.updateTimer);
    const score = new ScoreBoard();
    
    view.createCards(8);
    timer.startTimer();

    let selection1 = null;
    let selection2 = null;

    // Remover DOM manipulation para a classe
    function playRound(e) {
        const elementoReal = e.target.parentElement.parentElement;
        e.stopPropagation();

        if(!e.target.parentElement.classList.contains('flipped') && !e.target.classList.contains('flip-card-back')){
            e.target.parentElement.classList.add('flipped');
            if(selection1){
                selection2 = elementoReal.id;
                if(selection1.at(-1) === selection2.at(-1)) {
                    removeEvents(selection1, selection2);
                    score.setScore(timer.getSeconds());

                    // Arrumar score
                    console.log(score.getScore());

                    // Verificar pontuação
                    resetSelections();
                    const allCards = Array.from(document.querySelectorAll('.flip-card'));
                    if(allCards.every((card) => card.firstElementChild.classList.contains('flipped'))){
                        endGame();
                    }

                } else {
                    setTimeout(() => {
                        removeClasses(selection1, selection2);
                        resetSelections();
                    }, 800);
                }
            } else 
                selection1 = elementoReal.id;
                elementoReal.removeEventListener("click", playRound);
        }
    }
    // colocar na classe DOM
    function removeClasses(s1, s2) {
        const element1 = document.querySelector(`#${s1}`);
        const element2 = document.querySelector(`#${s2}`);

        element1.firstElementChild.classList.remove('flipped');
        element2.firstElementChild.classList.remove('flipped');
        element1.addEventListener("click", playRound);
        element2.addEventListener("click", playRound);
    }

    function removeEvents(...element) {
        const elements = [...element];
        elements.forEach((element) =>{
            document.querySelector(`#${element}`).removeEventListener("click", playRound);
        })
    }
    function resetSelections() {
        selection1 = null;
        selection2 = null;
    }

    function endGame() {
        timer.stopTimer();
        console.log("o jogo acabou, pontuação:" + score.getScore());
    }
}

Game();