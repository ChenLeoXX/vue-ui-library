<template>
	<div class="menu-item" :class="{active}">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "menu-item",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                active: false
            }
        },
        created() {
            this.menu.add(this)
        },
        inject: ['menu']
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.menu-item {
		box-sizing: border-box;
		padding: 0 2em;
		cursor: default;
		position: relative;
		
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
</style>