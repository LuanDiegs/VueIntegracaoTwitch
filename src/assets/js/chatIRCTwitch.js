import SimpleBar from "simplebar";
import { getLocalStorage, setLocalStorage } from "./localStorageChat";

export function pegarStringEntre2Caracteres(inicio, fim, texto, quantidadeCaracteresPular){
    return texto.substring(
        texto.indexOf(inicio) + quantidadeCaracteresPular, 
        texto.lastIndexOf(fim)
    );
}

export function salvaNomeCanal(){
    const inputNomeCanal = document.getElementById("canal").value;

    if(inputNomeCanal){
        setLocalStorage("canal", inputNomeCanal.toLowerCase(), 60);
    }
}

export function logaNaTwitch(){
    const oAuth = pegarStringEntre2Caracteres("token=", "&scope", document.location.hash, 6);
    const nomeCanal = getLocalStorage("canal");

    if(oAuth && nomeCanal){
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        const canalCerto = nomeCanal;
        let mensagens = 0

        socket.addEventListener('open', (e) => {
            socket.send(`PASS oauth:${oAuth}`);
            socket.send(`NICK ${canalCerto}`);
            socket.send(`JOIN #${canalCerto}`);
        })

        socket.addEventListener('message', (event) => {
            const nomeUsuario = pegarStringEntre2Caracteres("@", ".tmi.twitch.tv", event.data, 1);
            const msgChat = event.data.split(`PRIVMSG #${canalCerto} :`)[1];
            const textoChat = document.getElementById("chat");

            if(msgChat){    
                const corRandom = "#"+((1<<24)*Math.random()|0).toString(16); 
                const simpleBarComponente = new SimpleBar(document.getElementById("chat"));
                const componenteMensagem = `<p class="mensagemCompleta"> ` + 
                    `<span class='usuario' style='color: ${corRandom}'>${nomeUsuario}</span>: `+ 
                    `<span class='mensagemChat'>${msgChat}</span></p>`;

                simpleBarComponente.getContentElement().insertAdjacentHTML('beforeend', componenteMensagem);
                simpleBarComponente.getScrollElement().scrollTop = 1000;
                mensagens++;
            }

            // Caso tiver mais de 20 mensagens, limpa as mensagens para não sobrecarregar o site
            if(mensagens > 20){
                setTimeout(() => {
                    textoChat.innerHTML = ""; 
                }, 2000);
                mensagens = 0;
            }
        });
    }
}
