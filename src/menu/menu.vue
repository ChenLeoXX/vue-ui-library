<template>
	<div class="menu-wrapper">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "v-menu",
        data() {
            return {
                childItem: [],
                namePath: [],
            }
        },
        mounted() {
            this.selectDefault()
            this.listenChild()
        },
        updated() {
            this.selectDefault()
        },
        methods: {
            add(vm) {
                this.childItem.push(vm)
            },
            selectDefault() {
                if (this.active.length > 0) {
                    this.childItem.forEach(vm => {
                        vm.active = this.active.indexOf(vm.name) >= 0
                    })
                }
            },
            listenChild() {
                this.childItem.forEach(vm => {
                    vm.$on('add:item', (name) => {
                        if (this.multiple) {
                            let copy = JSON.parse(JSON.stringify(this.active))
                            copy.push(name)
                            this.$emit('update:active', copy)
                        } else {
                            this.$emit('update:active', [name])
                        }
                    })
                })
            },
        },
        provide() {
            return {
                menu: this
            }
        },
        props: {
            active: {
                type: Array,
                validator(value) {
                    return value.every(item => {
                        return typeof item === 'string'
                    })
                },
                default: () => ([])
            },
            multiple: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.menu-wrapper {
		user-select: none;
		line-height: 46px;
		display: flex;
		color: $base-font-color;
		border-bottom: 1px solid $gray-border;
	}
</style>