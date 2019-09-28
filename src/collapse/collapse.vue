<template>
	<div class="collapse">
		<slot></slot>
	</div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: "collapse",
        data() {
            return {
                eventHub: new Vue
            }
        },
        mounted() {
            //  触发默认展示
            this.eventHub.$emit('update:selected', this.selectedArr)
            //    监听开启
            this.eventHub && this.eventHub.$on('update:add', (name) => {
                let arr = this.selectedArr.slice()
                if (this.single) {
                    arr = [name]
                } else {
                    arr.push(name)
                }
                this.eventHub.$emit('update:selected', arr)
                //同步sync 属性selectedArr
                this.$emit('update:selectedArr', arr)
            })
            // 监听关闭
            this.eventHub && this.eventHub.$on('update:remove', (name) => {
                let arr = this.selectedArr.slice()
                arr.splice(arr.indexOf(name), 1)
                this.eventHub.$emit('update:selected', arr)
                //同步sync 属性selectedArr
                this.$emit('update:selectedArr', arr)
            })
        },
        props: {
            single: {
                type: Boolean,
                default: false
            },
            selectedArr: {
                type: Array,
                validator(val) {
                    return val.every(item => {
                        let type = typeof item
                        return type === 'string' || type === 'number'
                    })
                },
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
	}
</style>