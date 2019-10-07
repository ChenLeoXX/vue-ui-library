---
title: Input 输入框
---
# Input 输入框
键盘输入内容，是最基础的表单组件.
### 基本用法
支持v-model、禁用、只读、错误状态、等
::: demo

<template>
    <v-input v-model="p"></v-input>
    <p>{{p}}</p>  
    <div style="padding:10px 0;">
        <p>状态</p>
        <v-input placeholder="disabled" disabled></v-input>
        <v-input placeholder="readonly" readonly></v-input>
        <v-input placeholder="error" error="输入错误"></v-input>
        <p>图标</p>
        <v-input placeholder="error" left-icon="user"></v-input>
        <p></p>
        <v-input placeholder="error" left-icon="password"></v-input>
        <p>大小</p>
        <v-input placeholder="error" left-icon="password"></v-input>
        <v-input placeholder="error" right-icon="clear" size="s"></v-input>
        <v-input placeholder="error" right-icon="search" size="l"></v-input>
    </div>
</template>

<script>
import vInput from '../../src/basic/v-input'
export default {
    data(){
        return {p:'Hello World'}
    },
    components: {
        vInput
    },
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| size  | 大小 | String | s/m/l | m |
| left-icon  | 左边图标 | String | - | - |
| right-icon  | 右边图标 | String | - | - |
| error  | 错误信息/状态 | String | - | - |
| disabled  | 禁用 | Boolean | - | false|
| readonly  | 只读 | Boolean | - | false|
### 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| blur  | 失去焦点 | Function |-| - |
| focus  | 聚焦 | Function | - | - |
| change  | 修改 | Function | - | - |
| input  | 输入 | Function | - | - |
| click  | 点击 | Function | - | - |

