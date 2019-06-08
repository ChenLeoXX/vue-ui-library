<template>
	<div class="layout" :class="hasSider">
		<slot></slot>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                hasSider: {
                    'has-side': false
                }
            }
        },
        created() {
            console.log('father create')
        },
        mounted() {
            let vm = this
            this.$children.forEach(child => {
                if (child.$options.name === 'vSider') {
                    vm.hasSider['has-side'] = true
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;

		&.has-side {
			flex-direction: row !important;
		}
	}
</style>