<template>
	<div class="menu-wrapper" :class="{vertical}" ref="menuWrapper">
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
            this.calcPadding()
        },
        updated() {
            this.selectDefault()
        },
        methods: {
            calcPadding() {
                let elList = this.$refs.menuWrapper.querySelectorAll('.popover-wrapper')
                elList.forEach((el, index) => {
                    el.querySelectorAll('.vertical-item').forEach(child => {
                        let ind = index + 2
                        child.style.paddingLeft = `${24 * ind}px`
                    })
                })
            },
            add(vm) {
                this.childItem.push(vm)
            },
            selectDefault() {
                if (this.active) {
                    this.childItem.forEach(vm => {
                        vm.active = this.active === vm.name
                    })
                }
            },
            listenChild() {
                setTimeout(() => {
                    this.childItem.forEach(vm => {
                        vm.$on('add:item', (name) => {
                            this.$emit('update:active', name)
                        })
                    })
                })
            }
        },
        provide() {
            return {
                menu: this
            }
        },
        props: {
            active: {
                type: String,
            },
            vertical: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
	@import "../../style/var";
	
	.menu-wrapper {
		user-select: none;
		line-height: 46px;
		display: flex;
		font-size: 16px;
		color: $base-font-color;
		border-bottom: 1px solid $gray-border;
		
		&.vertical {
			display: block !important;
			border: none;
			border-right: 1px solid $gray-border;
			
			.menu-item.active::before, & .menu-item:hover::before {
				display: none;
			}
			
			.sub-menu-wrapper {
				.title:hover::before, .title.active::before {
					display: none !important;
				}
			}
		}
	}
</style>