import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store/storeIndex'
import 'animate.css'

let $axios = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

Vue.prototype.$axios = $axios
Vue.config.productionTip = true;

new Vue({
    render: h => h(App),
    store
}).$mount('#app');
