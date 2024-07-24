import { createApp } from "vue";
import "./style/general.scss";
import App from "./App.vue";
import { router } from "./router";
import VueBraintree from "vue-braintree";

createApp(App).use(VueBraintree).use(router).mount("#app");
