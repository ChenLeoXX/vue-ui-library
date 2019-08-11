const expect = chai.expect;
import Vue from 'vue'
import popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('popover', () => {
    it('存在.', () => {
        expect(popover).to.be.ok
    })
})