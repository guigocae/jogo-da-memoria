import Home from "./pages/home";
import './assets/css/index.css';

const container = document.querySelector("#content");

const fullscreenBtn = document.getElementById('fullscreen-btn');
const content = document.getElementById('content');

fullscreenBtn.addEventListener('click', () => {
    // Verifica se já está em tela cheia
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // Tenta o método padrão primeiro
        if (content.requestFullscreen) {
            content.requestFullscreen().catch(err => {
                console.error('Erro no requestFullscreen:', err);
                attemptIosFullscreen();
            });
        } 
        // Safari e outros navegadores WebKit
        else if (content.webkitRequestFullscreen) {
            content.webkitRequestFullscreen().catch(err => {
                console.error('Erro no webkitRequestFullscreen:', err);
                attemptIosFullscreen();
            });
        }
        // Internet Explorer
        else if (content.msRequestFullscreen) {
            content.msRequestFullscreen();
        }
        // Fallback para iOS
        else {
            attemptIosFullscreen();
        }
    } else {
        // Sair do modo tela cheia
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Soluções alternativas para iOS
function attemptIosFullscreen() {

    // 2. Verifica se é um PWA instalado na home screen
    if (window.navigator.standalone) {
        alert('Para tela cheia no iOS, adicione este site à sua home screen.');
        return;
    }
    
    // 3. Mostra instruções para o usuário
    alert('No iPhone, toque no ícone de compartilhar e selecione "Adicionar à Tela de Início" para uma experiência em tela cheia.');
}

Home(container);