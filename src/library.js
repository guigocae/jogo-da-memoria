class Utils {
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        // console.log(array)
    }

    static async importImage(imageName) {
        try {
            const image = await import(`./assets/img/${imageName}.jpeg`);
            return image.default;
        } catch(error) {
            console.error("Erro ao importar imagem:", error);
            return null;
        }
    }

    static setCookie(name, value, exdays) {
        const date = new Date();
        date.setTime(date.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      }

    static deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    static getRankingItems() {
        const keyItems = [];
        // Obter todos os itens do LocalStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
    
            if(key) {
                keyItems.push({ key, value });
            } else break;
        }
        return keyItems;
    }
}

class Timer {

    constructor(minutes, seconds, onUpdate = function(_min, _sec){return}, onEnd) {
        if(seconds > 59)
            throw new Error("Seconds must be less than 60");
        this.seconds = seconds;
        this.minutes = minutes;
        this.onUpdate = onUpdate;
        this.onEnd = onEnd;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.onUpdate(this.minutes, this.seconds);

            if(this.seconds == 0){
                if(this.minutes > 0){
                    this.minutes--;
                    this.seconds = 59;
                }
                else {
                    clearInterval(this.timer);
                    this.onEnd();
                }
                return;
            }
            this.seconds--;
        }, 1000);
    }

    stopTimer() {
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(this.timer);
    }

    getSeconds() {
        if(this.minutes >= 1)
            return this.seconds + this.minutes*60;
        else return this.seconds;
    }
}

class ScoreBoard {
    constructor() {
        this.score = 0;
    }

    setScore = (aditional = 0) => this.score += 10 + aditional;
    getScore() {
        return this.score;
    }
}

export { Timer, ScoreBoard, Utils };