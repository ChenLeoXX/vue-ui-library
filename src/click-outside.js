const cb = []
const fn = (e) => {
    let {target} = e
    cb.forEach(item => {
        if (target === item.el || item.el.contains(target)) return
        item.cb()
    })
}
document.addEventListener('click', fn)
export default {
    bind(el, binding, vnode) {
        cb.push({
            el: el,
            cb: binding.value.bind(this)
        })
    },
    unbind() {
        document.removeEventListener('click', fn)
    }
}