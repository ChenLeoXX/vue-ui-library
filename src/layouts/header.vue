<template>
	<div class="header">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        created() {
            console.log('head create')
        },
        mounted() {
            console.log('head mounted')
        }
    }
</script>
<style lang="scss" scoped>
	.header {

	}
</style>