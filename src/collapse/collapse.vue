<template>
	<div class="collapse" :class="{'border-none':noBorder}">
		<slot></slot>
	</div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: "collapse",
        data() {
            return {
                eventHub: new Vue,
                noBorder: false,
                lastName: '',
            }
        },
        mounted() {
            //  触发默认展示
            this.lastName = this.selected.unshift()
            this.eventHub.$emit('update:selected', this.selected)
            //    监听开启
            this.eventHub && this.eventHub.$on('update:add', (name) => {
                let arr = this.selected.slice()
                if (this.single) {
                    arr = [name]
                } else {
                    arr.push(name)
                }
                this.eventHub.$emit('update:selected', arr)
                //同步sync 属性selected
                this.$emit('update:selected', arr)
            })
            // 监听关闭
            this.eventHub && this.eventHub.$on('update:remove', (name) => {
                let arr = this.selected.slice()
                this.noBorder = arr[name] === this.lastName
                arr.splice(arr.indexOf(name), 1)
                this.eventHub.$emit('update:selected', arr)
                //同步sync 属性selected
                this.$emit('update:selected', arr)
            })
        },
        props: {
            single: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Array,
                validator(val) {
                    return val.every(item => {
                        let type = typeof item
                        return type === 'string' || type === 'number'
                    })
                },
                required: true,
            }
        },
        provide() {
            return {
                eventHub: this.eventHub
            }
        }
    }
</script>

<style lang="scss" scoped>
	$wrapper-radius: 4px;
	.collapse {
		border: 1px solid #ddd;
		border-radius: $wrapper-radius;
		
		&.border-none {
			border-bottom: none;
		}
	}
</style>