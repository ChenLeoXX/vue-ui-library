---
title: Toast 提示
---

# Toast 提示
对全局的用户交互给出提示,或请求响应提示.
### 基本用法
::: demo

<template>
    <v-button @click="toastIt('top')">上</v-button>
    <v-button @click="toastIt('bottom')">下</v-button>
    <v-button @click="toastIt('middle')">中</v-button>
    <v-button @click="closeHandle">手动关闭</v-button>
    <v-button @click="toastHtml">自定义HTML内容</v-button>
    <v-button @click="toast">自定义关闭回调和文字</v-button>
</template>

<script>
import vButton from '../../src/basic/button'
import toast from '../../src/toast/toast-plugin'
import vue from 'vue'
vue.use(toast)
export default {
    components: {
        vButton
    },
    methods:{
        toast(){
            this.$toast('您已欠费!',{
              showPosition:'top',
              closeBtn:{
                text:'充值',
                callback(){
                    alert('充值中...')
                }
              }
            })
        },
        toastIt(pos){
            this.$toast('hello world',{
              showPosition:pos
            })
        },
        toastHtml(){
            this.$toast(`<a href="http://www.baidu.com">去百度</a>`,{
              showPosition:"top",
              enableHtml:true,
            })
        },
        closeHandle(){
            this.$toast(`<a href="http://www.google.com">去谷歌</a>`,{
              showPosition:"top",
              autoClose:false,
              enableHtml:true,
            })
        }
    }
}
</script>
:::
### 属性
> closeBtn的text为按钮文字,callback为点击回调 

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| autoClose | 自动关闭,如果是数字为延迟关闭的时间, | Number/Boolean | - | 3 |
| enableHtml | 内容是否可为HTML(尽量不要使用) | String | - | false |
| showPosition | toast出现位置, | String | top/bottom/middle | middle |
| closeBtn | 自定义关闭按钮, | Object | - | - |