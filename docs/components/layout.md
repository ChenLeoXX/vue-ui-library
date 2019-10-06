---
title: Layout
---
# Layout 布局组件
用于快速实现布局
### 说明
> 主要使用flex进行布局注意兼容性 
### 基本用法
常规三栏布局
::: demo

<template>
    <v-layout>
        <v-header>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">Head</div>
        </v-header>
        <v-content>
            <div style="height: 250px;background:#108EE9;color:#fff;text-align:center;">Content</div>
        </v-content>
        <v-footer>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">
                Foot
            </div>
        </v-footer>
    </v-layout>
</template>

<script>
import vHeader from '../../src/layouts/header'
import vFooter from '../../src/layouts/footer'
import vContent from '../../src/layouts/content'
import vLayout from '../../src/layouts/layout'
import vSider from '../../src/layouts/sider'
export default {
    components: {
        vHeader,
        vFooter,
        vContent,
        vLayout,
        vSider
    },
}
</script>
:::
左右布局,带有侧边栏可关闭
::: demo

<template>
    <v-layout>
    <v-sider can-close style="background:#3ba0e9;color:#fff;text-align:center;">Sider</v-sider>
    <v-layout style="background:#108EE9;">
        <v-header>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">Head</div>
        </v-header>
        <v-content style="color:#fff;text-align:center;">
            <div style="height: 300px;">
                Content
            </div>
        </v-content>
        <v-footer>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">
                Foot
            </div>
        </v-footer>
    </v-layout>
    </v-layout>
</template>

<script>
import vHeader from '../../src/layouts/header'
import vFooter from '../../src/layouts/footer'
import vContent from '../../src/layouts/content'
import vLayout from '../../src/layouts/layout'
import vSider from '../../src/layouts/sider'
export default {
    components: {
        vHeader,
        vFooter,
        vContent,
        vLayout,
        vSider
    },
}
</script>
:::
常见三栏布局,内容带有侧边栏
::: demo

<template>
    <v-layout>
        <v-header>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">Head</div>
        </v-header>
        <v-layout style="background:#108EE9;">
            <v-sider style="background:#3ba0e9;color:#fff;text-align:center;">Sider</v-sider>
            <v-content style="color:#fff;text-align:center;">
                <div style="height: 300px;">
                    Content
                </div>
            </v-content>
        </v-layout>
        <v-footer>
            <div style="height: 100px;background:#7dbcea;color:#fff;text-align:center;">
                Foot
            </div>
        </v-footer>
    </v-layout>
</template>

<script>
import vHeader from '../../src/layouts/header'
import vFooter from '../../src/layouts/footer'
import vContent from '../../src/layouts/content'
import vLayout from '../../src/layouts/layout'
import vSider from '../../src/layouts/sider'
export default {
    components: {
        vHeader,
        vFooter,
        vContent,
        vLayout,
        vSider
    },
}
</script>
:::

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :----: | :----: | :----: | :----: |
| can-close  | 侧边栏是否可关闭 | Boolean | - | - |

