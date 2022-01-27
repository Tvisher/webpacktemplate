import Vue from 'vue';
import './js/common';
import './scss/main.scss';

window.Vue = require('vue');
import store from './store/index';

Vue.component('example-component', require('./components/Example.vue').default);


const app = new Vue({
    data() {
        return {
            component: false
        }
    },
    store,
    el: '#app'
})