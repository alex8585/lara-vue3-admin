import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Quasar, Dialog } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "virtual:windi.css";
const app = createApp(App);
app.use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
});
app.use(createPinia());
app.use(router);

app.mount("#app");
