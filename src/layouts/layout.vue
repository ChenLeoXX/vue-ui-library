<template>
	<div class="layout-container" :class="{sider}">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {
                sider: false
            }
        },
        mounted() {
            this.$children.forEach(item => {
                if (item.$options.name === 'vSider') {
                    this.sider = true
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
	.layout-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		&.sider {
			flex-direction: row;
		}
	}
</style>