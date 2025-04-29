import { Utils } from "../library";
import Home from "./home";
import '../assets/css/ranking.css';

class RankingView {
    constructor(parentElement, items) {
        this.parentElement = parentElement;
        this.items = items;
    }

    createView() {
        const containerRanking = document.createElement('div');
        containerRanking.id = 'container-ranking';
    
        const title = document.createElement('h3');
        title.textContent = 'Ranking';
    
        const rankingList = document.createElement('ul');
        rankingList.id = 'ranking-list';
        const fragment = document.createDocumentFragment();

        this.items.forEach((item, index) => {
            if(index >= 10) {
                localStorage.removeItem(item.key);
            } else {
                const listItem = document.createElement('li');
                const keyElement = document.createElement('div');
                keyElement.textContent = Utils.getCookie('nome') === item.key ? `${index+1}. ${item.key} (Você)` : `${index+1}. ${item.key}`;
    
                const valueElement = document.createElement('div');
                valueElement.textContent = item.value;
    
                const bar = document.createElement('div');
                bar.id = 'bar-element';
    
                listItem.appendChild(keyElement);
                listItem.appendChild(bar);
                listItem.appendChild(valueElement);
                fragment.appendChild(listItem);
            }
        });

        const button = document.createElement('button');
        button.textContent = 'Voltar';
        button.id = 'voltar-button';

        rankingList.appendChild(fragment);
        containerRanking.appendChild(title);
        containerRanking.appendChild(rankingList);
        containerRanking.appendChild(button);
        this.parentElement.appendChild(containerRanking);
    }

    deleteView() {
        document.querySelector("#container-ranking").remove();
    }

}

export default function ranking(parentElement) {
    const keyItems = Utils.getRankingItems();

    keyItems.sort((a, b) => Number(b.value) - Number(a.value));
    
    // console.log(keyItems);
    const view = new RankingView(parentElement, keyItems);
    view.createView();
    Utils.animate('#container-ranking', 'fadeIn');

    document.querySelector("#voltar-button").addEventListener("click", () => {
        view.deleteView();
        Home(parentElement);
    });
}