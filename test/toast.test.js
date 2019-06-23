const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('toast', () => {
    it('存在', () => {
        expect(Toast).to.exist
    })
    describe('props', function () {
        it('接受autoClose', function (done) {
            this.timeout(5000)
            let div = document.createElement('div')
            document.body.appendChild(div)
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount(div)
            setTimeout(() => {
                expect(document.body.contains(toast.$el)).to.eq(false)
                done()
            }, 2000)
        })
        it('接受closeBtn', () => {
            const callback = sinon.fake()
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    closeBtn: {
                        text: '充值',
                        callback
                    }
                }
            }).$mount()
            let btn = toast.$el.querySelector('.close')
            expect(btn.textContent).to.eq('充值')
            btn.click()
            expect(callback).to.have.been.called
        })
        it('接受enableHtml', () => {
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    enableHtml: true
                }
            })
            toast.$slots.default = ['<p id="test">哈哈哈</p>'];
            toast.$mount()
            //可作为选择器则是html
            expect(toast.$el.querySelector('#test')).to.exist
        })
        it('接受showPosition', () => {
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    showPosition: 'middle'
                }
            }).$mount()
            expect(toast.$el.classList.contains('position-middle')).to.eq(true)
        })
        it('监听close回调', function () {
            this.timeout(5000)
            let div = document.createElement('div')
            document.body.appendChild(div)
            const callback = sinon.fake()
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount(div)
            toast.$on('close', callback)
            setTimeout(() => {
                expect(callback).to.have.been.called
            }, 2000)
        })
    })
})
