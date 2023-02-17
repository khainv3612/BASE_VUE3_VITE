<template>
	<ElSkeleton :loading="loading" :rows="5" animated>
		<slot name="component"> </slot>
	</ElSkeleton>
</template>
<script setup>
	defineProps({
		loading: {
			type: Boolean,
			default: true,
		},
	})
</script>
