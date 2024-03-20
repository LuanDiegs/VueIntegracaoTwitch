import './assets/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'

const app = createApp(App)

app.use(VueSweetalert2);

// Definir constantes globais
window.Swal =  app.config.globalProperties.$swal;

app.mount('#app')
