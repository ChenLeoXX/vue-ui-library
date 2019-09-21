<template>
	<div class="v-table-wrapper">
		<table class="v-table">
			<thead :class="{sample}">
			<tr>
				<th v-if="showNum">
					<span>No</span>
				</th>
				<th class="selection" v-if="needSelection">
					<label @click="checkAll">
						<span class="check-box">
							<input type="checkbox" ref="allCheck" :checked="isAllCheck">
						</span>
					</label>
				</th>
				<th v-for="item in columns" :key="item.field">
					<div class="v-table-th-inner">
						<span class="th-content">
						{{item.name}}
						</span>
						<div class="v-table-order" v-if="orderBy[item.field]" @click="changeOrder(item.field)">
							<v-icon icon-name="triangle-up" :class="{'active': orderBy[item.field] === 'ascend'}"/>
							<v-icon icon-name="triangle-down" :class="{'active': orderBy[item.field] === 'decline'}"/>
						</div>
					</div>
				</th>
			</tr>
			</thead>
			<tbody :class="{stripe,sample}">
			<tr v-for="(item,index) in dataSource" :key="item.key">
				<td v-if="showNum">
					<span class="td-content">
						{{index+1}}
					</span>
				</td>
				<td class="selection" v-if="needSelection">
					<label @click="onChecked(item,$event)">
						<span class="check-box">
							<input type="checkbox" :checked="isChecked(item)">
						</span>
					</label>
				</td>
				<template>
					<td v-for="head in columns" :key="head.field">
						<span class="td-content">
							{{item[head.field]}}
						</span>
					</td>
				</template>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    export default {
        name: "v-table",
        data() {
            return {
                isAllCheck: false
            }
        },
        watch: {
            'selectedItems': {
                handler(newVal) {
                    if (this.dataSource.length === newVal.length) {
                        this.isHalfCheck(false)
                        this.isAllCheck = true
                    } else if (newVal.length > 0) {
                        this.isHalfCheck(true)
                    } else {
                        this.isHalfCheck(false)
                        this.isAllCheck = false
                    }
                },
                immediate: true
            },
        },
        props: {
            orderBy: {
                type: Object
            },
            needSelection: {
                type: Boolean,
                default: true
            },
            sample: {
                type: Boolean,
                default: false
            },
            stripe: {
                type: Boolean,
                default: false
            },
            showNum: {
                type: Boolean,
                default: false
            },
            selectedItems: {
                type: Array,
                default: () => []
            },
            //表头
            columns: {
                type: Array,
                required: true
            },
            dataSource: {
                type: Array,
                required: true,
                validator(val) {
                    return val.every(item => item.key !== undefined)
                }
            }
        },
        methods: {
            changeOrder(key) {
                let copy = JSON.parse(JSON.stringify(this.orderBy))
                let val = copy[key]
                switch (val) {
                    case 'ascend':
                        copy[key] = 'decline'
                        break;
                    case 'decline':
                        copy[key] = true
                        break
                    case true:
                        copy[key] = 'ascend'
                        break
                }
                this.$emit('update:orderBy', copy)
            },
            checkAll(e) {
                let isCheck = e.target.checked
                if (isCheck) {
                    let duplicate = JSON.parse(JSON.stringify(this.dataSource))
                    this.$emit('update:selectedItems', duplicate)
                } else {
                    this.$emit('update:selectedItems', [])
                    this.isAllCheck = false
                }
            },
            isHalfCheck(bol) {
                this.$nextTick(() => {
                    this.$refs.allCheck && (this.$refs.allCheck.indeterminate = bol)
                })
            },
            isChecked(td) {
                return this.selectedItems.find(item => item.key === td.key) !== undefined
            },
            onChecked(td, e) {
                let isCheck = e.target.checked
                let duplicate = JSON.parse(JSON.stringify(this.selectedItems))
                if (isCheck) {
                    duplicate.push(td)
                } else {
                    let ind = duplicate.findIndex(item => item.key === td.key)
                    duplicate.splice(ind, 1)
                }
                this.$emit('update:selectedItems', duplicate)
            },
        },
        components: {
            vIcon
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	.v-table-wrapper {
		.v-table {
			width: 100%;
			text-align: left;
			border-collapse: separate;
			border-spacing: 0;
			color: $base-font-color;
			
			thead {
				&.sample {
					th {
						padding: 6px
					}
				}
			}
			tbody {
				&.sample {
					td {
						padding: 6px;
					}
				}
				&.stripe {
					tr:nth-child(even) {
						td {
							background: $th-bg;
						}
					}
				}
				tr:hover {
					td {
						background: $td-hover;
					}
				}
			}
			
			td, th {
				border-bottom: 1px solid $gray-border;
				padding: 16px;
				background: #fff;
			}
			
			th {
				color: rgba(0, 0, 0, .85);
				background: #fafafa;
				font-weight: 500;
				
				&:first-child, &:last-child {
					border-top-left-radius: $border-radius;
				}
			}
			
			.selection {
				width: 60px;
				text-align: center;
				
				label {
					input[type="checkbox"] {
						cursor: pointer;
						width: 16px;
						height: 16px;
						margin: 0;
						
						&:hover {
							border: 1px solid $active-primary;
						}
					}
				}
			}
			
			&-th-inner {
				display: flex;
				align-items: center;
			}
			
			&-order {
				display: inline-flex;
				flex-direction: column;
				margin-left: 5px;
				
				svg {
					margin: 0;
					cursor: pointer;
					fill: rgb(191, 191, 191);
					width: 12px;
					height: 12px;
					
					&.active {
						fill: $active-primary;
					}
				}
			}
		}
	}
</style>