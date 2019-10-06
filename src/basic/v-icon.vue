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
      name: 'v-icon',
    props: {
      iconName: {
        type: String,
        default: 'settings'
      },
      color:{
        type:String,
          default: '#000'
      },
    },
      computed: {
          icon() {
              return `#i-${this.iconName}`
          }
      }
  }
</script>
<style lang="scss">
	.v-icon {
		width: 1em;
		height: 1em;
		
		& + * {
			margin-left: 0.5em;
		}
	}
</style>
