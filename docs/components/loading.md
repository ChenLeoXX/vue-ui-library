---
title: Loading 加载进度
---

# Loading 加载进度
对用户的加载交互,给出反馈.
### 基本用法
::: demo

<template>
    <v-button @click="start">开始加载</v-button>
    <v-button @click="finish">完成加载</v-button>
    <v-button @click="error">加载错误</v-button>
    <v-button @click="custom">自定义样式</v-button>
</template>

<script>
import vButton from '../../src/basic/button'
import vLoading from '../../src/loading/loading-plugin'
import vue from 'vue'
vue.use(vLoading)
export default {
    components: {
        vButton
    },
    methods:{
        start(){
            this.$loading.start()
        },
        finish(){
            this.$loading.finish()
        },
        error(){
            this.$loading.error()
        },
        custom(){
            this.$loading.config({
                color:'#3eaf7c'
            })
            this.$loading.start()
        },
    }
}
</script>
:::
### 属性
> 通过 config 方法进行样式配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| height | 进度条高度, | Number | - | 3 |
| color | 进度条颜色 | String | - | - |
| background | 进度条背景颜色, | String | - | - |
| failedColor | 错误时进度条颜色, | String | - | - |

###方法
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| start | 创建进度条 | Function | - | - |
| error | 加载错误 | Function | - | - |
| finish | 加载完成 | Function | - | - |
| config | 配置进度条样式 | Function | - | - |