---
title: Cascader 级联选择
---
# Cascader 级联选择
级联选择框。
- 从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
### 基本用法
::: demo

<template>
    <v-cascader :source.sync="source" :selected.sync="selected"
                :load-data="loadData"
    >
    </v-cascader>
</template>

<script>
import db from '../../tests/fixture/db'
import vCascader from '../../src/cascader/cascader'
export default {
    data(){
        return {
            selected: [],
            source: null,
        }
    },
    created() {
        this.ajax().then(res => {
            this.source = res
        })
    },    
    methods:{
        //模拟请求
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
       loadData({id}, cb) {
           this.ajax(id).then(res => {
               cb(res)
           })
       }, 
    },
    components: {
        vCascader
    },
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| source  |初始化数据 | Array |- | - |
| selected  |选择的数据(使用.sync绑定) | Array |- | - |
### 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| load-data  | 选中后的回调 | Function |-| - |
