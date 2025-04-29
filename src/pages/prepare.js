import Game from "./game";
import { Utils } from "../library";
import '../assets/css/prepare.css';

export default function prepare(parentElement) {
    const playerName = Utils.getCookie("nome");

    const textContainer = document.createElement('div');
    textContainer.id = "container-prepare";
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `Prepare-se, <span class='player-name'>${playerName}!</span>`;

    const loader = document.createElement('div');
    loader.classList.add('loader');

    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = '3';

    loader.appendChild(number);
    textContainer.appendChild(paragraph);
    textContainer.appendChild(loader);
    parentElement.appendChild(textContainer);

    Utils.animate('#container-prepare', 'fadeIn');

    const div = document.querySelector(".number");
    setTimeout(() => {
        div.innerText = Number(div.textContent) - 1;
        setTimeout(() => {
            div.innerText = Number(div.textContent) - 1;
        }, 1000);
    }, 1000);

    setTimeout(() => {
        textContainer.remove();
        Game(parentElement);
    }, 3000);
}