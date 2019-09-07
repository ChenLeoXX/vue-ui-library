<template>
	<div class="sub-menu-wrapper" v-click-outside="close">
		<span class="title" :class="{'active':selected || active}" @click="showPop">
			<slot name="title"></slot>
		</span>
		<div class="popover-wrapper" v-show="visible">
			<slot></slot>
		</div>
	</div>
</template>
<script>
    import clickOutside from '../click-outside'
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
            close() {
                this.visible = false
            },
            showPop() {
                this.visible = !this.visible
            },
            updatePath() {
                this.menu.namePath.unshift(this.name)
                this.$parent.updatePath && this.$parent.updatePath()
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.sub-menu-wrapper {
		position: relative;

		.popover-wrapper {
			min-width: 8em;
			background: #fff;
			box-shadow: 0 0 3px rgba(0, 0, 0, .2);
			border-radius: $border-radius;
			position: absolute;
			margin-top: 6px;
			
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
			padding: 0 2em;
			cursor: default;
			position: relative;
			display: block;
			
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
				.title.active {
					color: inherit;
					
					&::before, &:hover::before {
						display: none;
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
					
					.title {
						&:hover::before {
							display: none;
						}
					}
				}
			}
		}
	}
</style>