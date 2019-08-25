<template>
	<div class="demo">
		<!--		<v-cascader :source.sync="source" :selected.sync="selected" v-slot="{result}"-->
		<!--		            :load-data="loadData"-->
		<!--		>-->
		<!--		</v-cascader>-->
		<!--		<div>-->
		<!--			<v-button :is-loading="true" type="primary">按钮</v-button>-->
		<!--		</div>-->
		<slide :selected.sync="choose" :auto-play="true">
			<slide-item name="1" @on-item-click="slideClick">
				<div class="box">1</div>
			</slide-item>
			<slide-item name="2">
				<div class="box">2</div>
			</slide-item>
			<slide-item name="3">
				<div class="box">3</div>
			</slide-item>
		</slide>
	</div>
</template>
<script>
    import db from './db'
    import cascader from './cascader'
    import vButton from './button'
    import slideItem from './slide-item'
    import slide from './slide'
    export default {
        name: 'demo',
        components: {
            'v-cascader': cascader,
            vButton,
            slide,
            slideItem
        },
        data() {
            return {
                db: db,
                selected: [],
                source: [],
                choose: '3'
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
            },
            slideClick(name) {
                console.log(name)
            },
        },
        created() {
            this.ajax().then(res => {
                this.source = res
            })
        },
        mounted() {
            // setTimeout(()=>{
            //     this.choose = '2'
            // },3000)
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
	
	.box {
		width: 300px;
		height: 200px;
		background: gray;
		border: 1px solid red;
	}
</style>