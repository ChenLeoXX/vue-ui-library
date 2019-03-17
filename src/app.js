import Vue from 'vue'
import button from './button'
import VIcon from './v-icon'
import buttonGroup from './buttton-group'
import chai  from 'chai'
import spy  from 'chai-spies'
Vue.component('v-button',button);
Vue.component('v-icon',VIcon);
Vue.component('button-group',buttonGroup);
chai.use(spy)
const expect = chai.expect;
new Vue({
    el:"#app",
    data(){
        return {

        }
    }
});
//button 测试用例
{
    const Constructor = Vue.extend(button);
    const testEl = document.createElement('div')
    testEl.classList.add('test')
    document.body.append(testEl)
    const btVm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    });
    btVm.$mount('.test');
    let use = btVm.$el.querySelector('use');
    let icon = use.getAttribute('xlink:href');
    expect(icon).to.equal('#i-settings')
    btVm.$el.remove()
    btVm.$destroy()
}

{
    const Constructor = Vue.extend(button);
    const testEl = document.createElement('div')
    testEl.classList.add('test')
    document.body.append(testEl)
    const btVm = new Constructor({
        propsData: {
            type: 'primary'
        }
    });
    btVm.$mount('.test')
    var { backgroundColor} = getComputedStyle(btVm.$el)
    expect(backgroundColor).to.equal('rgb(45, 140, 240)')
    btVm.$el.remove()
    btVm.$destroy()
}

{
    const Constructor = Vue.extend(button);
    const testEl = document.createElement('div')
    testEl.classList.add('test')
    document.body.append(testEl)
    const btVm = new Constructor({
        propsData: {
            isLoading: true
        }
    });
    btVm.$mount('.test')
    let use = btVm.$el.querySelector('use');
    let icon = use.getAttribute('xlink:href');
    expect(icon).to.equal('#i-loading')
    btVm.$el.remove()
    btVm.$destroy()
}
{
    const Constructor = Vue.extend(button);
    const testEl = document.createElement('div')
    testEl.classList.add('test')
    document.body.append(testEl)
    const btVm = new Constructor({
        propsData: {
            icon:'settings',
            isLoading:false,
        }
    });
    const spy = chai.spy(function(){
        this.isLoading = true
    })
    btVm.$mount('.test')
    btVm.$on('click',spy)
    btVm.$el.click()
    expect(spy).to.have.been.called()
    expect(btVm.isLoading).to.equal(true)
    btVm.$el.remove()
    btVm.$destroy()
}