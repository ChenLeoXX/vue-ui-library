<template>
	<div class="sider">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        name: 'vSider'
    }
</script>
<style lang="scss" scoped>
	.sider {
		width: 200px;
	}
</style>