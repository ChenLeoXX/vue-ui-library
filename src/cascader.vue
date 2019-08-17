<template>
	<div class="cascader-wrapper">
		<div class="trigger" @click="visible = !visible">
			<slot></slot>
		</div>
		<div class="popover" v-if="visible">
			<cascader-item :items="source"></cascader-item>
		</div>
	</div>
</template>

<script>
    import cascaderItem from './cascader-item'

    export default {
        name: "cascader",
        props: {
            source: {
                type: Array
            },
        },
        components: {
            cascaderItem
        },
        data() {
            return {
                visible: false
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "var";
	
	.cascader-wrapper {
		.popover {
			margin-top: 4px;
			box-shadow: $box-shadow;
		}
	}
</style>