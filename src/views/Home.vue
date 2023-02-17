<template>
	<el-button @click="router.push('/component-common/dialog')"
		>DIALOG COMMON</el-button
	>
	<el-button @click="router.push('/component-common/toast')"
		>NOTIFICATION COMMON</el-button
	>
</template>

<script setup>
	import router from '@/router'
</script>
