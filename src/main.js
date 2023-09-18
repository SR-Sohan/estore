import './assets/css/bootstrap.min.css'
import './assets/css/main.css'
import './assets/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import  Store  from './store/Store.js'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router)
app.use(Toast);
app.use(Store);
app.mount('#app')
