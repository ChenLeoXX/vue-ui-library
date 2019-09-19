<template>
	<div class="v-table-wrapper">
		<table class="v-table">
			<thead>
			<tr>
				<th v-if="showNum">
					<span>No</span>
				</th>
				<th class="selection">
					<label>
						<input type="checkbox">
					</label>
				</th>
				<th v-for="item in columns" :key="item.field">
					<span class="th-content">
						{{item.name}}
					</span>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item,index) in dataSource" :key="item.key">
				<td v-if="showNum">
					<span class="td-content">
						{{index+1}}
					</span>
				</td>
				<td class="selection">
					<label>
						<input type="checkbox">
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
    export default {
        name: "v-table",
        data() {
            return {}

        },
        props: {
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
			
			tbody {
				tr {
					transition: all .3s;
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
				background: #fafafa;
				font-weight: 500;
				
				&:first-child, &:last-child {
					border-top-left-radius: $border-radius;
				}
			}
			
			.selection {
				width: 60px;
				text-align: center;
				
				input[type="checkbox"] {
					width: 16px;
					height: 16px;
					margin: 0;
				}
			}
		}
	}
</style>