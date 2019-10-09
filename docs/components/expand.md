---
title: Expand 展开动画 
---

# Expand 展开动画 
横向、竖向展开元素.
### 基本用法
::: demo

<template>
    <v-button @click="visible=!visible">竖向</v-button>
    <v-button @click="visible2=!visible2">横向</v-button>
    <p></p>
    <v-expand :visible="visible"> 
     <div class="block">
     </div>  
    </v-expand>        
    <p></p>
    <v-expand horizontal :visible="visible2"> 
     <div class="block">
     </div>  
    </v-expand>    
</template>

<script>
import vButton from '../../src/basic/button'
import vExpand from '../../src/animations/expand'
export default {
    data(){
        return {
            visible:true,
            visible2:true,
        }
    },
    components: {
        vExpand,
        vButton
    }
}
</script>
<style lang="scss">
    .block {
        width:600px;
        height:200px;
        text-align:center;
        line-height:50px;
        color:#fff;
        background:#2d8cf0;
        border-radius:4px;
    }
</style>
:::
### 属性
> 传入的元素须指定宽高

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| horizontal | 展开方向 | Boolean | horizontal | vertical |
| visible | 是否展开 | Boolean | - | - |
| duration | 动画事件 | Number | - | 400 |