<template>
	<div class="tab-pane" v-if="active" :class="activeClass">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "tab-pane",
        inject: ['eventHub'],
        data() {
            return {
                active: false
            }
        },
        computed: {
            activeClass() {
                return {
                    active: this.active
                }
            }
        },
        props: {
            name: {
                type: String | Number,
                required: true
            }
        },
        created() {
            this.eventHub.$on('update:selectName', (name) => {
                this.active = name === this.name;
            })
        }
    }
</script>

<style lang="scss" scoped>
	.tab-pane {
		&.active {
			background: lightblue;
		}
	}
</style>