<template>
	<div>403 HIHI</div>
</template>

<script>
	import appStore from '@/store/app'
	import { CODE_403 } from '@/constants'

	export default {
		name: 'Component403',
		setup() {
			const app = appStore()
			onMounted(() => {
				app.setPageError(true)
				app.setErrorCode(CODE_403)
			})
		},
	}
</script>

<style scoped></style>
