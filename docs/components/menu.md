---
title: Menu导航菜单
---

# Menu导航菜单
为页面和功能提供导航的菜单列表。
### 垂直方向
::: demo

<template>
    <v-menu :active.sync="active" vertical @on-item-click="jump">
        <menu-item name="home">首页</menu-item>
        <menu-item name="team">团队</menu-item>
        <menu-item name="about">关于</menu-item>
        <sub-menu name="products">
            <template slot="title">产品</template>
            <menu-item name="software">软件</menu-item>
            <menu-item name="hardware">硬件</menu-item>
            <sub-menu name="service">
                <template slot="title">服务</template>
                <menu-item name="maintain">维修</menu-item>
                <menu-item name="delivery">送货</menu-item>
            </sub-menu>
        </sub-menu>
    </v-menu>
</template>

<script>
import vMenu from '../../src/menu/menu'
import subMenu from '../../src/menu/sub-menu'
import menuItem from '../../src/menu/menu-item'
export default {
    data(){
        return {
            active: 'home',
        }
    },
    methods:{
        jump(item){
            alert(`jump ${item}`)
        },
    },    
    components: {
        vMenu,
        subMenu,
        menuItem
    }
}
</script>
:::
### 竖直方向
::: demo

<template>
    <v-menu :active.sync="active" @on-item-click="jump">
        <menu-item name="home">首页</menu-item>
        <menu-item name="team">团队</menu-item>
        <menu-item name="about">关于</menu-item>
        <sub-menu name="products">
            <template slot="title">产品</template>
            <menu-item name="software">软件</menu-item>
            <menu-item name="hardware">硬件</menu-item>
            <sub-menu name="service">
                <template slot="title">服务</template>
                <menu-item name="maintain">维修</menu-item>
                <menu-item name="delivery">送货</menu-item>
            </sub-menu>
        </sub-menu>
    </v-menu>
</template>

<script>
import vMenu from '../../src/menu/menu'
import subMenu from '../../src/menu/sub-menu'
import menuItem from '../../src/menu/menu-item'
export default {
    data(){
        return {
            active: 'home',
        }
    },
    methods:{
        jump(item){
            alert(`jump ${item}`)
        },
    },
    components: {
        vMenu,
        subMenu,
        menuItem
    }
}
</script>
:::
### 属性
> `sub-menu`和`menu-item`需要提供唯一的naem值
 
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| active | 默认激活(必填,使用.sync绑定) | String | - | - |
| name | 唯一标识name | String | - | - |
### 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| on-item-click |选择某个导航后触发 | Function | - | - |
