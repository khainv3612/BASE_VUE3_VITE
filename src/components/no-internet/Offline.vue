<template>
	<div class="offline_component">
		<h1 class="text-red-900">mat mang nha</h1>
	</div>
</template>

<script setup>
	import router from '@/router'
	onMounted(() => {
		if (navigator.onLine) router.push('/')
	})
</script>
