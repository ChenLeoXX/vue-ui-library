<template>
	<div class="tab-item" @click="onTab" :class="activeClass">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "tab-item",
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
                required: true,
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        inject: ['eventHub'],
        created() {
            this.eventHub.$on('update:selectName', (name) => {
                this.active = name === this.name;
            })
        },
        methods: {
            onTab() {
                this.eventHub.$emit('update:selectName', this.name)
            }
        }
    }
</script>

<style lang="scss" scoped>
	.tab-item {
		padding: 0.5em 2.5em;
		border: 1px solid lightgreen;
		
		&.active {
			background: lightcoral;
		}
		
		> .actions-wrapper {
			margin-left: auto;
		}
	}
</style>