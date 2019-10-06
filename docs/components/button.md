---
title: Button
---

# 基础
## Button 按钮
### 类型按钮
基础按钮,点击触发事件
::: demo

<template>
    <v-button>Click me!</v-button>
    <v-button type="primary">Primary</v-button>
    <v-button type="warn">Warn</v-button>
    <v-button type="error">Dangerous</v-button>
    <v-button type="success">Success</v-button>
</template>

<script>
import Button from '../../src/basic/button'
export default {
    components: {
        'v-button': Button,
        'v-icon':Icon
    }
}
</script>
:::

### 形状图标
::: demo

<template>
    <v-button shape="circle" type="primary" icon="search"></v-button>
    <v-button shape="round">圆角矩形</v-button>
    <v-button shape="round" :is-loading="isLoading" type="success" icon="settings" icon-position="right">加载中</v-button>
    <v-button @click="stopLoading">Toogle</v-button>
</template>

<script>
import Button from '../../src/basic/button'
export default {
    data(){
        return {
            isLoading:true,
        }
    },
    methods:{
        stopLoading(){
        this.isLoading = !this.isLoading
        }
    },
    components: {
        'v-button': Button,
    }
}
</script>
:::
### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| type | 按钮类型 | String | primary/warn/success/error | - |
| shape | 按钮形状 | String | round/circle | - |
| icon  | 图标  | String | - | - |
| is-loading  | 加载状态  | Boolean | - | - |