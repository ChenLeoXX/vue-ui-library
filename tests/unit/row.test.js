const expect = chai.expect;
import Vue from 'vue/types'
import Col from '../../src/v-col'
import Row from '../../src/v-row'

describe('Row', function () {
    it('存在', function () {
        expect(Row).to.be.exist;
    });
    it('gutter属性', function (done) {
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
    it('align属性', function () {
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