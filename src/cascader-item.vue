<template>
	<div class="cascader-item" v-if="items.length >0" :style="{'minHeight':height}">
		<div class="left">
			<div class="label" v-for="(item,index) in items" :key="index" @click="onSelect(item)">
				{{item.name}}
				<v-icon icon-name="right" color="gray" v-if="item.children.length"></v-icon>
			</div>
		</div>
		<div class="right" v-if="selected[level] &&selected[level].children.length">
			<cascader-item :items="selected[level].children" :level="level+1" :selected="selected"
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
                default: '200px'
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
                console.log($event);
                this.$emit('update:selected', $event)
            },
            onSelect(item) {
                let copyArr = JSON.parse(JSON.stringify(this.selected))
                copyArr[this.level] = item
                this.$emit('update:selected', copyArr)
            }
        },
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