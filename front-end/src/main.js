import Vue from 'vue'
import App from './App.vue'
//Importer le router pour viex
import router from './router'
//Importer le store pour vuex
import store from './store'
//Importer bootstrapVue
import { BootstrapVue } from 'bootstrap-vue'
import './app.scss'
//Importer fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(BootstrapVue)

//Importer vue-ressource
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
