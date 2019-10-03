<template>
	<transition name="expand" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
	            @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
		<div class="expand-wrapper" v-show="visible">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
    export default {
        name: "expand",
        data() {
            return {
                elData: {
                    overflow: '',
                    paddingTop: '',
                    paddingBottom: '',
                    paddingLeft: '',
                    paddingRight: ''
                }
            }
        },
        computed: {
            verticalTransition() {
                return `${parseInt(this.duration)}ms height ease-in-out, ${parseInt(this.duration)}ms padding-top ease-in-out, ${parseInt(this.duration)}ms padding-bottom ease-in-out`;
            },
            horizontalTransition() {
                return `${parseInt(this.duration)}ms width ease-in-out, ${parseInt(this.duration)}ms padding-left ease-in-out, ${parseInt(this.duration)}ms padding-right ease-in-out`;
            }
        },
        methods: {
            beforeEnter(el) {
                if (this.horizontal) {
                    el.style.transition = this.horizontalTransition
                    this.elData.paddingLeft = el.style.paddingLeft;
                    this.elData.paddingRight = el.style.paddingRight;
                    el.style.width = 0;
                    el.style.paddingLeft = 0;
                    el.style.paddingRight = 0;
                } else {
                    el.style.transition = this.verticalTransition;
                    this.elData.paddingTop = el.style.paddingTop;
                    this.elData.paddingBottom = el.style.paddingBottom;
                    el.style.height = 0;
                    el.style.paddingTop = 0;
                    el.style.paddingBottom = 0;
                }
            },
            enter(el) {
                this.elData.overflow = el.style.overflow;
                if (this.horizontal) {
                    if (el.scrollWidth !== 0) {
                        el.style.width = el.scrollWidth + 'px'
                    }
                    el.style.paddingLeft = this.elData.paddingLeft;
                    el.style.paddingRight = this.elData.paddingRight;
                } else {
                    if (el.scrollHeight !== 0) {
                        el.style.height = el.scrollHeight + 'px';
                    } else {
                        el.style.height = '';
                    }
                    el.style.paddingTop = this.elData.paddingTop;
                    el.style.paddingBottom = this.elData.paddingBottom;
                }
                el.style.overflow = 'hidden';
            },
            afterEnter(el) {
                el.style.transition = '';
                el.style.overflow = this.elData.overflow;
                this.horizontal ? el.style.width = '' : el.style.height = '';
            },
            beforeLeave(el) {
                this.elData.overflow = el.style.overflow;
                if (this.horizontal) {
                    this.elData.paddingLeft = el.style.paddingLeft;
                    this.elData.paddingRight = el.style.paddingRight;
                    el.style.width = el.scrollWidth + 'px';
                } else {
                    this.elData.paddingTop = el.style.paddingTop;
                    this.elData.paddingBottom = el.style.paddingBottom;
                    el.style.height = el.scrollHeight + 'px';
                }
                el.style.overflow = 'hidden';
            },
            leave(el) {
                if (this.horizontal) {
                    if (el.scrollWidth !== 0) {
                        el.style.transition = this.horizontalTransition;
                        el.style.width = 0;
                        el.style.paddingLeft = 0;
                        el.style.paddingRight = 0;
                    }
                } else {
                    if (el.scrollHeight !== 0) {
                        el.style.transition = this.verticalTransition;
                        el.style.height = 0;
                        el.style.paddingTop = 0;
                        el.style.paddingBottom = 0;
                    }
                }
            },
            afterLeave(el) {
                el.style.transition = '';
                el.style.overflow = this.elData.overflow;
                if (this.horizontal) {
                    el.style.width = ''
                    el.style.paddingLeft = this.elData.paddingLeft;
                    el.style.paddingRight = this.elData.paddingRight;
                } else {
                    el.style.height = '';
                    el.style.paddingTop = this.elData.paddingTop;
                    el.style.paddingBottom = this.elData.paddingBottom;
                }
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            horizontal: {
                type: Boolean,
                default: false
            },
            duration: {
                type: Number,
                default: 400
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>