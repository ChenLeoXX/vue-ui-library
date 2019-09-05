<template>
	<div class="sub-menu-wrapper">
		<span class="title">
			<slot name="title"></slot>
		</span>
		<div class="popover-wrapper" v-show="active">
			<slot></slot>
		</div>
	</div>
</template>
<script>
    export default {
        name: "sub-menu",
        data() {
            return {
                active: true
            }
        },
        props: {
            name: {
                type: String,
                required: true
            }
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
		& .sub-menu-wrapper {
			.popover-wrapper {
				left: 100%;
				top: 0;
				margin-left: 4px;
				margin-top: 0;
			}
			
			.title {
				&:hover::before {
					display: none;
				}
			}
		}
	}
</style>