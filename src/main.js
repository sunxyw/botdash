import * as Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import SimpleLayout from "./layouts/SimpleLayout.vue";
import router from "./router";
// import './plugins/click-away'
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from "pinia";
import $dayjs from "./plugins/dayjs";

import "./scss/app.scss";

window.$vueApp = Vue.createApp(App);

window.$vueApp.use(Antd);
window.$vueApp.use(router);
window.$vueApp.use(VueAxios, axios);
window.$vueApp.provide("axios", window.$vueApp.config.globalProperties.axios);
window.$vueApp.use(createPinia());
window.$vueApp.config.globalProperties.$dayjs = $dayjs;

// Adding template layouts to the vue components.
window.$vueApp.component("layout-dashboard", DashboardLayout);
window.$vueApp.component("layout-simple", SimpleLayout);

window.$vueApp.mount("#app");
window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) =>
  path + (path.endsWith("/") ? "" : "/") + pathToAppend;
