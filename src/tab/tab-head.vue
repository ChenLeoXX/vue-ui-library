<template>
	<div class="tab-head">
		<slot></slot>
		<div class="actions-wrapper">
			<slot name="action"></slot>
		</div>
		<div class="line" ref="line"></div>
	</div>
</template>
<script>
    export default {
        name: "tab-head",
        inject: ['eventHub'],
        mounted() {
            if (this.eventHub) {
                this.eventHub.$on('update:selectName', (name, vm) => {
                    this.$refs.line.style.width = vm.clientWidth + 'px'
                    this.$refs.line.style.left = vm.offsetLeft + 'px'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
	$blue-text: #40a9ff;
	.tab-head {
		display: flex;
		border-bottom: 1px solid #ddd;
		position: relative;
		
		.line {
			position: absolute;
			border: 1px solid $blue-text;
			bottom: -1px;
			transition: all 300ms;
		}
		> .actions-wrapper {
			margin-left: auto;
		}
	}
</style>