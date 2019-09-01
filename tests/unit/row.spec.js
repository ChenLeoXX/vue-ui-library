import {expect} from 'chai'
import {mount} from "@vue/test-utils";
import Col from '@/layouts/v-col'
import Row from '@/layouts/v-row'

describe('Row', function () {
    it('存在', function () {
        expect(Row).to.be.exist;
    });
    xit('gutter属性', function (done) {
        Vue.component('v-row', Row);
        Vue.component('v-col', Col);
        let div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = `
            <v-row gutter="20">
             <v-col></v-col>
            </v-row>
        `;
        const vm = new Vue({
            el: div
        });
        //任务队列
        setTimeout(() => {
            let row = vm.$el.querySelector('.row');
            expect(getComputedStyle(row).marginRight).to.eq('-10px');
            let col = row.querySelector('.col');
            expect(getComputedStyle(col).paddingLeft).to.eq('10px');
            div.remove();
            vm.$destroy();
            done()
        })
    });
    xit('align属性', function () {
        let div = document.createElement('div');
        document.body.appendChild(div);
        let rowConstructor = Vue.extend(Row)
        let vm = new rowConstructor({
            propsData: {
                align: 'left'
            }
        }).$mount(div);
        expect(getComputedStyle(vm.$el).justifyContent).to.eq('flex-start')
    })
});