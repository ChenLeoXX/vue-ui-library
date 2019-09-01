import chai, {expect} from 'chai'
import {mount} from "@vue/test-utils";
import sinon from 'sinon'
import sinochai from 'sinon-chai'
import Toast from '@/toast/toast'

chai.use(sinochai)

describe('toast', () => {
    it('存在', () => {
        expect(Toast).to.exist
    })
    describe('props', function () {
        it('接受autoClose', function (done) {
            this.timeout(5000)
            const wrapper = mount(Toast, {
                propsData: {
                    autoClose: 1
                }
            })
            const vm = wrapper.vm
            setTimeout(() => {
                expect(document.body.contains(vm.$el)).to.eq(false)
                done()
            }, 1000)
        })
        it('接受closeBtn', () => {
            const callback = sinon.fake()
            const wrapper = mount(Toast, {
                propsData: {
                    closeBtn: {
                        text: '充值',
                        callback
                    }
                }
            })
            let btn = wrapper.find('.close')
            expect(btn.element.textContent).to.eq('充值')
            btn.trigger('click')
            expect(callback).to.have.been.called
        })
        xit('接受enableHtml', () => {
            const wrapper = mount(Toast, {
                slots: {
                    default: `<p id="tests">哈哈哈</p>`
                },
                propsData: {
                    enableHtml: true
                }
            })
            expect(wrapper.find('#tests')).to.exist
        })
        it('接受showPosition', () => {
            const wrapper = mount(Toast, {
                propsData: {
                    showPosition: 'middle'
                }
            })
            expect(wrapper.classes()).to.include('position-middle')
        })
        it('监听close回调', function () {
            const callback = sinon.fake()
            const wrapper = mount(Toast, {
                propsData: {
                    autoClose: 1
                }
            })
            const vm = wrapper.vm
            vm.$on('close', callback)
            setTimeout(() => {
                expect(callback).to.have.been.called
            }, 2000)
        })
    })
})
