---
title: Datepicker 日期选择框
---
# Datepicker 日期选择框
输入或选择日期的控件
### 说明
> @update:prop ="expr"的写法 使用时换为.sync修饰符 
### 基本用法
::: demo

<template>
    <v-date @on-change="getData" @update:value="selectDate = $event" :value="selectDate"></v-date>
</template>

<script>
import vDate from '../../src/datepicker/datepicker'
export default {
    data(){
        return {selectDate:new Date()}
    },
    methods:{
       getData(){alert('geting data')} 
    },
    components: {
        vDate
    },
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| value  | 日期对象初始值 | Date Object/yyyy-mm-dd |- | - |
### 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| on-change  | 选中后触发 | Function |-| - |
