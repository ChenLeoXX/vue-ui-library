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
import vTab from './tabs'
import vTabItem from './tab-item'
import vTabBody from './tab-body'
import vTabPane from './tab-pane'
import vTabHead from './tab-head'
import vToast from './toast-plugin'
import vPopover from './popover'
import vCollapse from './collapse'
import vCollapseItem from './collapse-item'

Vue.component('v-collapse', vCollapse);
Vue.component('v-collapse-item', vCollapseItem);
Vue.component('v-popover', vPopover);
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
Vue.component('v-tab', vTab);
Vue.component('v-tab-item', vTabItem);
Vue.component('v-tab-body', vTabBody);
Vue.component('v-tab-pane', vTabPane);
Vue.component('v-tab-head', vTabHead);
Vue.use(vToast);
new Vue({
  el: "#app",
  data() {
    return {
      isLoading:false,
        msg: 'Hello World',
        selectName: 'social'
    }
  },
    create() {
        // this.test()
    },
  methods: {
      test(pos) {
          this.$toast('少年,你渴望力量吗?少年,你渴望力量吗?少年,你渴望力量吗?少年,  你渴望力量吗?少年,你渴望力量吗?少年,你渴望力量吗?少年,你渴望力量吗?少年,你渴望力量吗?', {
            closeBtn: {
                text: '充值',
                callback(toast) {
                    //  toast instance
                    console.log(toast)
                    console.log('充值成功!')
                },
            },
              showPosition: pos,
              enableHtml: false
        })
    }
  }
});