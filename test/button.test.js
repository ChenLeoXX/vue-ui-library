const expect = chai.expect;
import Vue from 'vue'
import Button from '../src/button'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.be.ok
  })
  it('可以设置icon.', () => {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'settings'
      }
    }).$mount()
    const useElement = vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
    vm.$destroy()
  })
  it('可以设置类型.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        type: 'primary',
      }
    }).$mount(div)
    const el = vm.$el
    expect(el.classList.contains('primary')).to.equal(true)
    vm.$el.remove()
    vm.$destroy()
  })

  it('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    }).$mount(div)
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
  })

  it('设置属性isLoading为true时icon变化',()=>{
    const Constructor  = Vue.extend(Button)
    const vm = new Constructor({
      propsData :{
        isLoading:true,
        icon:'settings'
      }
    }).$mount()
    const icon = vm.$el.querySelector('use')
    expect(icon.getAttribute('xlink:href')).to.eq('#i-loading')
    vm.$destroy()
  })

  it('点击 button 触发 click 事件', () => {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
      }
    }).$mount()

    const callback = sinon.fake();
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
  })

  it('测试当有isLoading属性时点击图标发生变化',()=>{
    const div = document.createElement('div')
    document.body.append(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData:{
        isLoading:false,
        icon:'settings'
      }
    }).$mount(div)

    let obj = {
      change(){
        this.isLoading = true
      }
    }
    let fake = sinon.spy(obj,'change')
    vm.$on('click',fake)
    vm.$el.click()
    const icon = vm.$el.querySelector('use')
    //如果涉及到界面变化需要使用nextTick 或者 计时器
    setTimeout(()=>{
      expect(vm.isLoading).to.eq(true)
      expect(icon.getAttribute('xlink:href')).to.eq('#i-loading')
      expect(fake).to.have.been.called
    },0)

  })
})