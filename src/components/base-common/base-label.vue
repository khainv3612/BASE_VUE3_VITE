<template>
	<div class="label pb-1">
		<label class="text-label text-color-medium"
			>{{ msg
			}}<span v-if="req" class="text-support-danger ml-0.5"
				>*</span
			></label
		>
	</div>
</template>
<script setup>
	defineProps({
		msg: {
			type: String,
			required: true,
		},
		req: {
			type: Boolean,
			required: false,
			default: false,
		},
	})
</script>
