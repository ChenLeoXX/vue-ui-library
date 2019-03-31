™
<template>
  <svg class="v-icon" :fill="color">
    <use :xlink:href=`#i-${iconName}`></use>
  </svg>
</template>
<script>
  import '../static/svg'
  export default {
    props: {
      iconName: {
        type: String,
        default: 'settings'
      },
      color:{
        type:String,
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>