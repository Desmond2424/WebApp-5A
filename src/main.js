import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueSidebarMenu)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
