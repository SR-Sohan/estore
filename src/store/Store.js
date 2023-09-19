import { createStore } from 'vuex'
import { isTokenDecode } from "@/helper/jwtDecode.js";
// Create a new store instance.
const store = createStore({
  state () {
    return {
      loadingStatus: false,
      token: localStorage.getItem('token') || null,
      user: null,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    }
  },
  created() {
    const user = isTokenDecode(localStorage.getItem('token'));
    const token = localStorage.getItem('token');

    if (user && token) {     
      this.$store.commit('settoken', {token: token,user: user});
    }
  },
  mutations: {
    SET_LOADING_STATUS(state, isLoading) {
      state.loadingStatus = isLoading;
    },
    SET_TOKEN(state, { token, user }) {
      state.token = token,
      state.user = user
      localStorage.setItem("token", token)
    },
    singOut(state,token){
      state.token   = ""
      state.user    = ""
      localStorage.removeItem("token")
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incremnet(state, { id, qty }) {
      const existingProduct = state.cart.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decremnet(state, { id, qty }) {
      const existingProduct = state.cart.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem(state, id) {
      state.cart = state.cart.filter((item) => item.id !== id);
      // Update localStorage with the modified cart data
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    
  },
  actions: {

    settoken({ commit }, { token, user }) {
      commit("SET_TOKEN", { token: token, user : user});
    },
    singOut({ commit },token){
      commit('singOut',token)
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    incremnet({ commit }, { id, qty }) {
      commit("incremnet", { id, qty });
    },
    decremnet({ commit }, { id, qty }) {
      commit("decremnet", { id, qty });
    },
    removeItem({ commit }, id) {
      commit("removeItem", id);
    },
    clearToken({ commit }, token) {
      commit("clearToken", token);
    },
  
  },
  getters: {
    isLoading(state){
      return state.loadingStatus;
    },
    getToken(state){
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
    cartItemCount(state) {
      return state.cart.length;
    },
    getCartitem(state) {
      return state.cart;
    },
  }
})

export default store;