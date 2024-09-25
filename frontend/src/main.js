import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa la configurazione del router

const app = createApp(App);

app.use(router); // Usa il router
app.mount('#app'); // Monta l'applicazione Vue
