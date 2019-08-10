<template>
	<div class="popover" ref="popover">
		<div class="content-wrapper" :class="{[`position-${position}`]:true}" v-if="visible" ref="contentWrapper">
			<div class="title" v-if="needTitle">
				<slot name="title"></slot>
			</div>
			<div class="content">
				<slot name="content">
				</slot>
			</div>
		</div>
		<div class="trigger-wrapper" ref="trigger">
			<slot></slot>
		</div>
	</div>
</template>

<script>
    export default {
        name: "popover",
        data() {
            return {
                visible: false,
                hoverTimer: null
            }
        },
        props: {
            trigger: {
                type: String,
                default: 'click',
                validator(val) {
                    return ['click', 'hover'].indexOf(val) >= 0
                }
            },
            needTitle: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top',
                validator(val) {
                    return ['top', 'left', 'right', 'bottom'].indexOf(val) >= 0
                }
            }
        },
        mounted() {
            if (this.trigger === 'click') {
                this.$refs.popover.addEventListener('click', this.onTrigger)
            } else if (this.trigger === 'hover') {
                this.$refs.popover.addEventListener('mouseenter', this.show)
                this.$refs.popover.addEventListener('mouseleave', this.close)
            }
        },
        //手动添加的监听器需要手动清除
        destroyed() {
            if (this.trigger === 'click') {
                this.$refs.popover.removeEventListener('click', this.onTrigger)
            } else if (this.trigger === 'hover') {
                this.$refs.popover.removeEventListener('mouseenter', this.show)
                this.$refs.popover.removeEventListener('mouseleave', this.close)
                this.$refs.contentWrapper.removeEventListener('mouseenter', this.clearTimer)
                this.$refs.contentWrapper.removeEventListener('mouseleave', this.close)
            }
        },
        methods: {
            clearTimer() {
                clearTimeout(this.hoverTimer)
            },
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
                if (this.trigger === 'hover') {
                    this.hoverTimer = setTimeout(() => {
                        this.visible = false
                    }, 200)
                } else {
                    this.visible = false
                    document.removeEventListener('click', this.onDocClick)
                }
            },
            show() {
                this.visible = true
                if (this.trigger === 'hover') {
                    this.$nextTick(() => {
                        this.getPosition()
                        this.$refs.contentWrapper.addEventListener('mouseenter', this.clearTimer)
                        this.$refs.contentWrapper.addEventListener('mouseleave', () => {
                            this.visible = false
                        })
                    })
                } else {
                    this.$nextTick(() => {
                        this.getPosition()
                        document.addEventListener('click', this.onDocClick)
                    })
                }
              
            },
            //判断是否是点击的内容区域,或者组件自身 阻止
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
		
		.title, .content {
			padding: 0.5em 1em;
		}
		
		.title {
			border-bottom: 1px solid #ddd;
		}
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
				margin-left: 10px;
				border-right-color: transparent;
				border-bottom: none;
				border-left-color: transparent;
			}
		}
		
		&.position-bottom {
			margin-top: 10px;
			&.position-bottom:before {
				margin-left: 10px;
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