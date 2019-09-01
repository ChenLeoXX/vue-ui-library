import chai, {expect} from 'chai'
import {mount} from "@vue/test-utils";
import sinon from 'sinon'
import sinochai from 'sinon-chai'
import Input from '@/basic/v-input'

chai.use(sinochai)
describe('Input',function(){
  it('存在Input',function () {
    expect(Input).to.be.exist
  });
  describe('props', () =>{
    it('接受props',function () {
      const wrapper = mount(Input, {
        propsData:{
          value:'leo',
          size:'l',
          error:'错误',
          disabled:true,
          placeholder:'请输入'
        }
      })
      let inputEl = wrapper.find('input')
      let tipEl = wrapper.find('use')
      let msg = wrapper.find('span')
      expect(tipEl.attributes()['href']).to.be.eq('#i-error')
      expect(inputEl.element.placeholder).to.be.eq('请输入');
      expect(inputEl.element.disabled).to.be.true;
      expect(msg.element.innerHTML).to.eq('错误');
      expect(inputEl.classes()).to.include('l');
      expect(inputEl.element.value).to.equal('leo')
    })
  });
  describe('事件', ()=> {
    it('blur,change事件触发',function () {
      ['blur','change','focus','input'].forEach((name)=>{
        const wrapper = mount(Input, {
          propsData: {
            value: 'Hello World'
          }
        })
        const vm = wrapper.vm
        let fake = sinon.fake();
        vm.$on(name, fake);
        wrapper.find('input').trigger(name)
        expect(fake).have.been.calledWith('Hello World')
      })
    })
  })
});