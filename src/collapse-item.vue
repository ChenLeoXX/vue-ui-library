<template>
	<div class="collapse-item" @click="toggle">
		<div class="title">
			<v-icon icon-name="right"></v-icon>
			<slot name="title"></slot>
		</div>
		<div class="content" v-if="visible">
			<slot></slot>
		</div>
	</div>
</template>

<script>
    import vIcon from './v-icon'

    export default {
        name: "collapse-item",
        data() {
            return {
                visible: true
            }
        },
        props: {
            name: {
                type: String | Number,
                required: true
            },
        },
        mounted() {

        },
        methods: {
            toggle() {

            },
        },
        comments: {
            vIcon
        }
    }
</script>

<style lang="scss" scoped>
	$content-txt-color: rgba(0, 0, 0, 0.65);
	$title-txt-color: rgba(0, 0, 0, 0.85);
	$item-radius: 4px;
	.collapse-item {
		&:first-child > .title {
			border-top-left-radius: $item-radius;
			border-top-right-radius: $item-radius;
		}
		
		&:last-child > .title:last-child {
			border-bottom-left-radius: $item-radius;
			border-bottom-right-radius: $item-radius;
		}
		
		.title {
			cursor: pointer;
			position: relative;
			border: 1px solid #ddd;
			background: rgba(250, 250, 250, 1);
			color: $title-txt-color;
			padding: 12px 16px 12px 40px;
			margin-top: -1px;
			margin-left: -1px;
			margin-right: -1px;
			
			.icon-wrapper {
				position: absolute;
				left: 14px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 14px;
				
				svg {
					transition: transform .3s ease;
				}
			}
		}
		
		.content {
			color: $content-txt-color;
			padding: 16px;
		}
	}
</style>