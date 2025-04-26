class ScoreBoard {
    constructor() {
        this.score = 0;
    }

    setScore = (aditional = 0) => this.score += 10 + aditional;
    getScore() {
        return this.score;
    }
}

class Utils {
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array)
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

export { Timer, ScoreBoard, Utils };