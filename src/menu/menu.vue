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
            }
        },
        created() {
            this.selectDefault()
        },
        methods: {
            add(vm) {
                this.childItem.push(vm)
            },
            selectDefault() {
                if (this.active) {
                    this.childItem.forEach(vm => {
                        vm.active = vm.name === this.active
                    })
                }
            },
        },
        provide() {
            return {
                menu: this
            }
        },
        props: {
            active: {
                type: String
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