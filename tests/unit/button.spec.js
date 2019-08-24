import chai, {expect} from 'chai'
import {mount} from "@vue/test-utils";
import Button from '@/button.vue'
import sinon from 'sinon'
import sinochai from 'sinon-chai'

chai.use(sinochai)
describe('Button', () => {
    it('存在', () => {
        expect(Button).to.exist
    })
    it('可以设置icon.', () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'settings'
            }
        })
        const useElement = wrapper.find('use')
        expect(useElement.attributes().href).to.equal('#i-settings')
    })
    it('可以设置类型.', () => {
        const wrapper = mount(Button, {
            propsData: {
                type: 'primary',
            }
        })
        const vm = wrapper.vm
        expect(vm.$el.classList.contains('primary')).to.equal(true)
    })
    xit('设置 iconPosition 可以改变 order', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                iconPosition: 'right'
            }
        }).$mount(div)
        const icon = vm.$el.querySelector('.icon-wrapper')
        expect(getComputedStyle(icon).order).to.eq('2')
        vm.$el.remove()
        vm.$destroy()
    })

    it('设置属性isLoading为true时icon变化', () => {
        const wrapper = mount(Button, {
            propsData: {
                isLoading: true,
                icon: 'settings'
            }
        })
        const icon = wrapper.find('use')
        expect(icon.attributes()['href']).to.eq('#i-loading')
    })
    it('点击 button 触发 click 事件', () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'settings',
            }
        })
        const vm = wrapper.vm
        const callback = sinon.fake();
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.been.called
    })
    it('测试当有isLoading属性时点击图标发生变化', () => {
        const wrapper = mount(Button, {
            propsData: {
                isLoading: false,
                icon: 'settings'
            }
        })
        const vm = wrapper.vm
        let obj = {
            change() {
                this.isLoading = true
            }
        }
        let fake = sinon.spy(obj, 'change')
        const icon = wrapper.find('use')
        vm.$on('click', fake)
        wrapper.trigger('click')
        expect(vm.isLoading).to.eq(true)
        expect(icon.attributes()['href']).to.eq('#i-loading')
        expect(fake).to.have.been.called

    })
})