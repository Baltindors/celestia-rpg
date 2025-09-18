// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router"; // Make sure to import and use the router

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // Use the router
app.mount("#app");
