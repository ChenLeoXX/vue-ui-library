<template>
	<button class="v-button"
	        :class="{[type]:true,[`icon-position-${iconPosition}`]:iconPosition,[shape]:shape,'only-icon':!$slots.default}"
	        @click="$emit('click')"
	>
		<v-icon :icon-name="icon" v-if="icon && !isLoading"></v-icon>
		<v-icon :class="{'loading':isLoading}" icon-name="loading" v-if="isLoading"></v-icon>
		<div class="content" v-if="$slots.default">
			<slot></slot>
		</div>
	</button>
</template>
<script>
    import vIcon from './v-icon';
    export default {
        props:{
            isLoading:{
                type:Boolean,
                default:false
            },
            icon:{
                type:String,
            },
            shape: {
                type: String,
            },
            type:{
                type:String,
                default:'default'
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value){
                    return (value !== 'left' || value !== 'right')
                }
            },
        },
        methods:{
            testJump(){
            }
        },
        components:{
            vIcon,
        }
    }
</script>
<style lang="scss" scoped>
	@import "../../style/var";
	.v-icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	.loading {
		animation: spin 0.8s linear infinite;
	}
	.v-button {
		display: inline-flex;
		align-items: center;
		vertical-align: top;
		min-height: $button-height;
		font-size: $font-size;
		color: $button-color;
		border-radius: $border-radius;
		padding: 0 1em;
		transition: all .2s ease-in;

		&.icon-position-left {
			.icon-wrapper {
				color: $button-color;
				order: 1;
				margin-right: 0.5em;
			}

			.content {
				order: 2;
			}
		}

		&.icon-position-right {
			.icon-wrapper {
				color: $button-color;
				order: 2;
				margin-left: 0.5em;
			}

			.content {
				order: 1;
			}
		}

		/*类型class*/
		&.primary {
			background-color: $primary;
			border: $primary;
			outline: $primary;
		}

		&.warn {
			background-color: $warn;
			border: $warn;
			outline: $warn;
		}

		&.error {
			background-color: $error;
			border: $error;
			outline: $error;
		}

		&.success {
			background-color: $success;
			border: $success;
			outline: $success;
		}

		&.default {
			background-color: #fff;
			border-width: 1px;
			border-style: solid;
			border-color: #dcdee2;
			outline: none;
			color: $text-color
		}

		&:not(.default):hover {
			opacity: 0.8;
		}

		&.default:hover {
			color: $primary;
			border-color: $primary;
		}

		&.only-icon {
			.v-icon {
				margin: 0;
			}
		}

		/*更大的圆角*/
		&.round {
			border-radius: 3em;
		}

		&.circle {
			border-radius: 50%;
			height: $circle-height;
			width: $circle-width;
			padding: 0;

			.v-icon {
				width: 2.5em;
			}

		}
	}
</style>