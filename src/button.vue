<template>
     <button class="v-button" :class="{[type]:true,[`icon-position-${iconPosition}`]:icon}">
       <v-icon :icon-name="icon" loading="loading" v-if="icon"></v-icon>
       <div class="content">
         <slot></slot>
       </div>
     </button>
</template>
<script>
    import vIcon from './v-icon';
    export default {
        props:{
            icon:{
                type:String,
            },
            type:{
                type:String,
                default:'default'
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value){
                    return (value !== 'left' || value !== 'right')
                }
            },
        },
        methods:{
            testJump(){

            }
        },
        components:{
            vIcon,
        }
    }
</script>
<style lang="scss">
  .v-button {
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    min-height: var(--button-height);
    font-size: var(--font-size);
    color: var(--button-color);
    border-radius: var(--border-radius);
    padding: 0 1em;
    transition: all .2s ease-in;
    &.icon-position-left {
      .v-icon {
        order:1;
        margin-right: 0.5em;
      }
      .content {
        order: 2;
      }
    }
    &.icon-position-right {
      .v-icon {
        order: 2;
        margin-left: 0.5em;
      }
      .content {
        order: 1;
      }
    }
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