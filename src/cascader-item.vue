<template>
	<div class="cascader-item" v-if="items && items.length >0">
		<div class="left" :style="{'height':height}">
			<div class="label" v-for="(item,index) in items" :key="index" @click.stop="onSelect(item)"
			     :class="{'option-selected': selected[level] && selected[level].name === item.name}">
				{{item.name}}
				<template v-if="item.name === loadItem.name">
					<v-icon icon-name="loading" color="gray" class="spin-icon"></v-icon>
				</template>
				<template v-else>
					<v-icon icon-name="right" class="arrow-icon" color="gray" v-if="rightArrowVisible(item)"></v-icon>
				</template>
			</div>
		</div>
		<div class="right" v-if="rightItems">
			<cascader-item :items="rightItems.children" :level="level+1" :selected="selected"
			               :load-item="loadItem"
			               @update:selected="onUpdate" :load-data="loadData"
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
            },
            loadData: {
                type: Function
            },
            //正在加载的所选对象
            loadItem: {
                type: Object,
                default: () => ({}),
            }
        },
        data() {
            return {
                leftSelected: null,
            }
        },
        methods: {
            /**
             * icon 通过是否动态加载显示逻辑
             * @param item
             * @returns {boolean}
             */
            rightArrowVisible(item) {
                return this.loadData ? !item.isLeaf : item.children.length > 0
            },
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
				min-width: 100px;
				padding: .5em 1em;
				display: flex;
				align-items: center;
				position: relative;
				
				&.option-selected {
					font-weight: 600;
					background-color: #fafafa;
				}
				&:hover {
					background: $hover-lightblue;
				}
				
				.arrow-icon {
					transform: scale(0.8);
					margin-left: auto;
				}
				
				.spin-icon {
					margin-left: auto;
					animation: spin .8s infinite linear;
				}
			}
		}
	}
</style>