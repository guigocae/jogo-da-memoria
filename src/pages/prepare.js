import Game from "./game";
import { Utils } from "../library";

export default function prepare(parentElement) {
    const playerName = Utils.getCookie("nome");

    const textContainer = document.createElement('div');
    textContainer.id = "container-prepare";
    const paragraph = document.createElement('p');
    paragraph.textContent = `Prepare-se, ${playerName}!`;

    textContainer.appendChild(paragraph);
    parentElement.appendChild(textContainer);

    setTimeout(() => {
        textContainer.remove();
        Game(parentElement);
    }, 2500);
}