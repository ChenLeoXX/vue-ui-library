---
title: Popover 气泡卡片
---
# Popover 气泡卡片
### 基本用法
用于展示元素信息
::: demo

<template>
       <v-popover>
         <template slot="content">
           I'm content
         </template>  
         <v-button>Show up</v-button>
       </v-popover>
       <v-popover need-title position="bottom">
         <template slot="title">
           I'm title
         </template>
         <template slot="content">
           I'm Content
         </template>  
         <v-button>With title</v-button>
       </v-popover> 
       <v-popover trigger="hover" position="left">
         <template slot="content">
           I'm Content
         </template>  
         <v-button>Trigger with hover</v-button>
       </v-popover> 
       <v-popover trigger="hover" position="right">
         <template slot="content">
           I'm Content
         </template>  
         <v-button>Diffrent position</v-button>
       </v-popover> 
      <v-popover :content-styles="styleObj">
        <template slot="content">
          我是内容
        </template>  
        <v-button>自定义样式</v-button>
      </v-popover>          
</template>

<script>
import Button from '../../src/basic/button.vue'
import Popover from '../../src/popover/popover.vue'
export default {
    data(){
        return {
           styleObj:{
                color:'lightblue',
                padding:'20px'
           }
        }
    },
    components: {
        'v-button': Button,   
        'v-popover': Popover,
    }
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| content-style | 弹出层样式 | Object | - | - |
| position | 弹出位置 | String | bottom/left/right | top |
| trigger  | 触发方式  | String | hover | click |
| need-title  | 弹出标题  | Boolean | - | false |