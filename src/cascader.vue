<template>
	<div class="cascader-wrapper" v-click-outside="close" @click="toggle">
		<div class="trigger">
			<slot>
				<v-input :value="result" readonly></v-input>
			</slot>
		</div>
		<div class="popover" v-if="visible">
			<!--递归组件-->
			<cascader-item
							:items="source" @update:selected="onUpdate" :load-item="loadItem"
							:height="height" :selected="selected" :load-data="loadData"
			></cascader-item>
		</div>
	</div>
</template>

<script>
    import clickOutside from './click-outside'
    import vInput from './v-input'
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        directives: {
            clickOutside
        },
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
                default: '300px'
            },
            loadData: {
                type: Function
            },
        },
        components: {
            cascaderItem,
            vInput
        },
        data() {
            return {
                visible: false,
                loadItem: {},
            }
        },
        methods: {
            toggle() {
                this.visible = !this.visible
            },
            close() {
                this.visible = false
            },
            /**
             *
             * @param data 更新后的selected的数组
             */
            onUpdate(data) {
                this.$emit('update:selected', data)
                let lastUpdate = data[data.length - 1]
                let simpleFind = (children, id) => {
                    return children.filter(item => item.id === id)[0]
                }
                let complexFind = (children, id) => {
                    let noChild = []
                    let hasChild = []
                    children.forEach(item => {
                        if (item.children) {
                            hasChild.push(item)
                        } else {
                            noChild.push(item)
                        }
                    })
                    let found
                    found = simpleFind(noChild, id)
                    if (found) {
                        return found
                    } else {
                        found = simpleFind(hasChild, id)
                        if (found) {
                            return found
                        } else {
                            for (let i = 0; i < hasChild.length; i++) {
                                found = complexFind(hasChild[i].children, id)
                                if (found) return found
                            }
                            return null
                        }
                    }
                }
                let toUpdateSrc = (child) => {
                    //更改source的children 重新渲染
                    let copyArr = JSON.parse(JSON.stringify(this.source))
                    let target = complexFind(copyArr, lastUpdate.id)
                    target.children = child
                    //加载完毕
                    this.loadItem = {}
                    this.$emit('update:source', copyArr)
                }
                if (this.loadData && !lastUpdate.isLeaf) {
                    this.loadData && this.loadData(lastUpdate, toUpdateSrc)
                    this.loadItem = lastUpdate
                }
                if (lastUpdate.isLeaf) this.close()
            },
        },
        computed: {
            result() {
                return this.selected.map(item => {
                    return item.name
                }).join(' / ')
            },
        },
    }
</script>

<style lang="scss" scoped>
	@import "var";
	
	.cascader-wrapper {
		position: relative;
		display: inline-block;
		.popover {
			position: absolute;
			z-index: 1;
			transform: translateY(4px);
			box-shadow: $box-shadow;
		}
	}
</style>