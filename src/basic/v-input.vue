<template>
  <div class="wrapper">
    <label>
      <input
				      @click="$emit('click',$event.target.value,$event)"
				      @change="$emit('change',$event.target.value,$event)"
				      @blur="$emit('blur',$event.target.value,$event)"
				      @focus="$emit('focus',$event.target.value,$event)"
				      @input="$emit('input',$event.target.value,$event)"
				      :disabled="disabled" :value="value" :readonly="readonly"
				      :class="{[`${size}`]:true,error:error,'left-icon':!!leftIcon,'right-icon':!!rightIcon}" :type="textType"
				      :placeholder="placeholder">
	    <span v-if="rightIcon||leftIcon" class="input-icon" :class="{[`${size}`]:true,'left-icon':!!leftIcon}">
        <v-icon :icon-name="rightIcon||leftIcon" :class="{[`${size}`]:true}" @click="$emit('on-click')"></v-icon>
      </span>
    </label>
    <template v-if="error">
      <v-icon icon-name="error" color="#f77f61"></v-icon>
      <span class="msg">{{error}}</span>
    </template>
  </div>
</template>
<script>
  import vIcon from './v-icon'
  export default  {
    props:{
        rightIcon: {
            type: String,
        },
        leftIcon: {
            type: String,
      },
      value:{
        default:''
      },
      disabled:{
        type:Boolean,
        default:false
      },
      readonly:{
        type:Boolean,
        default:false
      },
      placeholder:{
        type:String,
        default:'请输入'
      },
      textType:{
        type:String,
        default:'text'
      },
      error:{
        type:String
      },
      size:{
        type:String,
        default:'m'
      }
    },
    components:{
      vIcon
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/var";
.wrapper {
  position: relative;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  font-size: var(--font-size);
  & > :not(:last-child) {
    margin-right: 0.3em;
  }
  .input-icon {
    position: absolute;
	  display: inline-flex;
    right: 4px;
	  top: 50%;
	  transform: translateY(-50%);
	
	  &.left-icon {
		  left: 4px !important;
		  right: 0;
    }
    svg {
      fill: gray;
      margin: 0;
  
      &.s {
	      width: 1em;
	      height: 1em;
      }
	
	    &.m {
		    width: 1.2em;
		    height: 1.2em;
	    }
      &.l {
	      width: 1.5em;
	      height: 1.5em;
      }
    }
  }
  input {
    outline: none;
    padding: 5px;
	  border-radius: $border-radius;
	  font-size: $font-size;
    border:1px solid #ddd;
    transition:all 0.2s linear;
    color:rgba(0,0,0,.65);
	
	  &.right-icon.m {
      padding-right: 2em !important;
    }
	
	  &.left-icon.m {
		  padding-left: 2em !important;
	  }
	
	  &.right-icon.s, &.right-icon.l {
		  padding-right: 1.8em !important;
	  }
	
	  &.left-icon.s, &.left-icon.l {
		  padding-left: 1.8em !important;
	  }
    &::placeholder {
      color:#ddd;
    }
	
	  &[readonly] {
		  outline: none;
		  cursor: pointer;
	  }
	
	  &[disabled] {
      background: #ddd;
      cursor: not-allowed;
      border:1px solid #bbb;
      box-shadow:none;
      &:hover {
        border:1px solid #bbb;
      }
      &::placeholder {
        color:#aaa;
      }
    }
    &.error {
      border:1px solid #ff606f;
	    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
	
	    &:hover {
		    border: 1px solid #ff606f;
	    }
    }
    &.m {
      padding: 8px;
    }
    &.s {
      padding:4px;
	    font-size: $tip-font-size;
    }
    &.l {
      padding:12px;
	    font-size: $big-font-size;
    }
    &:hover {
	    border: 1px solid $primary;
    }
    &:focus {
	    border-color: $primary;
      box-shadow:0 0 0 2px rgba(24,144,255,0.2)
    }
  }
  .v-icon {
    width: 1em;
    height: 1em;
  }
  .msg {
	  font-size: $tip-font-size;
    color:red;
  }
}
</style>