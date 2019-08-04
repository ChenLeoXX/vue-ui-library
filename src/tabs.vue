<template>
	<div class="tabs">
		<slot></slot>
	</div>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "tabs",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                },
            }
        },
        data() {
            return {
                eventHub: new Vue(),
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.eventHub.$emit('update:selectName', this.selected)
            }
        },
        provide() {
            return {
                eventHub: this.eventHub
            }
        }
    }
</script>

<style lang="scss" scoped>
	.tabs {
	
	}
</style>