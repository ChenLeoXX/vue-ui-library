™
<template>
	<svg class="v-icon" :fill="color" @click="$emit('click')">
	    <use :xlink:href="icon">
	    </use>
    </svg>
</template>
<script>
    import '../../static/svg'
  export default {
    props: {
      iconName: {
        type: String,
        default: 'settings'
      },
      color:{
        type:String,
          default: '#fff'
      },
    },
      computed: {
          icon() {
              return `#i-${this.iconName}`
          }
      }
  }
</script>
<style lang="scss" scoped>
	.v-icon {
		width: 1em;
		height: 1em;
		margin: 0 10px;
		fill: currentColor;
	}
</style>
