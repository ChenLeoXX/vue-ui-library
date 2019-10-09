import Vue from 'vue'
import loading from './loading.vue'

export default {
    bar: null,
    propsData: null,
    timer: null,
    install(Vue, options) {
        Vue.prototype.$loading = this
    },
    config(options) {
        this.propsData = options
    },
    start() {
        this.bar && this.destroy()
        this.createBar()
    },
    createBar() {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(loading)
        this.bar = new Constructor({
            propsData: this.propsData
        }).$mount(div)
    },
    finish() {
        if (this.timer) return
        if (this.bar) {
            this.bar.finish()
            this.timer = setTimeout(() => {
                this.destroy()
            }, 1200)
        }
    },
    error() {
        if (this.timer) return
        if (this.bar) {
            this.bar.error()
            this.timer = setTimeout(() => {
                this.destroy()
            }, 1200)
        }
    },
    clearTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer)
            this.timer = null
        }
    },
    destroy() {
        this.bar && this.bar.destroyEle()
        this.bar = null
        this.clearTimer()
    }
}