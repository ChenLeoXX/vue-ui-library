<template>
	<div class="popover" ref="popover">
		<div class="content-wrapper" :class="{[`position-${position}`]:true}" v-if="visible" ref="contentWrapper">
			<slot name="content">
			</slot>
		</div>
		<div class="trigger-wrapper" @click="onTrigger($event)" ref="trigger">
			<slot :test="test"></slot>
		</div>
	</div>
</template>

<script>
    export default {
        name: "popover",
        data() {
            return {
                visible: false,
                test: {
                    txt: 'hello world',
                    name: 'leo,'
                }
            }
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(val) {
                    return ['top', 'left', 'right', 'bottom'].indexOf(val) >= 0
                }
            }
        },
        methods: {
            getPosition() {
                let contentWrapper = this.$refs.contentWrapper
                document.body.appendChild(contentWrapper)
                const {height, width, top, left} = this.$refs.trigger.getBoundingClientRect()
                const {height: contentHeight} = this.$refs.contentWrapper.getBoundingClientRect()
                const positions = {
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollX
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX
                    },
                    left: {
                        top: top + ((height - contentHeight) / 2) + window.scrollY,
                        left: left + window.scrollX
                    },
                    right: {
                        top: top + ((height - contentHeight) / 2) + window.scrollY,
                        left: left + width + window.scrollX
                    }
                }
                contentWrapper.style.top = positions[this.position].top + 'px'
                contentWrapper.style.left = positions[this.position].left + 'px'
            },
            onTrigger(e) {
                if (this.$refs.trigger.contains(e.target)) {
                    if (this.visible) {
                        this.close()
                    } else {
                        this.show()
                    }
                }
            },
            close() {
                this.visible = false
                document.removeEventListener('click', this.onDocClick)
            },
            show() {
                this.visible = true
                this.$nextTick(() => {
                    this.getPosition()
                    document.addEventListener('click', this.onDocClick)
                })
            },
            onDocClick(e) {
                let popEl = this.$refs.popover
                let contentEl = this.$refs.contentWrapper
                if (popEl.contains(e.target) || popEl === e.target) return
                if ((contentEl && contentEl === e.target) || contentEl.contains(e.target)) return
                this.close()
            }
        }
    }
</script>

<style lang="scss" scoped>
	
	.popover {
		display: inline-block;
		.trigger-wrapper {
			display: inline-block;
		}
	}
	
	.content-wrapper {
		box-sizing: border-box;
		filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.15));
		background-color: #fff;
		background-clip: padding-box;
		border-radius: 4px;
		max-width: 30em;
		word-break: break-word;
		display: inline-block;
		position: absolute;
		padding: 0.5em 1em;
		&::before {
			content: '';
			display: block;
			position: absolute;
			height: 0;
			width: 0;
			border: 5px solid white;
		}
		
		&.position-top {
			transform: translateY(-100%);
			margin-top: -10px;
			
			&.position-top:before {
				top: 100%;
				border-right-color: transparent;
				border-bottom: none;
				border-left-color: transparent;
			}
		}
		
		&.position-bottom {
			margin-top: 10px;
			
			&.position-bottom:before {
				top: -5px;
				border-right-color: transparent;
				border-top: none;
				border-left-color: transparent;
			}
		}
		
		&.position-left {
			transform: translateX(-100%);
			margin-left: -10px;
			
			&.position-left:before {
				top: 50%;
				transform: translateY(-50%);
				right: -5px;
				border-right: none;
				border-top-color: transparent;
				border-bottom-color: transparent;
			}
		}
		
		&.position-right {
			/*transform: translateX(100%);*/
			margin-left: 10px;
			
			&.position-right:before {
				top: 50%;
				transform: translateY(-50%);
				left: -5px;
				border-left: none;
				border-top-color: transparent;
				border-bottom-color: transparent;
			}
		}
	}

</style>