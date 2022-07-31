import * as Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import router from "./router";
// import './plugins/click-away'

import "./scss/app.scss";

window.$vueApp = Vue.createApp(App);

window.$vueApp.use(Antd);
window.$vueApp.use(router);

// Adding template layouts to the vue components.
window.$vueApp.component("layout-dashboard", DashboardLayout);

window.$vueApp.mount("#app");
window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) =>
  path + (path.endsWith("/") ? "" : "/") + pathToAppend;
