<template>
	<div class="tab-item" @click="onTab" :class="activeClass">
		<slot></slot>
		<slot name="icon"></slot>
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
                    active: this.active,
                    disable: this.disabled
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
                if (this.disabled) return
                this.eventHub.$emit('update:selectName', this.name, this.$el)
            }
        }
    }
</script>

<style lang="scss" scoped>
	$blue-text: #40a9ff;
	$text-grey: #ddd;
	.tab-item {
		cursor: pointer;
		padding: 0.5em 2em;
		display: flex;
		align-items: center;
		
		&.disable {
			cursor: not-allowed;
			color: $text-grey;
		}
		&.active {
			color: $blue-text;
		}
		
		> .actions-wrapper {
			margin-left: auto;
		}
	}
</style>