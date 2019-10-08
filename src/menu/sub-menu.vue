<template>
	<div class="sub-menu-wrapper" v-click-outside="close">
		<span class="title" :class="{'active':selected || active,'vertical-item':menu.vertical}" @click="showPop">
			<slot name="title"></slot>
			<span class="icon" :class="{'active':visible}" v-if="!menu.vertical">
				<v-icon icon-name="left"></v-icon>
			</span>
			<span class="icon" :class="{'vertical-active':visible}" v-if="menu.vertical">
				<v-icon icon-name="left"></v-icon>
			</span>
		</span>
		<template v-if="!menu.vertical">
			<div class="popover-wrapper" v-show="visible">
				<slot></slot>
			</div>
		</template>
		<template v-else>
			<transition name="fade" @enter="enter" @after-enter="afterEnter" @leave="leave" @afterLeave="afterLeave">
				<div class="popover-wrapper" :class="{'vertical':menu.vertical}" v-show="visible" @click.stop>
					<slot></slot>
				</div>
			</transition>
		</template>
	</div>
</template>
<script>
    import clickOutside from '../click-outside'
    import vIcon from '../basic/v-icon'

    export default {
        name: "sub-menu",
        inject: ['menu'],
        directives: {
            clickOutside
        },
        data() {
            return {
                visible: false,
                active: false
            }
        },
        components: {
            vIcon
        },
        props: {
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            selected() {
                return this.menu.namePath.indexOf(this.name) >= 0
            }
        },
        methods: {
            //利用getBoundingClientRect调用触发动画
            enter(el, done) {
                let {height} = el.getBoundingClientRect()
                el.style.height = 0
                el.getBoundingClientRect()
                el.style.height = `${height}px`
                setTimeout(() => {
                    done()
                }, 400)
            },
            afterEnter(el) {
                el.style.height = 'auto'
            },
            leave(el, done) {
                let {height} = el.getBoundingClientRect()
                el.style.height = `${height}px`
                el.getBoundingClientRect()
                el.style.height = 0
                setTimeout(() => {
                    done()
                }, 400)
            },
            afterLeave(el) {
                el.style.height = 'auto'
            },
            close() {
                if (this.menu.vertical) return
                this.visible = false
            },
            showPop(e) {
                if (this.menu.vertical) e.stopPropagation()
                this.visible = !this.visible

            },
            updatePath() {
                this.menu.namePath.unshift(this.name)
                this.$parent.updatePath && this.$parent.updatePath()
                if (!this.menu.vertical) {
                    this.close()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.fade-enter-active, .fade-leave-active {
		transition: all .3s;
		opacity: 1;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	
	.sub-menu-wrapper {
		position: relative;
		
		.popover-wrapper {
			min-width: 8em;
			background: #fff;
			box-shadow: 0 0 3px rgba(0, 0, 0, .2);
			border-radius: $border-radius;
			position: absolute;
			z-index: 10;
			margin-top: 6px;
			/*垂直popover*/
			&.vertical {
				box-shadow: none;
				position: static;
				border-radius: 0;
				margin: 0;
				overflow: hidden;
			}
			
			.menu-item {
				&.active {
					background: $menu-selected-bg;
				}
				
				&::before {
					display: none;
				}
			}
		}
		
		.title {
			padding: 0 24px;
			cursor: default;
			position: relative;
			display: block;
			
			a {
				color: inherit;
				text-decoration: none;
			}
			
			.icon {
				display: none;
			}
			
			&.vertical-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				&:hover {
					svg {
						fill: $active-primary;
					}
				}
				
				&::before {
					display: none;
				}
				
				.icon {
					display: inline-flex;
					transition: transform .3s;
					transform: rotate(180deg);
					
					&.vertical-active {
						transform: rotate(270deg);
					}
				}
			}
			
			&.active {
				color: $active-primary;
			}
			
			&::before {
				content: '';
				transition: .3s all cubic-bezier(.645, .045, .355, 1);
			}
			
			&.active::before {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background: $active-primary;
			}
			
			&:hover {
				color: $active-primary;
				
				&::before {
					content: '';
					display: block;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2px;
					background: $active-primary;
				}
			}
		}
	}
	
	.sub-menu-wrapper {
		.popover-wrapper {
			.sub-menu-wrapper {
				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 24px 0 24px;
					
					.icon {
						display: inline-flex;
						transition: transform .3s;
						
						&.active {
							transform: rotate(180deg);
						}
						
						svg {
							fill: $light-gray-color;
						}
					}
					
					&.active {
						color: $active-primary;
					}
					
					&:hover {
						svg {
							fill: $active-primary;
						}
					}
					
					&.vertical-item {
						.icon {
							transition: transform .3s;
							transform: rotate(180deg);
							
							&.vertical-active {
								transform: rotate(270deg);
							}
						}
					}
				}
			}
			
			.title.active {
				color: inherit;
				
				&::before {
					display: none;
				}
				
				&:hover {
					color: $active-primary;
				}
			}
			
			.title {
				&::before {
					display: none;
				}
			}
			
			.popover-wrapper {
				left: 100%;
				top: 0;
				margin-left: 4px;
				margin-top: 0;
			}
		}
	}
</style>