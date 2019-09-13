const data = {
    'email': '4324244@qq.com',
    'phone': 12312312323
}
const rules = [{key: 'email', required: true, pattern: 'email'}, {
    key: 'phone',
    required: true,
    maxLength: true,
    minLength: true
}];

/*
    表单验证器
*/

function ensureObject(obj, key) {
    if (Validator.isType(obj[key]) !== 'object') {
        obj[key] = {}
    }
}

class Validator {
    constructor() {
        this.errors = {}
    }

//    自定义全局验证方法
    static add(name, fn) {
        Validator.prototype[name] = fn
    }

    static isType(target) {
        const type = Object.prototype.toString
        return type.call(target).slice(8, -1).toLowerCase()
    }

    validate(data, rules) {
        if (Validator.isType(data) !== 'object' || !Array.isArray(rules)) {
            throw TypeError('data or value is invalid')
        }
        rules.forEach(rule => {
            let value = data[rule.key]
            if (rule.required) {
                let error = this.require(value, rule.key)
                if (error) {
                    ensureObject(this.errors, rule.key)
                    this.errors[rule.key].required = error
                    return
                }
            }
            let validateKeys = Object.keys(rule).filter(key => key !== 'required' && key !== 'key')
            validateKeys.forEach(key => {
                if (this[key]) {
                    let error = this[key](value, rule[key])
                    if (error) {
                        ensureObject(this.errors, rule.key)
                        this.errors[rule.key][key] = error
                    }
                } else {
                    throw TypeError(`${key}的校验方法不存在`)
                }
            })

        })
    }

    require(value, key) {
        if (value !== 0 && !value) {
            return `${key}为必填`
        }
    }

//    内置的正则验证
    pattern(value, pattern) {
        let reg
        if (pattern === 'email') {
            reg = /^.+@+.$/
            return reg.test(value) ? '' : '格式错误'
        }
    }
}

export default Validator

const v1 = new Validator();
const v2 = new Validator();
Validator.add('minLength', (val) => {
    val += ''
    if (val.length < 11) return '太短了'
})
v1.maxLength = function (val) {
    val += ''
    if (val.length > 11) return '太长了'
}
v1.minLength = (val) => {
    val += ''
    if (val.length < 12) return '太短了'
}
v1.validate(data, rules)
