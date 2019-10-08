<template>
	<div class="v-sticky-wrapper" ref="wrapper" :style="{height}">
		<div class="v-sticky-placeholder" :style="{left,width,top}" :class="{sticky}">
			<slot></slot>
		</div>
	</div>
</template>
<script>
    export default {
        name: "sticky",
        props: {
            distance: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                height: '',
                width: '',
                left: '',
                top: '',
                sticky: false
            }
        },
        mounted() {
            this.handler = this.windowScrollHandler.bind(this)
            window.addEventListener('scroll', this.handler)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handler)
        },
        methods: {
            calcTop() {
                let {top} = this.$refs.wrapper.getBoundingClientRect()
                return top + window.scrollY - this.distance
            },
            windowScrollHandler() {
                let top = this.calcTop()
                if (top < window.scrollY) {
                    let {height, width, left} = this.$refs.wrapper.getBoundingClientRect()
                    this.height = height + 'px'
                    this.width = width + 'px'
                    this.left = left + 'px'
                    this.top = this.distance + 'px'
                    this.sticky = true
                } else {
                    this.height = ''
                    this.width = ''
                    this.top = ''
                    this.sticky = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	.v-sticky-wrapper {
		.v-sticky-placeholder {
			&.sticky {
				position: fixed;
				z-index: 10;
			}
		}
	}
</style>