<template>
	<div class="demo">
		<v-cascader :source.sync="source" :selected.sync="selected" v-slot="{result}"
		            :load-data="loadData"
		>
			<v-input :value="result"></v-input>
		</v-cascader>
		<div>
			{{source}}
		</div>
	</div>
</template>
<script>
    import db from './db'
    import cascader from './cascader'
    import input from './v-input'
    export default {
        name: 'demo',
        components: {
            'v-cascader': cascader,
            'v-input': input
        },
        data() {
            return {
                db: db,
                selected: [],
                source: [],
            }
        },
        methods: {
            /**
             * 模拟后台动态返回节点
             * @param id 回调返回的p_id
             * @param cb 执行回调用的回调
             */
            loadData({id}, cb) {
                this.ajax(id).then(res => {
                    cb(res)
                })
            },
            /**
             *
             * @param id 数据的parent_id
             * @returns {Promise<any>}
             */
            ajax(id = 0) {
                return new Promise((res) => {
                    setTimeout(() => {
                        let arr = db.filter(item => item.parent_id === id)
                        //增加一个判断模拟判断是否有子节点的属性
                        arr.forEach(node => {
                            let withChildArr = db.filter(item => item.parent_id === node.id)
                            node.isLeaf = withChildArr.length <= 0;
                        })
                        res(arr)
                    }, 500)
                })
            }
        },
        created() {
            this.ajax().then(res => {
                this.source = res
            })
        }
    }
</script>
<style>
	*, *::before, *::after {
		box-sizing: border-box;
	}
	
	body {
		margin: 0;
		font-size: 14px;
		padding: 150px;
	}
</style>