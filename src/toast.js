import Vue from 'vue'
import Toast from './toast.vue'

export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (msg) {
            let Constructor = Vue.extend(Toast);
            let toast = new Constructor({
                propsData: {}
            });
            toast.$slots.default = [msg];
            toast.$mount();
            document.body.appendChild(toast.$el)
        }
    }
}