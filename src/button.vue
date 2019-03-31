<template>
     <button class="v-button" :class="{[type]:true,[`icon-position-${iconPosition}`]:iconPosition,[shape]:shape,'only-icon':!$slots.default}"
             @click="$emit('click')"
     >
       <v-icon :icon-name="icon" v-if="icon && !isLoading"></v-icon>
       <v-icon  :class="{'loading':isLoading}" icon-name="loading" v-if="isLoading"></v-icon>
       <div class="content" v-if="$slots.default">
         <slot></slot>
       </div>
     </button>
</template>
<script>
    import vIcon from './v-icon';
    export default {
        props:{
            isLoading:{
                type:Boolean,
                default:false
            },
            icon:{
                type:String,
            },
            shape: {
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
<style lang="scss" scoped>
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
    /*类型class*/
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
    &.only-icon {
      .v-icon {
        margin:0;
      }
    }
    /*更大的圆角*/
    &.round {
      border-radius: 3em;
    }
    &.circle {
      border-radius:50%;
      height: var(--circle-height);
      width: var(--circle-width);
      padding:0;
      .v-icon {
        width: 2.5em;
      }

    }
  }
</style>