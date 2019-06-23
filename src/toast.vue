<template>
	<div ref="ct" class="toast" :class="{[`position-${showPosition}`]:true}">
		<div class="content">
			<div v-html="$slots.default[0]" v-if="enableHtml"></div>
			<slot v-else></slot>
		</div>
		<div class="line" ref="line" K></div>
		<span class="text" @click="onCloseClick">{{closeBtn.text}}</span>
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
                default: 'top',
                validator(val) {
                    return ['top', 'bottom', 'middle'].indexOf(val) > -1
                }
            },
            autoClose: {
                type: Boolean,
                default: true
            },
            closeDelay: {
                type: Number,
                default: 30,
            }
        },
        mounted() {
            this.excuteClose()
            this.calcLineHeight()
        },
        methods: {
            calcLineHeight() {
                // mounted 之后下次队列更新
                this.$nextTick(() => {
                    this.$refs.line.style.height = this.$refs.ct.getBoundingClientRect().height + 'px'
                })
            },
            excuteClose() {
                if (this.autoClose) {
                    this.close()
                }
            },
            onCloseClick() {
                this.closeBtn.callback(this)
                this.$el.remove()
                this.$destroy()
            },
            close() {
                setTimeout(() => {
                    this.$el.remove()
                    this.$destroy()
                }, this.closeDelay * 1000);
            }
        }
    }
</script>
<style lang="scss" scoped>
	.toast {
		color: #fff;
		padding: 0 0.5em;
		display: flex;
		align-items: center;
		border-radius: 3px;
		font-size: 14px;
		position: fixed;
		left: 50%;
		min-height: 40px;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.74);
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
		/*text-align: center;*/
		.content {
			padding: 0.5em;
		}
		
		.text {
			flex-shrink: 0;
			padding: 0 8px;
		}
		&.position-top {
			top: 0%;
		}
		
		&.position-middle {
			top: 50%;
		}
	}
	
	.line {
		border-left: 1px solid #666;
	}
</style>
