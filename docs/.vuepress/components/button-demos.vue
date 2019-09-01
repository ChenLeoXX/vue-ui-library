<template>
	<div>
		<v-button>
			默认
		</v-button>
		<v-button icon="settings">
			图标按钮
		</v-button>
		<v-button type="primary">
			类型按钮
		</v-button>
		<v-button type="warn" icon="search" :is-loading="true" icon-position="right">
		
		</v-button>
		<v-button type="error" icon="search">
			失败按钮
		</v-button>
		<v-button type="success" shape="round" icon="settings">
			圆角按钮
		</v-button>
	</div>
</template>
<script>
    import Button from '../../../src/basic/button'

    export default {
        name: "button-demos",
        components: {
            'v-button': Button,
        }
    }
</script>