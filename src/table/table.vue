<template>
	<div class="v-table-wrapper" ref="wrapper">
		<div class="fixed-wrapper" :style="{'overflow':'auto','height':height+'px'}">
			<table class="v-table" ref="tableInstant" :class="{bordered}">
				<thead :class="{sample}">
				<tr>
					<th v-if="showNum" class="number-index">
						<span>No</span>
					</th>
					<th class="selection" v-if="needSelection">
						<label @click="checkAll">
						<span class="check-box">
							<input type="checkbox" ref="allCheck" :checked="isAllCheck">
						</span>
						</label>
					</th>
					<th v-for="column in columns" :key="column.field"
					    :style="{'width':column.width+'px'}"
					    :class="{'v-table-sorter':orderBy[column.field]}">
						<div class="v-table-th-inner">
						<span class="th-content">
						{{column.name}}
						</span>
							<div class="v-table-order" v-if="orderBy[column.field]" @click="changeOrder(column.field)">
								<v-icon icon-name="triangle-up" :class="{'active': orderBy[column.field] === 'ascend'}"/>
								<v-icon icon-name="triangle-down" :class="{'active': orderBy[column.field] === 'decline'}"/>
							</div>
						</div>
					</th>
					<th v-if="$scopedSlots.default && $scopedSlots.default().length > 0" class="actions" ref="actionsHeader">
						操作
					</th>
				</tr>
				</thead>
				<tbody :class="{stripe,sample}" ref="tBody">
				<tr v-for="(item,index) in dataSource" :key="item.key">
					<td v-if="showNum" class="number-index">
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
						<td v-for="column in columns" :key="column.field" :style="{'width':column.width+'px'}">
						<span class="td-content">
							{{item[column.field]}}
						</span>
						</td>
					</template>
					<template v-if="$scopedSlots.default && $scopedSlots.default().length > 0">
						<td class="actions">
							<div class="operate-wrapper" ref="actions">
								<slot :item="item"></slot>
							</div>
						</td>
					</template>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="table-loading-wrapper" :class="{'loadings': isLoading}" v-if="isLoading">
			<v-icon icon-name="table-loading" :class="{'spin-animation':isLoading}"/>
		</div>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    export default {
        name: "v-table",
        data() {
            return {
                isAllCheck: false,
                isLoading: false
            }
        },
        mounted() {
            this.fixedHeader()
            if (this.$scopedSlots.default && this.$scopedSlots.default().length > 0) {
                this.calcActions()
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
            bordered: {
                type: Boolean,
                default: false
            },
            height: {
                type: Number,
            },
            orderBy: {
                type: Object,
                default: () => ({})
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
            calcActions() {
                const action = this.$refs.actions[0]
                const {width} = action.getBoundingClientRect()
                //32 为左右padding 2为border
                action.parentNode.style.width = width + 32 + 2 + 'px'
                if (this.height) {
                    if (this.$refs.tBody.getBoundingClientRect().height > this.height && this.bordered) {
                        this.$refs.actionsHeader.style.width = width + 32 + 2 + 15 + 'px'
                    } else if (this.bordered) {
                        this.$refs.actionsHeader.style.width = width + 32 + 2 + 'px'
                    } else {
                        this.$refs.actionsHeader.style.width = width + 32 + 'px'
                    }
                } else if (this.bordered) {
                    this.$refs.actionsHeader.style.width = width + 32 + 2 + 'px'
                } else {
                    this.$refs.actionsHeader.style.width = width + 32 + 'px'
                }
            },
            fixedHeader() {
                const wrapper = this.$refs.wrapper
                const real = this.$refs.tableInstant
                const fake = real.cloneNode(false)
                const tHead = real.children[0]
                this.table2 = fake
                fake.classList.add('copy-table')
                fake.appendChild(tHead)
                //先放进也没后才可获取到高度
                wrapper.appendChild(fake)
                let {height} = tHead.getBoundingClientRect()
                wrapper.style.paddingTop = height + 'px'
            },
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
		table {
			display: table;
			margin: auto;
			
			td, th {
				border: none;
			}
		}
		position: relative;
		.copy-table {
			position: absolute;
			top: 0;
			width: 100%;
		}
		.v-table {
			width: 100%;
			text-align: left;
			border-collapse: separate;
			border-spacing: 0;
			color: $base-font-color;
			
			&.bordered {
				border-top: 1px solid $gray-border;
				border-right: 1px solid $gray-border;
				border-top-left-radius: $border-radius;
				border-top-right-radius: $border-radius;
				th, td {
					border-left: 1px solid $gray-border;
				}
			}
			thead, tbody {
				.actions {
					text-align: center;
					
					.operate-wrapper {
						display: inline-block;
					}
				}
				.number-index {
					width: 60px;
					text-align: center;
				}
			}
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
				transition: background .3s ease;
				&:first-child, &:last-child {
					border-top-left-radius: $border-radius;
				}
			}
			
			.selection {
				width: 60px;
				text-align: center;
				label {
					input[type="checkbox"] {
						cursor: pointer;;
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
					width: 10px;
					height: 10px;
					&.active {
						fill: $active-primary;
					}
				}
			}
			
			&-sorter {
				user-select: none;
				
				&:hover {
					background: rgb(235, 235, 235);
				}
			}
		}
		.table-loading-wrapper {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 2;
			
			&.loadings {
				background: rgba(255, 255, 255, .4);
			}
			
			.spin-animation {
				animation: spin infinite linear .8s;
			}
			
			svg {
				position: absolute;
				width: 2.5em;
				height: 2.5em;
				top: 50%;
				left: 50%;
				margin-left: -1.5em;
				margin-top: -1.5em;
			}
		}
	}
</style>