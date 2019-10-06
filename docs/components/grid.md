---
title: Grid 栅格
---
# Grid 网格组件
24 栅格系统
### 说明 
> 使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有Col 必须放在 Row 内。
 注意一定要使用 box-sizing:border-box 盒模型 否则计算会出现错误;
### 基本用法
基础栅格
> 根据span的值占据宽度,不设置span时 默认平分宽度

::: demo

<template>
    <v-row class="graybg">
        <v-col class="block1">
        自适应
        </v-col>
        <v-col class="block2">
        自适应
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="8" class="block1">
        col-8
        </v-col>
        <v-col span="8" class="block2">
        col-8
        </v-col>
        <v-col span="8" class="block1">
        col-8
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="12" class="block1">
        col-12
        </v-col>
        <v-col span="12" class="block2">
        col-12
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="18" class="block1">
        col-18
        </v-col>
        <v-col span="4" class="block2">
        col-6
        </v-col>
    </v-row>
</template>

<script>
import vCol from '../../src/layouts/v-col'
import vRow from '../../src/layouts/v-row'
export default {
    components:{
        vCol,
        vRow
    }
}
</script>
<style>
    * {
        box-sizing:border-box;
    }
    .graybg {
        background:#f5f5f5;
    }
    .block2 {
        background:rgba(0,160,233,0.7);
    }
   .block1 {
        background:#00a0e9;
   }
</style>
:::
### 区块间隔
> 使用row 上的gutter 属性实现间隔,注意使用gutter时必须给出 span的值

::: demo

<template>
        <v-row gutter="16">
            <v-col span="8">
                <div class="block1">
                col-8
                </div>
            </v-col>
            <v-col span="8">
                <div class="block2">
                col-8
                </div>
            </v-col>
            <v-col span="8">
                <div class="block1">
                col-8
                </div>
            </v-col>
        </v-row>
        <br>
        <v-row gutter="20">
            <v-col span="12">
                <div class="block1">
                col-12
                </div>
            </v-col>
            <v-col span="12">
                <div class="block1">
                col-12
                </div>
            </v-col>
        </v-row>
        <br>
        <v-row class="graybg">
            <v-col span="24" class="block1">
            col-24
            </v-col>
        </v-row>
</template>

<script>
import vCol from '../../src/layouts/v-col'
import vRow from '../../src/layouts/v-row'
export default {
    components:{
        vCol,
        vRow
    }
}
</script>
<style lang="scss">
    * {
        box-sizing:border-box;
    }
    .graybg {
        background:#f5f5f5;
    }
    .block2 {
        background:rgba(0,160,233,0.7);
    }
   .block1 {
        background:#00a0e9;
   }
   .border {
    border:1px solid #00a0e9;
   }
</style>
:::
### 定义单个区块偏移量

::: demo

<template>
    <v-row class="graybg">
        <v-col span="8" class="block1">
        col-8
        </v-col>
        <v-col span="8" class="block2">
        col-8
        </v-col>
        <v-col span="2" offset="6" class="block1">
        col-2
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="6" class="block1">
        col-12
        </v-col>
        <v-col span="6" offset="4" class="block2">
        col-12
        </v-col>
        <v-col span="6" offset="2" class="block2">
        col-12
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="18" class="block1">
        col-18
        </v-col>
        <v-col span="4" offset="2" class="block2">
        col-6
        </v-col>
    </v-row> 
</template>

<script>
import vCol from '../../src/layouts/v-col'
import vRow from '../../src/layouts/v-row'
export default {
    components:{
        vCol,
        vRow
    }
}
</script>
<style lang="scss">
    * {
        box-sizing:border-box;
    }
    .graybg {
        background:#f5f5f5;
    }
    .block2 {
        background:rgba(0,160,233,0.7);
    }
   .block1 {
        background:#00a0e9;
   }
   .border {
    border:1px solid #00a0e9;
   }
</style>
:::
### 响应不同设备宽度
::: demo

<template>
    <v-row class="graybg">
        <v-col span="8" class="block1" :ipad="{span:10}">
        col-8
        </v-col>
        <v-col span="8" class="block2" :ipad="{span:10}">
        col-8
        </v-col>
        <v-col span="8" class="block1" :ipad="{span:4}">
        col-8
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="12" class="block1" :pc="{span:10}">
        col-12
        </v-col>
        <v-col span="12" class="block2" :pc="{span:10,offset:4}">
        col-12
        </v-col>
    </v-row>
    <br>
    <v-row class="graybg">
        <v-col span="18" class="block1" :wide-pc="{span:10}">
        col-18
        </v-col>
        <v-col span="4" class="block2" :wide-pc="{span:14}">
        col-6
        </v-col>
    </v-row>
</template>

<script>
import vCol from '../../src/layouts/v-col'
import vRow from '../../src/layouts/v-row'
export default {
    components:{
        vCol,
        vRow
    }
}
</script>
<style>
    * {
        box-sizing:border-box;
    }
    .graybg {
        background:#f5f5f5;
    }
    .block2 {
        background:rgba(0,160,233,0.7);
    }
   .block1 {
        background:#00a0e9;
   }
</style>
:::
### 属性
#### row
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| gutter  | 区块的间隔 | String/Number | - | - |
#### col
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| span  | 占据row的24分之n | String/Number | - | - |
| offset  | 偏移row的24分之n | String/Number | - | - |
| pc  | 定义不同设备下的span/offset | Object | - | - |
| wide-pc  | 定义不同设备下的span/offset | Object | - | - |
| ipad  | 定义不同设备下的span/offset | Object | - | - |

