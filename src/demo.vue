<template>
	<div class="demo">
		<!--				<v-cascader :source.sync="source" :selected.sync="selected" v-slot="{result}"-->
		<!--				            :load-data="loadData"-->
		<!--				>-->
		<!--				</v-cascader>-->
		<!--		<div>-->
		<!--			<v-button :is-loading="true" type="primary">按钮</v-button>-->
		<!--		</div>-->
		<!--		<slide :selected.sync="choose" :auto-play="true">-->
		<!--			<slide-item name="A" @on-item-click="slideClick">-->
		<!--				<div class="box">-->
		<!--					<h1>1</h1>-->
		<!--				</div>-->
		<!--			</slide-item>-->
		<!--			<slide-item name="B" @on-item-click="slideClick">-->
		<!--				<div class="box">-->
		<!--					<h1>2</h1>-->
		<!--				</div>-->
		<!--			</slide-item>-->
		<!--			<slide-item name="C" @on-item-click="slideClick">-->
		<!--				<div class="box">-->
		<!--					<h1>3</h1>-->
		<!--				</div>-->
		<!--			</slide-item>-->
		<!--		</slide>-->
		<!--				<v-menu :active.sync="active">-->
		<!--					<menu-item name="home">首页</menu-item>-->
		<!--					<menu-item name="team">团队</menu-item>-->
		<!--					<menu-item name="about">关于</menu-item>-->
		<!--					<sub-menu name="products">-->
		<!--						<template slot="title">产品</template>-->
		<!--						<menu-item name="software">软件</menu-item>-->
		<!--						<menu-item name="hardware">硬件</menu-item>-->
		<!--						<sub-menu name="service">-->
		<!--							<template slot="title">服务</template>-->
		<!--							<menu-item name="maintain">维修</menu-item>-->
		<!--							<menu-item name="delivery">送货</menu-item>-->
		<!--						</sub-menu>-->
		<!--					</sub-menu>-->
		<!--				</v-menu>-->
		<v-menu :active.sync="active" vertical @on-item-click="x">
			<menu-item name="home">
				<a href="http://google.com" target="_blank">谷歌</a>
			</menu-item>
			<sub-menu name="team">
				<template slot="title">
					<a href="http://baidu.com" target="_blank">百度</a>
				</template>
				<menu-item name="evan">尤雨溪</menu-item>
				<menu-item name="jack">jack</menu-item>
			</sub-menu>
			<menu-item name="about">关于</menu-item>
			<sub-menu name="products">
				<template slot="title">产品</template>
				<menu-item name="software">软件</menu-item>
				<menu-item name="hardware">硬件</menu-item>
				<sub-menu name="service">
					<template slot="title">服务</template>
					<menu-item name="maintain">维修</menu-item>
					<menu-item name="delivery">送货</menu-item>
					<sub-menu name="大区">
						<template slot="title">大区</template>
						<menu-item name="祖安">祖安</menu-item>
					</sub-menu>
				</sub-menu>
			</sub-menu>
		</v-menu>
	</div>
</template>
<script>
    import db from '../tests/fixture/db'
    import cascader from './cascader/cascader'
    import vButton from './basic/button'
    import slideItem from './slide/slide-item'
    import slide from './slide/slide'
    import vMenu from './menu/menu'
    import menuItem from './menu/menu-item'
    import subMenu from './menu/sub-menu'
    import vIcon from './basic/v-icon'
    export default {
        name: 'demo',
        components: {
            vMenu,
            menuItem,
            subMenu,
            'v-cascader': cascader,
            vButton,
            slide,
            slideItem,
            vIcon
        },
        data() {
            return {
                db: db,
                selected: [],
                source: [],
                choose: 'A',
                active: 'home',
            }
        },
        methods: {
            x(name) {
                console.log(name)
            },
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
<style lang="scss">
	@import "../style/var";
	*, *::before, *::after {
		box-sizing: border-box;
	}
	
	body {
		margin: 0;
		font-size: 14px;
		padding: 50px;
	}
	
	.demo {
		max-width: 700px;
	}
	.box {
		background: $dark-blue;
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
</style>