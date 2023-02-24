<template>
	<div class="header_common_component">
		<div>This is header</div>
		<el-button type="success" @click="logOut">
			{{ $t('header.log_out') }}</el-button
		>
	</div>
</template>

<script setup>
	import { startLoading, stopLoading } from '@/services/loadingService'
	import * as authService from '@/services/authService'
	import notificationService from '@/services/notiService'
	import { trans } from '@/utils/language'

	const logOut = async () => {
		startLoading()
		const result = await authService.handleLogout()
		if (result) {
			await window.location.reload()
			notificationService.setSuccessNotification(
				trans('noti.logout_success')
			)
		} else {
			notificationService.setErrorNotification(trans('noti.logout_fail'))
		}
		stopLoading()
	}
</script>
<script>
	export default {
		name: 'HeaderCommon',
	}
</script>
<style scoped></style>
