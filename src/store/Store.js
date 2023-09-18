import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loadingStatus: false,
      token: localStorage.getItem('token') || null,
      user: null
    }
  },
  mutations: {
    SET_LOADING_STATUS(state, isLoading) {
      state.loadingStatus = isLoading;
    },
    SET_TOKEN(state,{token,user}){
      state.token = token,
      state.user = user
    },
    AUTH_SUCCESS(state, { token, user }) {
      state.token   = token
      state.user    = user
    }
    
  },
  actions: {

    authenticate({ commit }, { token, user }) {
      commit('AUTH_SUCCESS', { token, user });
    },
    singOut({ commit }, { token,user }){
      commit('SET_TOKEN', { token,user });
    }
  
  },
  getters: {
    isLoading(state){
      return state.loadingStatus;
    },
    getToken(state){
      return state.token;
    },
    getUser(state){
      return state.user
    }
  }
})

export default store;