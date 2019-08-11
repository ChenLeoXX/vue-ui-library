<template>
	<div class="collapse">
		<slot></slot>
	</div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: "collapse",
        data() {
            return {
                eventHub: new Vue
            }
        },
        provide() {
            return {
                eventHub: this.eventHub
            }
        }
    }
</script>

<style lang="scss" scoped>
	$wrapper-radius: 4px;
	.collapse {
		border: 1px solid #ddd;
		border-radius: $wrapper-radius;
	}
</style>