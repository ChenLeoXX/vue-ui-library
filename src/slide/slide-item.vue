<template>
	<transition name="slide">
		<div class="v-slide-item" v-if="visible" @click="onClick" :class="{reverse}" ref="slideItem">
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
                reverse: false
            }
        },
        methods: {
            onClick(e) {
                let slideItem = this.$refs.slideItem
                if (slideItem && slideItem.contains(e.target)) {
                    this.$emit('on-item-click', this.name)
                }
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
		transform: translate3d(100%, 0, 0);
	}
	
	.slide-leave-to {
		transform: translate3d(-100%, 0, 0);
	}
	
	.slide-enter.reverse {
		transform: translate3d(-100%, 0, 0);
	}
	
	.slide-leave-to.reverse {
		transform: translate3d(100%, 0, 0);
	}
	.slide-leave-active {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.slide-enter-active, .slide-leave-active {
		transition: all 1s;
	}
	
	.v-slide-item {
	
	}
</style>