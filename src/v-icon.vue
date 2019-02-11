<template>
  <svg class="v-icon">
    <use :xlink:href=`#i-${iconName}`></use>
  </svg>
</template>
<script>
  export default {
      props:{
          iconName:{
              type:String,
              default:'settings'
          }
      }
  }
</script>
<style lang="scss">
  .v-icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>