<script setup>
import botaoVincular from '../botaoVincular/botaoVincular.vue';
import { criaUrlTokenTwitch } from '@/assets/js/criaUrlTokenTwitch';
import { logaNaTwitch, salvaNomeCanal } from '@/assets/js/chatIRCTwitch';
import { getLocalStorage } from '@/assets/js/localStorageChat';
import { onMounted, ref } from 'vue';
import SimpleBar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

let chatTitulo = ref(null);
let canalInput = ref(null);
let simpleBarChat = ref(null);

defineProps({
})

onMounted(() => {
  if(getLocalStorage("canal")){
    logaNaTwitch();
    setCanal();
  }
})

function setCanal(){
  chatTitulo = "Canal: " + getLocalStorage("canal");
  canalInput.value.value = getLocalStorage("canal");
}

function vinculaCanalTwitch() {
  salvaNomeCanal();
  criaUrlTokenTwitch();
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
