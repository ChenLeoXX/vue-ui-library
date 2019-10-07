---
title: Collapse 折叠面板
---
#  Collapse 折叠面板
将内容区域折叠/展开。
 - 对复杂区域进行分组和隐藏，保持页面的整洁。
 - 支持手风琴模式
### 基本用法
::: demo

   <template>
       <v-collapse :selected.sync="selected">
           <v-collapseitem name="p1" title="Title 1">
               I'm panel content
           </v-collapseitem>
           <v-collapseitem name="p2" title="Title 2">
                I'm panel content
           </v-collapseitem>
       </v-collapse>
       <h3>多层嵌套</h3>
       <v-collapse :selected.sync="selected1">
          <v-collapseitem name="p3" title="Title 1">
              I'm panel content
          </v-collapseitem>
          <v-collapseitem name="p4" title="Title 2">
           <v-collapse :selected.sync="selected2">
               <v-collapseitem name="p5" title="Title 3">
                   I'm panel content
               </v-collapseitem>
               <v-collapseitem name="p6" title="Title 4">
                    I'm panel content
               </v-collapseitem>
           </v-collapse>
          </v-collapseitem>
      </v-collapse>
      <h3>手风琴</h3>
      <v-collapse :selected.sync="arr3" single>
          <v-collapseitem name="p7" title="Title 1">
              I'm panel content
          </v-collapseitem>
          <v-collapseitem name="p8" title="Title 2">
              I'm panel content
          </v-collapseitem>
      </v-collapse>
   </template>
   
   <script>
   import vCollapse from '../../src/collapse/collapse'
   import vCollapseitem from '../../src/collapse/collapse-item'
   export default {
       data(){
           return {
               selected:['p2'],
               selected1:['p4'],
               selected2:['p4','p5'],
               arr3:['p8'],               
           }
       }, 
       components: {
           vCollapseitem,
           vCollapse
       },
   }
   </script>
:::
### 属性
#### collapse
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| selected  |默认展开项与item的name对应(使用.sync绑定,必填) | Array |- | - |
| single  |是否开启手风琴 | Boolean |- | false |
#### collapse-item
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| name  |唯一标识(必填) | String |- | - |
