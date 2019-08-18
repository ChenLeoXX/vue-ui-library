<template>
	<div class="demo">
		<v-cascader :source="source" :selected.sync="selected">
			<v-input></v-input>
		</v-cascader>
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
                source: [{
                    name: '福建',
                    children: [
                        {
                            name: '厦门',
                            children: [
                                {name: '湖里区', children: [],},
                                {name: '思明区', children: []},
                                {name: '集美区', children: []}
                            ]
                        },
                        {
                            name: '福州',
                            children: [
                                {name: '鼓楼区', children: [],},
                                {name: '闽西区', children: []},
                            ]
                        }
                    ]
                },
                    {
                        name: '浙江',
                        children: [
                            {
                                name: '杭州',
                                children: [
                                    {name: '滨江区', children: [],},
                                    {name: '萧山区', children: []},
                                    {name: '拱野区', children: []}
                                ]
                            },
                            {
                                name: '宁波',
                                children: [
                                    {name: '江北区', children: [],},
                                    {name: '镇海区', children: []},
                                ]
                            }
                        ]
                    },
                    {
                        name: '山东',
                        children: [
                            {
                                name: '青岛',
                                children: [
                                    {name: '市南区', children: [],},
                                    {name: '市北区', children: []},
                                ]
                            },
                            {
                                name: '济南',
                                children: [
                                    {name: '天桥区', children: [],},
                                    {name: '长清区', children: []},
                                ]
                            }
                        ]
                    }
                ]
            }
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