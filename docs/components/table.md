---
title: Table 表格
---

# Table 表格
展示行列数据
- 支持勾选,半选,插入操作列.
- 固定表头
- 表头排序,异步加载
### 基本用法
::: demo

<template>
    <v-table :selected-items.sync="tableSelected" :data-source="tableData" :columns="tableHead" :need-selection="false" stripe show-num>
    </v-table>
    <h3>简化</h3>
    <v-table :selected-items.sync="tableSelected" :data-source="tableData" :columns="tableHead" sample 
    show-num
     >
    </v-table>
    <h3>表头排序</h3>
    <p>第一次点击为降序,第二次升序,第三次恢复默认</p>
    <v-table :selected-items.sync="tableSelected" :data-source="tableData" :columns="tableHead"
                 :order-by.sync="orderBy" ref="table" show-num :stripe="true" bordered
      >
    </v-table>
    <h3>固定表头</h3>
    <p>超过指定的高度后固定表头</p>
    <v-table :selected-items.sync="tableSelected" :data-source="tableData" :columns="tableHead"
     :height="350" show-num :stripe="true" bordered
      >
    </v-table>
    <h3>插入操作列</h3>
    <v-table :selected-items.sync="tableSelected" :data-source="tableData" :columns="tableHead"
      show-num :stripe="true" bordered
     >
        <template v-slot="{item}">
            <v-button @click="check(item)">查看</v-button>
            <v-button>删除</v-button>
        </template>
     </v-table>        
</template>

<script>
import vButton from '../../src/basic/button'
import vTable from '../../src/table/table'
export default {
//模拟异步加载排序
    watch: {
        orderBy() {
            this.$refs.table.isLoading = true
            setTimeout(() => {
                this.$refs.table.isLoading = false
            }, 3000)
        }
    },
    data(){
        return {
            orderBy: {
                heroName: true,
                superAbility: true
            },
            tableSelected: [{heroName: '蜘蛛侠', superAbility: '蜘蛛感应', key: 2},
                {heroName: '雷神', superAbility: '风暴战斧', key: 3},
                {heroName: '绿巨人', superAbility: '超恢复', key: 4},
                {heroName: '奇异博士', superAbility: '空间传送', key: 5},],
            tableData: [
                {heroName: '钢铁侠', superAbility: '钞能力', key: 1},
                {heroName: '蜘蛛侠', superAbility: '蜘蛛感应', key: 2},
                {heroName: '雷神', superAbility: '风暴战斧', key: 3},
                {heroName: '绿巨人', superAbility: '超恢复', key: 4},
                {heroName: '奇异博士', superAbility: '空间传送', key: 5},
                {heroName: '黑寡妇', superAbility: '枪械', key: 6},
                {heroName: '鹰眼', superAbility: '弓箭', key: 7},
                {heroName: '美国队长', superAbility: '振金盾', key: 8},
            ],
            tableHead: [{name: '英雄名', field: 'heroName', width: 150}, {name: '超能力', field: 'superAbility'}]
        }
    },
    methods:{
      check(){
        alert('check it')
      },
    },
    components: {
        vTable,
        vButton
    }
}
</script>
:::
### 属性
>注意`data-source`参数必须带有一个唯一的`key`字段, 其他字段的key必须与 `columns`字段中的`field`
保持一致.
 
> `columns`参数需要带有一个`width` 字段指定表头宽度,否则可能出现无法对齐的情况,最后一列
 可省略,name 为表头显示值,`field`对应 表格内容.
  
>表头排序返回一个可排序的表头对象,可通过`watch` `order-by`并获取实例`refs` 切换`isLoading`状态

> 默认插槽需要使用`template`标签包裹,使用 `v-slot` 获取操作的item,传入方法中.

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| data-source | 表格内容(必填) | Array | - | - |
| columns | 表头(必填) | Array | - | - |
| order-by | 可排序表头(使用.sync绑定) | Object | - | - |
| show-num | 是否显示列表序号 | Boolean | - | false |
| need-selection | 是否可勾选 | Boolean | - | true |
| selected-items | 已勾选表格数组(使用.sync绑定) | Array | - | [] |
| stripe | 是否条纹显示 | Boolean | - | false |
| bordered | 是否显示边框 | Boolean | - | false |
### 插槽
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| 默认插槽 | 插入一个操作列 | - | - | - |
