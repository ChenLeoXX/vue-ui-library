import Vue from 'vue'
import button from './button'
import VIcon from './v-icon'
import buttonGroup from './buttton-group'
import chai from 'chai'
import spy from 'chai-spies'

Vue.component('v-button', button);
Vue.component('v-icon', VIcon);
Vue.component('button-group', buttonGroup);
chai.use(spy)
const expect = chai.expect;
new Vue({
  el: "#app",
  data() {
    return {
      isLoading:false,
    }
  }
});