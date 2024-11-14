// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Importer le store Vuex
import router from './router'; // Importer le router Vue
import './assets/styles.css';  // Importation du fichier CSS global

const app = createApp(App);

app.use(store);  // Utiliser Vuex
app.use(router);  // Utiliser Vue Router
app.mount('#app');
