import Vue from 'vue'
import button from './basic/button'
import VIcon from './basic/v-icon'
import buttonGroup from './basic/button-group'
import VInput from './basic/v-input'
import vCol from './layouts/v-col'
import content from './layouts/content'
import sider from './layouts/sider'
import head from './layouts/header'
import foot from './layouts/footer'
import vRow from './layouts/v-row'
import vTab from './tab/tabs'
import vTabItem from './tab/tab-item'
import vTabBody from './tab/tab-body'
import vTabPane from './tab/tab-pane'
import vTabHead from './tab/tab-head'
import vToast from './toast/toast-plugin'
import vPopover from './popover/popover'
import vCollapse from './collapse/collapse'
import vCollapseItem from './collapse/collapse-item'

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
        selectName: 'social',
        selected: ['1', '2', '3'],
        selected2: ['1', '2', '3']
    }
  },
    create() {
        // this.tests()
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