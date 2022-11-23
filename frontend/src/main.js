import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Library to export XLSX
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

// Library to export JSON
import VueBlobJsonCsv from "vue-blob-json-csv";
Vue.use(VueBlobJsonCsv);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
