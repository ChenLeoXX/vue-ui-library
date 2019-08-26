<template>
	<div class="v-slide">
		<div class="v-slide-window">
			<div class="v-slide-inner">
				<slot></slot>
				<div class="dots">
					<span class="dot" v-for="n in childLength" :key="n" @click="dotClick(n-1)">
						{{n}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "slide",
        data() {
            return {
                lastIndex: null,
                childLength: null,
            }
        },
        computed: {
            curInx() {
                let inx = this.names.indexOf(this.selected)
                return inx === -1 ? 0 : inx
            },
            names() {
                return this.$children.map(item => item.name)
            },
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
            this.childLength = this.$children.length
            if (this.autoPlay) {
                this.enableAutoPlay()
            }
        },
        updated() {
            this.updateChild()
        },
        methods: {
            enableAutoPlay() {
                const run = () => {
                    let newInx = this.curInx + 1
                    if (newInx === this.names.length) newInx = 0
                    this.dotClick(newInx)
                    setTimeout(run, this.autoPlayDelay)
                }
                setTimeout(run, this.autoPlayDelay)
            },
            dotClick(inx) {
                this.lastIndex = this.curInx
                let names = this.names
                this.$emit('update:selected', names[inx])
            },
            getDefaultSelect() {
                let firstChild = this.$children[0]
                return this.selected || firstChild.name
            },
            updateChild() {
                let selected = this.getDefaultSelect()
                this.$children.forEach(item => {
                    let reverse = this.curInx < this.lastIndex;
                    if (this.lastIndex === this.names.length) reverse = false
                    item.reverse = reverse
                    this.$nextTick(() => {
                        item.selected = selected
                    })
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
	.v-slide {
		/*display: inline-block;*/
		&-window {
			overflow: hidden;
		}
		
		&-inner {
			position: relative;
			
			.dots {
				.dot {
					background: blue;
				}
			}
		}
	}
</style>