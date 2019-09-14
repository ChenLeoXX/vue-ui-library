<template>
	<div class="v-pagenation" v-if="!isNeedHide">
		<span class="v-pagenation-item prev" :class="{disabled:current===1}" @click="go(current-1)">
			<template v-if="!prevText">
				<v-icon icon-name="left"></v-icon>
			</template>
			<template v-else>
				{{prevText}}
			</template>
		</span>
		<template v-for="n in resolvePage">
			<template v-if="n==='•••'">
				<span class="separator">
					•••
				</span>
			</template>
			<template v-else>
				<span class="v-pagenation-item" :class="{'current':n===current}" @click="go(n)">
					{{n}}
				</span>
			</template>
		</template>
		<span class="v-pagenation-item next" :class="{disabled: current===total}" @click="go(current+1)">
				<template v-if="!nextText">
				<v-icon icon-name="right"></v-icon>
			</template>
			<template v-else>
				{{nextText}}
			</template>
		</span>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    export default {
        name: "pagenation",
        components: {
            vIcon
        },
        props: {
            prevText: {
                type: String
            },
            nextText: {
                type: String
            },
            total: {
                type: Number,
                required: true,
                validator(value) {
                    return value > 0
                }
            },
            current: {
                type: Number,
                required: true,
                validator(value) {
                    return value > 0
                }
            },
            hideWhenOne: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            unique(arr) {
                let obj = {}
                arr.forEach(item => {
                    obj[item] = true
                })
                return Object.keys(obj).map(item => parseInt(item, 10))
            },
            go(p) {
                if (p >= 1 && p <= this.total) {
                    this.$emit('update:current', p)
                }
            },
        },
        computed: {
            resolvePage() {
                let initArr = [1, this.total, this.current, this.current - 1, this.current - 2, this.current - 3, this.current + 1, this.current + 2, this.current + 3]
                return this.unique(initArr)
                    .filter(item => item > 0 && item <= this.total)
                    .sort((a, b) => a - b)
                    .reduce((init, cur, inx, arr) => {
                        init.push(cur)
                        //间隔大于1出现省略
                        if (arr[inx + 1] - arr[inx] > 1) {
                            init.push('•••')
                        }
                        return init
                    }, [])
            },
            isNeedHide() {
                return this.total === 1 && this.hideWhenOne
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.v-pagenation {
		user-select: none;
		display: flex;
		align-items: center;
		&-item {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			line-height: 32px;
			height: 32px;
			min-width: 32px;
			border: 1px solid $gray-border;
			border-radius: $border-radius;
			font-size: 14px;
			padding: 0 6px;
			margin-right: 8px;
			cursor: pointer;
			
			&:hover {
				transition: color, border 0.2s;
				color: $active-primary;
				border-color: $active-primary;
				
				svg {
					fill: currentColor;
				}
			}
			
			&.current {
				color: $active-primary;
				border-color: $active-primary;
				cursor: default;
			}
			
			&.prev, &.next {
				&.disabled {
					cursor: not-allowed;
					color: rgba(0, 0, 0, 0.25);
					border-color: $disabled-color;
					
					svg {
						fill: currentColor;
					}
				}
				
				svg {
					margin: 0;
				}
			}
			
			&.next {
				margin-right: 0;
			}
		}
		
		.separator {
			color: $gray-border;
			font-size: 12px;
			margin-right: 8px;
		}
	}
</style>