import prepare from './prepare';
import { Utils } from '../library';
import '../assets/css/home.css';

class HomeView {
    constructor(parentElement){
        this.parentElement = parentElement;
    }

    createHome() {
        const container = document.createElement('div');
        container.id = 'container-home';
        
        const title = document.createElement('h2');
        title.innerText = 'Bem Vindo!';
    
        const containerInput = document.createElement('div');
        containerInput.id = 'container-input';
    
        const input = document.createElement('input');
        input.placeholder = 'Digite seu nome';
        input.id = 'text-value';
        input.autocomplete = 'off';
    
        const button = document.createElement('button');
        button.textContent = 'Jogar';
        button.id = 'start-button';
    
        containerInput.appendChild(input);
        containerInput.appendChild(button);
        container.appendChild(title);
        container.appendChild(containerInput);
        this.parentElement.appendChild(container);
    }

    deleteHome() {
        document.querySelector("#container-home").remove();
    }

}

export default function Home(parentElement) {
    Utils.deleteCookie("nome");
    
    const view = new HomeView(parentElement);
    view.createHome();

    Utils.animate('#container-home', 'fadeIn');
    Utils.animate('h2', 'backInDown');

    document.querySelector("#start-button").addEventListener("click", () => {
        const inputValue = document.querySelector("#text-value").value;

        Utils.setCookie("nome", inputValue, 1);
        Utils.animate('#container-home', 'fadeOut');
        setTimeout(() => {
            view.deleteHome();
            prepare(parentElement);
        }, 800);
    });
}