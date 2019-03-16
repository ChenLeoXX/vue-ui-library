<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
    mounted(){
        for(let node of this.$el.children) {
            if(node.tagName.toLocaleLowerCase() !== 'button'){
                console.warn('invalid slot: the slot node must be button')
            }
        }
    },
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
  .button-group {
    display: inline-flex;
    vertical-align: top;
    .v-button {
      border-radius: 0;
      margin-left:-1px;
      &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      &:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>