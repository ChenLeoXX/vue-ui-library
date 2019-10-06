<template>
	<div class="header">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        mounted() {
            console.log('head mounted')
        }
    }
</script>
<style lang="scss" scoped>
	.header {
		padding: 0 50px;
		flex: 0 0 auto;
	}
</style>