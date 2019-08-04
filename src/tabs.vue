<template>
	<div class="tabs">
		<slot></slot>
	</div>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "tabs",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                },
            }
        },
        data() {
            return {
                eventHub: new Vue(),
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let vm
                if (this.$children.length === 0) {
                    throw  Error('tab需要传入tab-head和 tab-body')
                }
                this.$children.forEach(item => {
                    if (item.$options.name === 'tab-head') {
                        item.$children.forEach(item => {
                            if (item.name === this.selected && item.$options.name === 'tab-item') {
                                vm = item.$el
                            }
                        })
                    }
                })
                this.eventHub.$emit('update:selectName', this.selected, vm)
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
	.tabs {
	}
</style>