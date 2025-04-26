import { Utils, Timer, ScoreBoard } from "./library";

class GameView {

    constructor(parentElement, eventFunction) {
        this.parentElement = parentElement;
        this.eventFunction = eventFunction;
    }

    async createCards(numberOfCards) {
        const cards = [];
        for (let i = 1; i <= numberOfCards; i++) {
            cards.push(i);
            cards.push(Number(`${i}${i}`)); 
        }
    
        // Embaralhar
        Utils.shuffleArray(cards);
    
        // Criar elementos DOM
        const imageCache = new Map();
        const uniqueImageKeys = [...new Set(cards.map(card => String(card)[0]))];
    
        await Promise.all(uniqueImageKeys.map(async (key) => {
            const image = await Utils.importImage(key);
            imageCache.set(key, image);
        }));
    
        const fragment = document.createDocumentFragment();
        
        cards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('flip-card');
            cardElement.id = `card-${card}`;
    
            const flipCardInner = document.createElement('div');
            flipCardInner.classList.add('flip-card-inner');
    
            const frontCard = document.createElement('div');
            frontCard.classList.add('flip-card-front');
    
            const backCard = document.createElement('div');
            backCard.classList.add('flip-card-back');
    
            const cardImage = document.createElement('img');
            
            cardImage.src = imageCache.get(String(card)[0]);
            
            flipCardInner.appendChild(frontCard);
            flipCardInner.appendChild(backCard);
            backCard.appendChild(cardImage);
            cardElement.appendChild(flipCardInner);
    
            cardElement.addEventListener("click", this.eventFunction);
            fragment.appendChild(cardElement);
        });
    
        this.parentElement.appendChild(fragment);
    }

    updateTimer(minutes, seconds) {
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        document.querySelector('#timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
    }

    removeEvents(...element) {
        const elements = [...element];
        elements.forEach((element) =>{
            document.querySelector(`#${element}`).removeEventListener("click", this.eventFunction);
        })
    }

    removeClasses(s1, s2) {
        const element1 = document.querySelector(`#${s1}`);
        const element2 = document.querySelector(`#${s2}`);

        element1.firstElementChild.classList.remove('flipped');
        element2.firstElementChild.classList.remove('flipped');
    }
}


const Game = function(container) {
    const view = new GameView(container, playRound);
    const timer = new Timer(0, 59, view.updateTimer, endGame);
    const score = new ScoreBoard();
    
    view.createCards(8);
    timer.startTimer();

    let selection1 = null;
    let selection2 = null;

    function playRound(e) {
        e.stopPropagation();
        const targetElement = e.target;
        const cardComponent = e.target.parentElement.parentElement;
        const childCardElement = e.target.parentElement;

        const allCards = Array.from(document.querySelectorAll('.flip-card'));

        if(!childCardElement.classList.contains('flipped') && targetElement.classList.contains('flip-card-front')){

            childCardElement.classList.add('flipped');
            if(selection1){
                selection2 = cardComponent.id;

                if(selection1.at(-1) === selection2.at(-1)) {
                    view.removeEvents(selection1, selection2);
                    score.setScore(timer.getSeconds());

                    // Arrumar score
                    console.log(score.getScore());

                    resetSelections();

                    if(allCards.every((card) => card.firstElementChild.classList.contains('flipped'))){
                        endGame();
                    }

                } else {
                    allCards.forEach((card) => card.removeEventListener("click", playRound));
                    setTimeout(() => {
                        view.removeClasses(selection1, selection2);
                        resetSelections();
                        allCards.forEach((card) => card.addEventListener("click", playRound));
                    }, 800);
                }
                
            } else 
                selection1 = cardComponent.id;
                cardComponent.removeEventListener("click", playRound);
        }
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


export default Game;