<template>
	<div class="popover" ref="popover">
		<div class="content-wrapper" v-if="visible" ref="contentWrapper">
			<slot name="content"></slot>
		</div>
		<div class="trigger-wrapper" @click="onTrigger($event)" ref="trigger">
			<slot></slot>
		</div>
	</div>
</template>

<script>
    export default {
        name: "popover",
        data() {
            return {
                visible: false
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
                contentWrapper.style.top = top + window.scrollY + 'px'
                contentWrapper.style.left = left + window.scrollX + 'px'
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
                setTimeout(() => {
                    this.getPosition()
                    document.addEventListener('click', this.onDocClick)
                }, 50)
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
		.trigger-wrapper {
			display: inline-block;
		}
	}
	
	.content-wrapper {
		box-sizing: border-box;
		margin-top: -10px;
		filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.15));
		transform: translateY(-100%);
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
			top: 100%;
			/*margin-left: 10px;*/
			height: 0;
			width: 0;
			border: 5px solid white;
			border-right-color: transparent;
			border-bottom: none;
			border-left-color: transparent;
		}
	}

</style>