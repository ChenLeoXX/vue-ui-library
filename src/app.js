import Vue from 'vue'
import button from './button'
import VIcon from './v-icon'
import buttonGroup from './buttton-group'
import VInput from './v-input'
import vCol from './v-col'
import content from './content'
import sider from './sider'
import head from './header'
import vLay from './v-lay'
import foot from './footer'
import vRow from './v-row'
Vue.component('v-button', button);
Vue.component('v-icon', VIcon);
Vue.component('button-group', buttonGroup);
Vue.component('v-input', VInput);
Vue.component('v-col', vCol);
Vue.component('v-row', vRow);
Vue.component('v-head', head);
Vue.component('v-foot', foot);
Vue.component('v-side', sider);
Vue.component('v-layout', vLay);
Vue.component('v-content', content);
new Vue({
  el: "#app",
  data() {
    return {
      isLoading:false,
      msg: 'Hello World'
    }
  },
  methods: {
    test(e, val) {
      console.log(e, val);
    }
  }
});