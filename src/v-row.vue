<template>
	<div class="row" :class="rowClass" :style="rowStyle">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        name: "v-row",
        props: {
            gutter: {
                type: [String, Number],
            },
            align: {
                type: [String, Number],
                validator(value) {
                    return ['left', 'right', 'center'].includes(value)
                }
            }
        },
        computed: {
            rowClass() {
                let {align} = this;
                return [align && `align-${align}`]
            },
            rowStyle() {
                let {gutter} = this;
                return {marginLeft: -gutter / 2 + 'px', marginRight: -gutter / 2 + 'px'}
            }
        },
        //父组件上内的子组件挂载完成后才会挂载父组件
        mounted() {
            this.children.forEach(function (child) {
                //在子组件data上定义 gutter
                child.gutter = this.gutter
            }.bind(this))
        }
    }
</script>

<style lang="scss" scoped>
	.row {
		display: flex;
		flex-wrap: wrap;

		&.align-right {
			justify-content: flex-end;
		}

		&.align-left {
			justify-content: flex-start;
		}

		&.align-center {
			justify-content: center;
		}
	}
</style>