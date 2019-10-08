<template>
	<div class="menu-item" :class="{active,'vertical-item':menu.vertical}" @click.stop="onItemClick">
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
        computed: {
            selected() {
                return this.menu.namePath.indexOf(this.name) >= 0
            }
        },
        mounted() {
            this.menu.add(this)
        },
        methods: {
            onItemClick() {
                this.menu.namePath = []
                this.$parent.updatePath && this.$parent.updatePath()
                this.$emit('add:item', this.name)
                this.menu.$emit('on-item-click', this.name)
            }
        },
        inject: ['menu']
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.menu-item {
		box-sizing: border-box;
		padding: 0 24px;
		cursor: default;
		position: relative;
		border-radius: $border-radius;
		a {
			color: inherit;
			text-decoration: none;
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
		
		/*垂直样式*/
		&.vertical-item {
			&.active {
				background: $menu-selected-bg;
			}
			
			&::after {
				content: '';
				transition: .3s all cubic-bezier(.645, .045, .355, 1);
			}
			
			&.active::after {
				content: '';
				display: block;
				position: absolute;
				right: 0;
				top: 0;
				width: 4px;
				height: 100%;
				background: $active-primary;
			}
		}
	}
</style>