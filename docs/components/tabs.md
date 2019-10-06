---
title: tab
---
# Tab 标签页
### 基本用法
选项卡切换组件,展示不同选项内容.
### 说明
> tab内必须包含body和head,而pane和item分别对应body和head
::: demo

<template>
   <v-tab selected="news">
     <v-head>
        <v-item name="news">
            新闻
        </v-item>
        <v-item name="finance">
            财经
        </v-item>
        <v-item name="sport" @on-tab-click="onTabClick">
            体育
        </v-item>
        <v-item name="history">
          <v-icon icon-name="search" slot="icon"></v-icon>  
            历史
        </v-item>
        <v-item name="disable" disabled>
            被禁用
        </v-item>
        <a href="#" slot="action">Action</a>        
     </v-head>
     <v-body>
        <v-pane name="news">
        　　10月1日，庆祝新中国成立70周年盛典在天安门广场隆重举行。这段“青春万岁”的情境式行进只是当天群众游行活动中的一个片段。
        </v-pane>
        <v-pane name="finance">
           财经
        </v-pane>
        <v-pane name="sport">
            体育
        </v-pane>
        <v-pane name="history">
            历史
        </v-pane>
        <v-pane name="disable">
            禁用
        </v-pane>
     </v-body>
   </v-tab>            
</template>

<script>
import vIcon from '../../src/basic/v-icon'
import vTabs from '../../src/tab/tabs'
import vBody from '../../src/tab/tab-body'
import vHead from '../../src/tab/tab-head'
import vItem from '../../src/tab/tab-item'
import vPane from '../../src/tab/tab-pane'
export default {
    methods:{
        onTabClick(){
            alert('Clicked')
        }
    },
    components: {
        'v-pane': vPane,   
        'v-item': vItem,
        'v-body':vBody,
        'v-head':vHead,
        'v-tab':vTabs,
        'v-icon':vIcon
    }
}
</script>
:::

### 属性
#### tab
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| selected  | 默认选择的tab页(必填)  | String | - | - |
#### tabItem
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| disabled | 禁用 | Boolean | - | - |
| name | 唯一标识(必填否则无法正常展示) | String | - | - |
| icon插槽  | 在item中插入图标  | - | icon |  - |
| on-tab-click  | item点击事件  | - | Function |  - |
#### tabPane
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| name | 唯一标识(必填否则无法正常展示) | String | - | - |
| action插槽  | 定义tab标签头操作  | - | action |  - |