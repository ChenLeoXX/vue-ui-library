<template>
	<div class="tab-head">
		<slot></slot>
		<div class="actions-wrapper">
			<slot name="action"></slot>
		</div>
	</div>
</template>
<script>
    export default {
        name: "tab-head",
        inject: ['eventHub'],
    }
</script>
<style lang="scss" scoped>
	.tab-head {
		display: flex;
		
		> .actions-wrapper {
			margin-left: auto;
		}
	}
</style>