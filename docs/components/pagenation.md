---
title: Pagenation 分页
---
# Pagenation 分页
数据较多时,展示不同分页内容.
### 说明
> @update:prop ="expr"的写法 可以换为.sync修饰符 
### 基本用法
超出时显示省略,否则全部展示.
::: demo

<template>
    <v-page :total="15" @update:current="page = $event" :current="page" prev-text="上一页" next-text="下一页">
    </v-page>
    <br>
    <v-page :total="5" @update:current="page2 = $event" :current="page2" @on-page-change="getData">
    </v-page>
</template>

<script>
import vPage from '../../src/pagenation/pagenation'
export default {
    data(){
        return {page:2,page2:1}
    },
    components: {
        'v-page': vPage,
    },
    methods:{
      getData(v){
        alert('geting data')
      },
    }
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| total  | 总页数(必填) | Number | - | - |
| current  | 当前页(必填,使用.sync绑定) | Number | - | - |
| prev-text  | 翻页文字 | String | - | - |
| next-text  | 翻页文字 | String | - | - |
| hide-when-one  | 只有一页时隐藏 | Boolean | - | false|
