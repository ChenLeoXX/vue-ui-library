---
title: ButtonGroup  
---

## ButtonGroup  组合按钮
### 基本用法
横向排列的按钮组合
::: demo
<template>
   <v-group>
    <v-button icon="left"></v-button>
    <v-button>Back</v-button>
    <v-button>Go</v-button>
    <v-button>Prev</v-button>
    <v-button icon="right"></v-button>
   </v-group> 
</template>

<script>
import Button from '../../src/basic/button'
import ButtonGroup from '../../src/basic/button-group'
export default {
    components: {
        'v-button': Button,
        'v-group':ButtonGroup
    }
}
</script>
:::