import SimpleBar from "simplebar";
import { getLocalStorage, setLocalStorage, verificaLocalStorage } from "./localStorageChat";
import { ConstantesPadrao } from "./constantes";
import { notificacaoToast } from "./notificacaoToast";

export function pegarStringEntre2Caracteres(inicio, fim, texto, quantidadeCaracteresPular){
    return texto.substring(
        texto.indexOf(inicio) + quantidadeCaracteresPular, 
        texto.lastIndexOf(fim)
    );
}

export function salvaNomeCanal(nomeDoCanal){
    if(nomeDoCanal){
        setLocalStorage(ConstantesPadrao.localStorageSalvamentoCanal, nomeDoCanal.toLowerCase(), 60);
    }
}

export function logaNaTwitch(componenteSimpleBarChat, componenteTitulo, componenteInputCanal){
    const oAuth = pegarStringEntre2Caracteres("token=", "&scope", document.location.hash, 6);
    const nomeCanal = getLocalStorage(ConstantesPadrao.localStorageSalvamentoCanal);

    if(oAuth && nomeCanal){
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        const canalCerto = nomeCanal;
        let mensagens = 0;
        let vinculado;

        socket.addEventListener('open', (e) => {
            socket.send(`PASS oauth:${oAuth}`);
            socket.send(`NICK ${canalCerto}`);
            socket.send(`JOIN #${canalCerto}`);
        })

        socket.addEventListener('message', (event) => {
            if(!verificaLocalStorage(ConstantesPadrao.localStorageSalvamentoCanal))
            {
                notificacaoToast("Opa, parece que o tempo acabou! Vincule com o canal novamente!", "error");
                vinculado = false;
            } else {
                const nomeUsuario = pegarStringEntre2Caracteres("@", ".tmi.twitch.tv", event.data, 1);
                const msgChat = event.data.split(`PRIVMSG #${canalCerto} :`)[1];
                const textoChat = componenteSimpleBarChat;

                vinculado = true;

                if(msgChat){    
                    const corRandom = "#"+((1<<24)*Math.random()|0).toString(16); 
                    const simpleBarComponente = new SimpleBar(componenteSimpleBarChat);
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
            }

            if(!vinculado){
                socket.close();
                
                componenteTitulo.value.innerHTML = "Integração na Twitch com Vue!";
                componenteInputCanal.value = "";
            }
        });
    }
}
