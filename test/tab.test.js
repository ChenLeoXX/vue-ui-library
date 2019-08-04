const expect = chai.expect;
import Vue from 'vue'
import vTab from '../src/tabs'
import vTabItem from '../src/tab-item'
import vTabBody from '../src/tab-body'
import vTabPane from '../src/tab-pane'
import vTabHead from '../src/tab-head'

Vue.component('v-tab', vTab);
Vue.component('v-tab-item', vTabItem);
Vue.component('v-tab-body', vTabBody);
Vue.component('v-tab-pane', vTabPane);
Vue.component('v-tab-head', vTabHead);
Vue.config.productionTip = false
Vue.config.devtools = false
describe('tab', () => {
    it('存在', () => {
        expect(vTab).to.be.ok
    })
    it('select', (done) => {
        let div = document.createElement('div')
        div.innerHTML = ` <v-tab selected="social">
            <v-tab-head>
            <v-tab-item name="social">社会</v-tab-item>
            <v-tab-item name="cultural">人文</v-tab-item>
            <v-tab-item name="history">历史</v-tab-item>
            <v-tab-item name="technology">科技</v-tab-item></v-tab-head>
            <v-tab-body>
            <v-tab-pane name="social">社会</v-tab-pane>
            <v-tab-pane name="cultural">人文</v-tab-pane>
            <v-tab-pane name="history">历史</v-tab-pane>
            <v-tab-pane name="technology">科技</v-tab-pane>
            </v-tab-body>
            </v-tab>
        `
        let vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            let target = vm.$el.querySelector(".tab-item[data-name='social']")
            expect(target.classList.contains('active')).to.be.true
            done()
        })
    })

})