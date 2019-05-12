const expect = chai.expect;
import Vue from 'vue'
import Col from '../src/v-col'

describe('Col', function () {
    it('存在', function () {
        expect(Col).to.exist
    })
    it('span属性', function () {
        let div = document.createElement('div')
        document.body.appendChild(div)
        let colConstructor = Vue.extend(Col)
        const vm = new colConstructor({
            propsData: {
                span: 1
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-1')).to.eq(true)
        div.remove()
        vm.$destroy()
    })
    it('offset属性', function () {
        let div = document.createElement('div')
        document.body.appendChild(div)
        let colConstructor = Vue.extend(Col)
        const vm = new colConstructor({
            propsData: {
                offset: 1
            }
        }).$mount(div);
        console.log(vm.$el.classList);
        expect(vm.$el.classList.contains('offset-1')).to.eq(true)
        div.remove()
        vm.$destroy()
    })
    it('pc属性', function () {
        let div = document.createElement('div')
        document.body.appendChild(div)
        let colConstructor = Vue.extend(Col)
        const vm = new colConstructor({
            propsData: {
                pc: {
                    offset: 1,
                    span: 2
                }
            }
        }).$mount(div);
        console.log(vm.$el);
        expect(vm.$el.classList.contains('col-pc-2')).to.eq(true)
        expect(vm.$el.classList.contains('offset-pc-1')).to.eq(true)
        div.remove()
        vm.$destroy()
    })
});
