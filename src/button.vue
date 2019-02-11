<template>
     <button class="v-button" :class="[type]">
       <slot></slot>
       <v-icon v-if="icon" :icon-name="icon"></v-icon>
     </button>
</template>
<script>
    import vIcon from './v-icon';
    export default {
        props:{
            icon:{
                type:String,
            },
            loading:{
                type:Boolean,
                default: false,
            },
            type:{
                type:String,
                default:'default'
            }
        },
        components:{
            vIcon,
        }
    }
</script>
<style lang="scss">
  .v-button {
    min-height: var(--button-height);
    font-size: var(--font-size);
    color: var(--button-color);
    border-radius: var(--border-radius);
    padding: 0 1em;
    transition: all .2s ease-in;
    &.primary {
      background-color: var(--primary);
      border:var(--primary);
      outline:var(--primary);
    }
    &.warn {
      background-color: var(--warn);
      border:var(--warn);
      outline:var(--wran);
    }
    &.error {
      background-color: var(--error);
      border:var(--error);
      outline:var(--error);
    }
    &.success {
      background-color: var(--success);
      border:var(--success);
      outline:var(--success);
    }
    &.default {
      background-color: #fff;
      border-width: 1px;
      border-style: solid;
      border-color: #dcdee2;
      outline:none;
      color:var(--text-color)
    }
    &:not(.default):hover {
      opacity: 0.8;
    }
    &.default:hover {
      color: var(--primary);
      border-color: var(--primary);
    }
  }
</style>