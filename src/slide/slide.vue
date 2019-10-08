<template>
	<div class="v-slide" @mouseenter="pause" @mouseleave="enableAutoPlay"
	     @touchstart="onTouchstart"
	     @touchend="onTouchend"
	     @touchmove="onTouchmove"
	>
		<div class="v-slide-window">
			<div class="v-slide-inner">
				<slot></slot>
				<div class="dots" v-if="showDots">
					<span class="dot" :class="{'active':curInx === n-1}" v-for="n in childLength" :key="n" @click="dotClick(n-1)">
						{{n}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    export default {
        name: "slide",
        data() {
            return {
                lastIndex: null,
                childLength: null,
                timerId: '',
                touchObj: null,
            }
        },
        computed: {
            curInx() {
                let inx = this.names.indexOf(this.selected)
                return inx === -1 ? 0 : inx
            },
            names() {
                return this.$children.map(item => {
                    if (item.$options.name === 'slide-item') {
                        return item.name
                    }
                })
            },
        },
        props: {
            showDots: {
                type: Boolean,
                default: true
            },
            selected: {
                type: String,
                required: true,
            },
            autoPlay: {
                type: Boolean,
                default: true,
            },
            autoPlayDelay: {
                type: Number,
                default: 3000
            },
        },
        components: {
            vIcon
        },
        mounted() {
            this.updateChild()
            this.childLength = this.$children.filter(item => {
                return item.$options.name === 'slide-item'
            }).length
            if (this.autoPlay) {
                this.enableAutoPlay()
            }
        },
        updated() {
            this.updateChild()
        },
        methods: {
            onTouchstart(e) {
                this.touchObj = e.touches[0]
                this.pause()
            },
            onTouchend(e) {
                let changeTouch = e.changedTouches[0]
                let {clientX: x1, clientY: y1} = this.touchObj
                let {clientX: x2, clientY: y2} = changeTouch
                let deltaX = Math.abs(x2 - x1)
                let deltaY = Math.abs(y2 - y1)
                //最小滑动距离 20
                if (deltaY > deltaX || deltaX < 20) return null
                if (x2 - x1 > 0) {
                    // '向右'
                    this.dotClick(this.curInx - 1)
                } else {
                    this.dotClick(this.curInx + 1)
                    // '向左'
                }
                if (this.autoPlay) {
                    this.enableAutoPlay()
                }
            },
            onTouchmove() {
                // console.log('移动');
            },
            enableAutoPlay() {
                if (this.timerId) return
                const run = () => {
                    let newInx = this.curInx + 1
                    this.dotClick(newInx)
                    this.timerId = setTimeout(run, this.autoPlayDelay)
                }
                this.timerId = setTimeout(run, this.autoPlayDelay)
            },
            pause() {
                window.clearTimeout(this.timerId)
                this.timerId = ''
            },
            dotClick(inx) {
                let len = this.names.length - 1
                if (inx < 0) {
                    inx = inx = len
                } else if (inx > len) {
                    inx = 0
                }
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
                let len = this.names.length - 1
                this.$children.forEach(item => {
                    let reverse = this.curInx < this.lastIndex;
                    //无缝轮播
                    if (this.lastIndex === len && this.curInx === 0) reverse = false
                    if (this.curInx === len && this.lastIndex === 0) reverse = true
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
		box-sizing: border-box;
		position: relative;
		&-window {
			overflow: hidden;
		}
		
		&-inner {
			position: relative;
			
			.dots {
				position: absolute;
				bottom: 10px;
				left: 50%;
				transform: translateX(-50%);
				.dot {
					display: inline-block;
					margin: 0 4px;
					width: 16px;
					height: 3px;
					padding: 0;
					color: transparent;
					font-size: 0;
					background: #fff;
					border: 0;
					border-radius: 1px;
					outline: none;
					cursor: pointer;
					opacity: .3;
					transition: all .5s;
					
					&:hover {
						opacity: .75;
					}
					
					&.active {
						width: 24px;
						background: #fff;
						opacity: 1;
					}
				}
			}
		}
	}
</style>