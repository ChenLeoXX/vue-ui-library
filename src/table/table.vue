<template>
	<div class="v-table-wrapper">
		<table class="v-table">
			<thead>
			<tr>
				<th v-for="item in columns" :key="item.field">{{item.name}}</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in dataSource" :key="item.key">
				<td>
					<label>
						<input type="checkbox">
					</label>
				</td>
				<template>
					<td v-for="head in columns" :key="head.field">{{item[head.field]}}</td>
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
	.v-table-wrapper {
		.v-table {
			td {
				border: 1px solid red
			}
		}
	}
</style>