<template>
	<div class="tab-head">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        name: "tab-head",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                },
            }
        }
    }
</script>
<style lange="scss" scoped>
	.tab-head {
	
	}
</style>