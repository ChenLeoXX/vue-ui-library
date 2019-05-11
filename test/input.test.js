const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/v-input'

Vue.config.productionTip = false;
Vue.config.devtools = false;
describe('Input',function(){
  it('存在Input',function () {
    expect(Input).to.be.exist
  });
  describe('props', () =>{
    let Constructor = Vue.extend(Input);
    let vm;
    afterEach(()=>{
      vm.$destroy()
    });
    it('接受props',function () {
      vm = new Constructor({
        propsData:{
          value:'leo',
          size:'l',
          error:'错误',
          disabled:true,
          placeholder:'请输入'
        }
      }).$mount();
      let inputEl = vm.$el.querySelector('input');
      let tipEl = vm.$el.querySelector('use');
      let msg = vm.$el.querySelector('span');
      expect(tipEl.getAttribute('xlink:href')).to.be.eq('#i-error');
      expect(inputEl.placeholder).to.be.eq('请输入');
      expect(inputEl.disabled).to.be.true;
      expect(msg.innerText).to.eq('错误');
      expect(inputEl.classList.contains('l')).to.be.true;
      expect(inputEl.value).to.equal('leo')
    })
  });
  describe('事件', ()=> {
    let Constructor = Vue.extend(Input);
    let vm;
    afterEach(()=>{
      vm.$destroy()
    });
    it('blur,change事件触发',function () {
      ['blur','change','focus','input'].forEach((name)=>{
        vm = new Constructor({
          propsData: {
            value: 'Hello World'
          }
        }).$mount();
        let fake = sinon.fake();
        vm.$on(name, fake);
        console.log(name);
        //自定义事件
        let ev = new Event(name);
        Object.defineProperty(ev, 'target', {
          value: {
            value: 'Hello World'
          },
          enumerable: true
        });
        vm.$el.querySelector('input').dispatchEvent(ev);
        expect(fake).have.been.calledWith('Hello World')
      })
    })
  })
});