<template>
	<div class="toast" :class="{[`position-${showPosition}`]:true}">
		<slot></slot>
		<div class="line"></div>
		<span @click="onCloseClick">{{closeBtn.text}}</span>
	</div>
</template>
<script>
    export default {
        name: "toast",
        props: {
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
            if (this.autoClose) {
                this.close()
            }
        },
        methods: {
            onCloseClick() {
                this.close();
                this.closeBtn.callback(this)
            },
            close() {
                setTimeout(() => {
                    this.$el.remove();
                    this.$destroy();
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
		border-radius: 3px;
		font-size: 14px;
		position: fixed;
		/*padding:0.5em;*/
		left: 50%;
		height: 40px;
		line-height: 40px;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.74);
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
		text-align: center;
		
		&.position-top {
			top: 0%;
		}
		
		&.position-middle {
			top: 50%;
		}
	}
	
	.line {
		margin: 0 0.5em;
		height: 100%;
		width: 1px;
		background: rgb(228, 228, 228, .15);
	}
</style>