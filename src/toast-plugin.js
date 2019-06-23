import Vue from 'vue'
import Toast from './toast.vue'

let curInstance
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (msg, propsData) {
            if (curInstance) {
                curInstance.close()
            }
            curInstance = createToast(Vue, msg, propsData, Toast)
        }
    }
}

function createToast(Vue, msg, propsData, Toast) {
    let Constructor = Vue.extend(Toast);
    let toast = new Constructor({
        propsData
    });
    toast.$slots.default = [msg];
    toast.$on('close', function () {
        curInstance = null
    })
    toast.$mount();
    document.body.appendChild(toast.$el)
    return toast
}