<template>
	<div class="cascader-wrapper">
		<div class="trigger" @click="visible = !visible">
			<slot></slot>
		</div>
		<div class="popover" v-if="visible">
			<cascader-item
							:items="source" @update:selected="onUpdate"
							:height="height" :selected="selected"
			></cascader-item>
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
            selected: {
                type: Array,
                required: true
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        components: {
            cascaderItem
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            onUpdate(data) {
                this.$emit('update:selected', data)
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "var";
	
	.cascader-wrapper {
		position: relative;
		.popover {
			position: absolute;
			box-shadow: $box-shadow;
		}
	}
</style>