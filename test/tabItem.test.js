const expect = chai.expect;
import Vue from 'vue'
import tabItem from '../src/tab-item'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('tabItem', () => {
    it('存在', () => {
        expect(tabItem).to.be.ok
    })
    it('接受name', () => {
        let Constructor = Vue.extend(tabItem)
        let vm = new Constructor({
            propsData: {
                name: 'go'
            }
        }).$mount()
        expect(vm.$el.getAttribute('data-name')).to.eq('go')
    })
    it('接受disable', () => {
        let Constructor = Vue.extend(tabItem)
        let vm = new Constructor({
            propsData: {
                disabled: true
            }
        }).$mount()
        expect(vm.$el.classList.contains('disable')).to.be.true
        const cb = sinon.fake()
        vm.$on('click', cb)
        vm.$el.click()
        expect(cb).to.have.not.been.called
    })
})