<template>
	<div class="cascader-item" v-if="items.length >0" :style="{'minHeight':height}">
		<div class="left">
			<div class="label" v-for="(item,index) in items" :key="index" @click="leftSelected = item">
				{{item.name}}
				<v-icon icon-name="right" color="gray" v-if="item.children.length"></v-icon>
			</div>
		</div>
		<div class="right" v-if="rightItems">
			<cascader-item :items="rightItems"></cascader-item>
		</div>
	</div>
</template>

<script>
    import icon from './v-icon'

    export default {
        name: "cascader-item",
        components: {
            'v-icon': icon
        },
        props: {
            items: {
                type: Array
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems() {
                if (this.leftSelected && this.leftSelected.children) {
                    return this.leftSelected.children
                } else {
                    return null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "var";
	
	.cascader-item {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		color: $light-gray-color;
		
		.right {
			border-left: 1px solid $border-color;
		}
		
		.left {
			cursor: pointer;
			border-radius: $border-radius;
			background: white;
			
			.label {
				min-width: 110px;
				padding: 5px 24px 5px 12px;
				display: flex;
				align-items: center;
				position: relative;
				
				&:hover {
					background: $hover-lightblue;
				}
				
				.icon-wrapper {
					position: absolute;
					right: 12px;
				}
			}
		}
	}
</style>