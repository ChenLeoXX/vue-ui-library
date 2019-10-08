---
title: Carousel 轮播
---

# Carousel 轮播
轮播内容,默认无缝轮播
### 基本用法
::: demo

<template>
   <div class="container">
       <v-slide :selected.sync="selectedItem">
            <v-slideitem name="1">
               <div class="block">
                   1
               </div>
            </v-slideitem>
             <v-slideitem name="2">
                <div class="block">
                    2
                </div>
             </v-slideitem>
              <v-slideitem name="3">
                 <div class="block">
                     3
                 </div>
              </v-slideitem>
          </v-slide>
   </div>
</template>

<script>
import vSlide from '../../src/slide/slide'
import vSlideitem from '../../src/slide/slide-item'
export default {
    data(){
        return {
            selectedItem:'1'
        }
    },
    components: {
        vSlide,
        vSlideitem
    }
}
</script>
<style lang="scss">
    .container {
        height:250px;
        .block {
                line-height:200px;
                background:#364d78;
                text-align:center;
                color:#fff;
                font-size:25px;
            }
    }
</style>
:::
### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| selected | 默认展示的轮播 | String | - | - |
| show-dots | 是否显播指示器 | Boolean | - | true |
| auto-play | 是否自动轮播 | Boolean | - | true |
| auto-play-delay | 自动轮播间隔 | Number | - | 3000 |