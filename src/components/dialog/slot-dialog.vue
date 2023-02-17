<template>
	<div>
		<slot :is-visible="isVisible" :open="handleOpen" :close="handleClose" />
	</div>
</template>
<script setup>
	const isVisible = ref(false)
	const handleOpen = () => {
		isVisible.value = true
	}
	const handleClose = () => {
		isVisible.value = false
	}
</script>
<script>
	export default {
		name: 'SlotDialog',
	}
</script>
