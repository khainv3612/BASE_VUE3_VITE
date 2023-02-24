<template>
	<el-button type="success" @click="handleNotiSuccess">
		{{ $t('common.success_text') }}</el-button
	>
	<el-button type="info" @click="handleNotiInfo">
		{{ $t('common.info_text') }}</el-button
	>
	<el-button type="primary" @click="handleNotiError">
		{{ $t('common.error_text') }}</el-button
	>
	<el-button type="warning" @click="handleNotiWarrning">
		{{ $t('common.warning_text') }}</el-button
	>
</template>

<script setup>
	import notificationService from '@/services/notiService'
	import { trans } from '@/utils/language'

	const handleNotiSuccess = () => {
		notificationService.setSuccessNotification(trans('noti.ok'))
	}
	const handleNotiError = () => {
		notificationService.setErrorNotification(trans('noti.ok'))
	}
	const handleNotiInfo = () => {
		notificationService.setInfoNotification(trans('noti.ok'))
	}
	const handleNotiWarrning = () => {
		notificationService.setWarningNotification(trans('noti.ok'))
	}
</script>
