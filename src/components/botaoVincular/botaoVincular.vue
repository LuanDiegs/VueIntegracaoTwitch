<script setup>

defineProps({
  id: String,
  texto: String,
  funcao: {
    type: Function,
    default(){
      console.log("Funcionalidade não implementada");
      return;
    }
  }
})


</script>

<template>
  <button class="button" :id="id" @click="funcao">{{texto}}</button>
</template>

<style scoped>

#vincularCanal{
  width: 100%;
  height: 2em;
  margin-top: 1%;
  margin-bottom: 1%;
  color: white;
  border: 1px solid #5935FC ;
  border-radius: 5px;
  background-color: #5935FC;
}

#vincularCanal:hover{
  background-color: #594EAD;
  transition: 0.5s;
  cursor: pointer;
}
</style>
