™
<template>
  <svg class="v-icon">
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

    }
  }
</script>
<style lang="scss">
</style>