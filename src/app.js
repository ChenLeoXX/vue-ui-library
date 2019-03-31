import Vue from 'vue'
import button from './button'
import VIcon from './v-icon'
import buttonGroup from './buttton-group'
import Vinput from './v-input'
Vue.component('v-button', button);
Vue.component('v-icon', VIcon);
Vue.component('button-group', buttonGroup);
Vue.component('v-input', Vinput);
new Vue({
  el: "#app",
  data() {
    return {
      isLoading:false,
    }
  }
});