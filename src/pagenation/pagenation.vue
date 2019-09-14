<template>
	<div class="v-pagenation">
		<template v-for="n in resolvePage">
			<template v-if="n==='•••'">
				<span class="separator">
					•••
				</span>
			</template>
			<template v-else>
				<span class="v-pagenation-item" :class="{'current':n===current}" @click="onClick(n)">
					{{n}}
				</span>
			</template>
		</template>
	</div>
</template>

<script>
    export default {
        name: "pagenation",
        props: {
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
            onClick(p) {
                this.$emit('update:current', p)
            }
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


            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.v-pagenation {
		user-select: none;
		
		&-item {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			line-height: 32px;
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
			}
			
			&.current {
				color: $active-primary;
				border-color: $active-primary;
				cursor: default;
			}
		}
		
		.separator {
			color: $gray-border;
			font-size: 12px;
			margin-right: 8px;
		}
	}
</style>