---
title: Sticky 粘滞
---

# Sticky 粘滞
滚动到指定位置时固定显示内容.
### 基本用法
::: demo

<template>
    <v-sticky :distance="100">
     <div class="block">
        Sticky me
     </div>  
    </v-sticky>
    <p>content</p>
    <p>content</p>
    <p>content</p>
    <p>content</p>
     <p>content</p>
     <p>content</p>
     <p>content</p>
     <p>content</p>
</template>

<script>
import vSticky from '../../src/sticky/sticky'
export default {
    components: {
        vSticky
    }
}
</script>
<style lang="scss">
    .block {
        text-align:center;
        line-height:50px;
        color:#fff;
        background:#2d8cf0;
        border-radius:4px;
    }
</style>
:::
### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| distance | 到顶部距离 | Number | - | 0 |