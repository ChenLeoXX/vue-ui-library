<template>
	<div class="collapse-item" @click.stop="toggle">
		<div class="title" ref="title" v-show="title">
			<div class="icon-wrapper">
				<v-icon icon-name="right"></v-icon>
			</div>
			{{this.title}}
		</div>
		<v-expand :visible="visible">
			<div class="content" @click.stop>
				<slot></slot>
			</div>
		</v-expand>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    import vExpand from '../animations/expand'
    export default {
        name: "collapse-item",
        inject: ['eventHub'],
        data() {
            return {
                visible: true,
            }
        },
        props: {
            title: {
                type: String,
                required: true
            },
            name: {
                type: String | Number,
                required: true
            },
        },
        mounted() {
            this.eventHub && this.eventHub.$on('update:selected', (names) => {
                this.visible = names.indexOf(this.name) >= 0;
                this.changeIconPos()
            })
        },
        methods: {
            toggle() {
                if (this.visible) {
                    this.eventHub.$emit('update:remove', this.name)
                    this.changeIconPos()
                } else {
                    this.eventHub.$emit('update:add', this.name)
                    this.changeIconPos()
                }
            },
            changeIconPos() {
                if (this.visible) {
                    this.$refs.title.querySelector('svg').classList.remove('rotate')
                } else {
                    this.$refs.title.querySelector('svg').classList.add('rotate')
                }
            },
        },
        components: {
            vIcon,
            vExpand
        }
    }
</script>

<style lang="scss">
	$content-txt-color: rgba(0, 0, 0, 0.65);
	$title-txt-color: rgba(0, 0, 0, 0.85);
	$item-radius: 4px;
	.collapse-item {
		&:first-child > .title {
			border-top-left-radius: $item-radius;
			border-top-right-radius: $item-radius;
		}
		
		&:last-child > .title {
			/*border-bottom: none;*/
			border-bottom-left-radius: $item-radius;
			border-bottom-right-radius: $item-radius;
		}
		
		.title {
			cursor: pointer;
			position: relative;
			border: 1px solid #ddd;
			background: rgba(250, 250, 250, 1);
			color: $title-txt-color;
			padding: 12px 16px 12px 40px;
			margin-top: -1px;
			margin-left: -1px;
			margin-right: -1px;
			.icon-wrapper {
				position: absolute;
				left: 14px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 14px;
				svg {
					/*display: inline-block;*/
					transition-property: transform;
					transition-duration: 0.24s, 0.24s;
					transition-timing-function: ease, ease;
					
					&.rotate {
						transform: rotate(90deg);
					}
				}
			}
		}
		
		.content {
			color: $content-txt-color;
			padding: 16px;
		}
	}
</style>