import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueSession from 'vue-session'
import ElementUI, { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://localhost:8096/'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false
Vue.use(ElementUI).use(Select).use(Button).use(VueSession)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
