<template>
	<div class="demo">
		<v-button>按钮</v-button>
	</div>
</template>
<script>
    import button from './button'

    export default {
        name: 'demo',
        data() {
            return {}
        },
        components: {
            'v-button': button
        }
    }
</script>
<style>
	*, *::before, *::after {
		box-sizing: border-box;
	}
	
	body {
		margin: 0;
		font-size: 14px;
		padding: 150px;
	}
</style>