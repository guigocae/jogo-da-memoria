import { Utils } from "./library";

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
    
        const imageCache = new Map();
        const uniqueImageKeys = [...new Set(cards.map(card => String(card)[0]))];
    
        await Promise.all(uniqueImageKeys.map(async (key) => {
            try {
                const image = await Utils.importImage(key);
                imageCache.set(key, image);
            } catch (error) {
                console.error(`Erro ao carregar imagem ${key}:`, error);
                imageCache.set(key, null);
            }
        }));
    
        // 4. Criar elementos DOM
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
}

export default GameView;