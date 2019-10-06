<template>
	<div>
		<template v-if="canClose">
			<v-expand horizontal :visible="visible">
				<div class="sider">
					<slot></slot>
					<div class="sider-action">
						<v-icon icon-name="left" @click="visible = !visible"></v-icon>
					</div>
				</div>
			</v-expand>
		</template>
		<template v-else>
			<div class="sider">
				<slot></slot>
			</div>
		</template>
	</div>
</template>
<script>
    import vIcon from '../basic/v-icon'
    import vExpand from '../animations/expand'
    export default {
        name: 'vSider',
        data() {
            return {
                visible: true,
            }
        },
        props: {
            canClose: {
                type: Boolean,
                default: false,
            }
        },
        components: {
            vExpand,
            vIcon
        }
    }
</script>
<style lang="scss" scoped>
	.sider {
		min-width: 200px;
		position: relative;
		
		.sider-action {
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
			
			.v-icon {
				fill: currentColor;
			}
		}
	}
</style>