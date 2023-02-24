<template>
	<el-button
		:class="[
			classExtra,
			classCustom,
			isFullWidth ? 'w-full' : '',
			'btn-common',
		]"
		:loading="loading"
		:disabled="disabled"
		:readonly="readonly"
		@click.prevent="$emit('submit')"
	>
		<img
			v-if="iconLeft"
			:src="iconLeft"
			alt=""
			:class="[text ? 'pr-2' : '', 'w-[20px] h-[20px]']"
		/>
		<span>{{ text }}</span>
		<img
			v-if="iconRight"
			:src="iconRight"
			alt=""
			:class="[text ? 'pl-2' : '', 'w-[20px] h-[20px]']"
		/>
	</el-button>
</template>
<script setup>
	import { COMMON_PROPS_BUTTON } from '@/constants/button'
	defineProps({ ...COMMON_PROPS_BUTTON })
	defineEmits(['submit'])
</script>
