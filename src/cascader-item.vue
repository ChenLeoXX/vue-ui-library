<template>
	<div class="cascader-item" v-if="items && items.length >0">
		<div class="left" :style="{'maxHeight':height}">
			<div class="label" v-for="(item,index) in items" :key="index" @click="onSelect(item)">
				{{item.name}}
				<v-icon icon-name="right" color="gray" v-if="item.children&&item.children.length"></v-icon>
			</div>
		</div>
		<div class="right" v-if="rightItems">
			<cascader-item :items="rightItems.children" :level="level+1" :selected="selected"
			               @update:selected="onUpdate"
			></cascader-item>
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
                default: '300px'
            },
            level: {
                type: Number,
                default: 0
            },
            selected: {
                type: Array
            }
        },
        data() {
            return {
                leftSelected: null,
            }
        },
        methods: {
            onUpdate($event) {
                this.$emit('update:selected', $event)
            },
            onSelect(item) {
                let copyArr = JSON.parse(JSON.stringify(this.selected))
                copyArr[this.level] = item
                copyArr.splice(this.level + 1)
                this.$emit('update:selected', copyArr)
            }
        },
        computed: {
            rightItems() {
                //添加一个items的依赖 才会更新
                let target = this.selected[this.level]
                if (target) {
                    let item = this.items.filter(item => item.name === target.name)[0]
                    if (item && item.children && item.children.length > 0) {
                        return item
                    } else {
                        return null
                    }
                }
            },
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
			overflow: auto;
			cursor: pointer;
			border-radius: $border-radius;
			background: white;
			.label {
				user-select: none;
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