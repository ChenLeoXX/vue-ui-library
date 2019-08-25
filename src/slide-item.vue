<template>
	<transition name="slide">
		<div class="v-slide-item" v-if="visible" @click="onClick">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
    export default {
        name: "slide-item",
        data() {
            return {
                selected: null,
            }
        },
        methods: {
            onClick() {
                console.log(111)
                this.$emit('on-item-click', this.name)
            }
        },
        props: {
            name: {
                type: String,
                required: true
            },
        },
        computed: {
            visible() {
                return this.selected === this.name
            }
        }
    }
</script>

<style lang="scss" scoped>
	.v-slide-item {
		user-select: none;
	}
	
	.slide-enter {
		transform: translateX(100%);
	}
	
	.slide-leave-to {
		transform: translateX(-100%);
	}
	
	.slide-leave-active {
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.slide-enter-active, .slide-leave-active {
		transition: all 1s;
	}
	
	.v-slide-item {
	
	}
</style>