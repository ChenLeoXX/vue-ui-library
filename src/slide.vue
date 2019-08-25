<template>
	<div class="v-slide">
		<div class="v-slide-window">
			<div class="v-slide-inner">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "slide",
        data() {
            return {}
        },
        props: {
            selected: {
                type: String
            },
            autoPlay: {
                type: Boolean,
                default: false,
            },
            autoPlayDelay: {
                type: Number,
                default: 3000
            },
        },
        mounted() {
            this.updateChild()
            if (this.autoPlay) {
                this.enableAutoPlay()
            }
        },
        updated() {
            this.updateChild()
        },
        methods: {
            enableAutoPlay() {
                let names = this.getNames()
                let inx = names.indexOf(this.getDefaultSelect())
                const run = () => {
                    if (inx > names.length - 1) inx = 0
                    setTimeout(() => {
                        inx++
                        this.$emit('update:selected', names[inx])
                        run()
                    }, this.autoPlayDelay)
                }
                run()
            },
            getNames() {
                return this.$children.map(item => item.name)
            },
            getDefaultSelect() {
                let firstChild = this.$children[0]
                return this.selected || firstChild.name
            },
            updateChild() {
                let selected = this.getDefaultSelect()
                this.$children.forEach(item => {
                    item.selected = selected
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
	.v-slide {
		border: 1px solid red;
		display: inline-block;
		
		&-window {
			overflow: hidden;
		}
		
		&-inner {
			position: relative;
		}
	}
</style>