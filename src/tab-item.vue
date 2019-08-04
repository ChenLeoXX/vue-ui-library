<template>
	<div class="tab-item">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "tab-item",
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lange="scss" scoped>
	.tab-item {
	}
</style>