import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store/storeIndex';
import VueRouter from 'vue-router';
import 'animate.css'

let $axios = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const router = new VueRouter({})

Vue.prototype.$axios = $axios
Vue.config.productionTip = true;

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
