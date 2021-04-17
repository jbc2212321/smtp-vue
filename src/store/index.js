import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    identity:-1,
  },
  mutations: {
    Login: function (state) {
      state.isLogin = true
    },
  },
  actions: {
  },
  modules: {
  }
})
