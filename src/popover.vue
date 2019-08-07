<template>
	<div class="popover" @click="xxx" ref="popover">
		<div class="content-wrapper" v-if="visible">
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
        methods: {
            xxx() {
                console.log('xxx')
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
                    document.addEventListener('click', this.onDocClick)
                }, 50)
            },
            onDocClick(e) {
                let el = this.$refs.popover
                if (!el.contains(e.target) || e.target !== el) {
                    this.close()
                } else {
                    return undefined
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	.popover {
		.trigger-wrapper {
			display: inline-block;
			border: 1px solid blue;
		}
	}
	
	.content-wrapper {
		/*display: inline-block;*/
		border: 1px solid red;
		padding: 3px;
	}

</style>