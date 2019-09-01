import {expect} from 'chai'
import {mount} from "@vue/test-utils";
import Col from '@/layouts/v-col'

describe('Col', function () {
    it('存在', function () {
        expect(Col).to.exist
    })
    it('span属性', function () {
        const wrapper = mount(Col, {
            propsData: {
                span: 1
            }
        })
        expect(wrapper.classes()).to.include('col-1')
    })
    it('offset属性', function () {
        const wrapper = mount(Col, {
            propsData: {
                offset: 1
            }
        })
        expect(wrapper.classes()).to.include('offset-1')
    })
    it('pc属性', function () {
        const wrapper = mount(Col, {
            propsData: {
                pc: {
                    offset: 1,
                    span: 2
                }
            }
        })
        expect(wrapper.classes()).to.include('col-pc-2')
        expect(wrapper.classes()).to.include('offset-pc-1')
    })
});
