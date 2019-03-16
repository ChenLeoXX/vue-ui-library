import Vue from 'vue'
import button from './button'
Vue.component('v-button',button);
new Vue({
    el:"#app",
    data :{
        iconName:'search'
    }
});