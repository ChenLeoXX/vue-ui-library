™
<template>
  <div class="icon-wrapper">
    <svg class="v-icon" :fill="color">
      <use :xlink:href=`#i-${iconName}`></use>
    </svg>
    <slot></slot>
  </div>
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
  .icon-wrapper {
	  width: 1em;
	  height: 1em;
	  .v-icon {
		  width: 100%;
		  height: 100%;
    }
  }
</style>
