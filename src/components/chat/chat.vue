<script setup>
import botaoVincular from '../botaoVincular/botaoVincular.vue';
import { criaUrlTokenTwitch } from '@/assets/js/criaUrlTokenTwitch';
import { logaNaTwitch, salvaNomeCanal } from '@/assets/js/chatIRCTwitch';
import { getLocalStorage } from '@/assets/js/localStorageChat';
import { onMounted, ref } from 'vue';
import SimpleBar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import { ConstantesPadrao } from '@/assets/js/constantes';
import VueSweetalert2 from 'vue-sweetalert2';
import { notificacaoToast } from '@/assets/js/notificacaoToast';

let chatTitulo = ref(null);
let canalInput = ref(null);
let simpleBarChat = ref(null);

defineProps({
})

onMounted(() => {
  var localStorageChat = getLocalStorage(ConstantesPadrao.localStorageSalvamentoCanal);
  if(localStorageChat){
    logaNaTwitch(simpleBarChat.value.SimpleBar.el, chatTitulo, canalInput.value);
    setCanal();
    notificacaoToast(`Vinculado com sucesso em ${localStorageChat }!`, "success");
  }else{
    chatTitulo = "Integração com a Twitch em Vue!";
  }
})

function setCanal(){
  var nomeCanal = getLocalStorage(ConstantesPadrao.localStorageSalvamentoCanal);

  chatTitulo = "Canal: " + nomeCanal;
  canalInput.value.value = nomeCanal;
}

function vinculaCanalTwitch() {
  salvaNomeCanal(canalInput.value.value);
  criaUrlTokenTwitch(canalInput.value.value);
}
</script>

<template>
  <div class="chat-container">
    <label>Insira o nome do seu canal</label>
    <input ref="canalInput" id="canal" style="width: 100%;"/><br>
    <botaoVincular 
      id="vincularCanal"
      texto="Conectar com a twitch"
      :funcao=vinculaCanalTwitch
    />

    <h2 ref="chatTitulo" id="chatTitulo">{{ chatTitulo ?? null }}</h2>

    <SimpleBar class="chat" ref="simpleBarChat" id="chat">
      <p class="mensagemCompleta">
          <span class="usuario">luan</span>:
          <span class="mensagemChat"> oie</span>
      </p>
    </SimpleBar>
  </div>
</template>

<style scoped>
.chat-container{
  overflow: hidden;
}
</style>
