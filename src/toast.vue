<template>
	<div class="wrapper" :class="toastClasses">
		<div ref="ct" class="toast">
			<div class="content">
				<div v-html="$slots.default[0]" v-if="enableHtml"></div>
				<slot v-else></slot>
			</div>
			<div class="line" ref="line"></div>
			<span class="close" @click="onCloseClick">{{closeBtn.text}}</span>
		</div>
	</div>
</template>
<script>
    export default {
        name: "toast",
        props: {
            enableHtml: {
                type: Boolean,
                default: false,
            },
            closeBtn: {
                type: Object,
                default: () => {
                    return {
                        text: '关闭',
                        callback: undefined
                    }
                }
            },
            showPosition: {
                type: String,
                default: 'middle',
                validator(val) {
                    return ['top', 'bottom', 'middle'].indexOf(val) > -1
                }
            },
            autoClose: {
                type: [Boolean, Number],
                default: 3,
                validator(val) {
                    return val === false || (typeof val === 'number' && val > 0)
                },
            }
        },
        computed: {
            toastClasses() {
                return {[`position-${this.showPosition}`]: true}
            },
        },
        mounted() {
            this.excuteClose()
            this.calcLineHeight()
        },
        methods: {
            calcLineHeight() {
                // mounted 之后下次队列更新
                this.$nextTick(() => {
                    let btn = document.querySelector('.close')
                    btn.style.height = this.$refs.line.style.height = this.$refs.ct.getBoundingClientRect().height + 'px'
                })
            },
            excuteClose() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoClose * 1000)
                }
            },
            onCloseClick() {
                this.closeBtn.callback(this)
                this.$el.remove()
                this.$destroy()
            },
            close() {
                this.$el.remove()
                this.$emit('close')
                this.$destroy()
            }
        }
    }
</script>
<style lang="scss" scoped>
	$animation-duration: 300ms;
	@keyframes fade-in {
		0% {
			opacity: 0
		}
		100% {
			opacity: 1
		}
	}
	
	@keyframes slide-down {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	
	@keyframes slide-up {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	
	@keyframes fade-in {
		0% {
			opacity: 0
		}
		100% {
			opacity: 1
		}
	}
	
	.wrapper {
		position: fixed;
		left: 50%;
		
		&.position-top {
			top: 0;
			transform: translateX(-50%);
			
			.toast {
				animation: slide-down $animation-duration linear;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}
		}
		
		&.position-bottom {
			bottom: 0;
			transform: translateX(-50%);
			
			.toast {
				animation: slide-up $animation-duration linear;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
		
		&.position-middle {
			top: 50%;
			transform: translate(-50%, -50%);
			
			.toast {
				animation: fade-in $animation-duration linear;
			}
		}
	}
	.toast {
		color: #fff;
		padding: 0 0.5em;
		display: flex;
		align-items: center;
		border-radius: 3px;
		font-size: 14px;
		min-height: 40px;
		background: rgba(0, 0, 0, 0.74);
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
		.content {
			padding: 0.5em;
			max-width: 260px;
		}
		
		.close {
			cursor: pointer;
			flex-shrink: 0;
			padding: 0 8px;
			height: 100%;
			display: flex;
			align-items: center;
		}
	}
	
	.line {
		border-left: 1px solid #666;
	}
</style>
