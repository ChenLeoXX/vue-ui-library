™<template>
  <svg class="v-icon" :class="{'loading':loading && iconName === 'loading'}">
    <use :xlink:href=`#i-${iconName}`></use>
  </svg>
</template>
<script>
  export default {
      props:{
          iconName:{
              type:String,
              default:'settings'
          },
          loading:{
              type:Boolean,
              default: false,
          },
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
  .loading  {
    animation: loading 0.8s linear infinite;
  }
  @keyframes loading {
    0% {
      transform:rotate(0deg);
    }
    100% {
      transform:rotate(360deg)
    }
  }
</style>