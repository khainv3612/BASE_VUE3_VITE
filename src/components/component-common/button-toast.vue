<template>
  <el-button type='success' @click='handleNotiSuccess'> {{ $t('common.success_text') }}</el-button>
  <el-button type='info' @click='handleNotiInfo'> {{ $t('common.info_text') }}</el-button>
  <el-button type='primary' @click='handleNotiError'> {{ $t('common.error_text') }}</el-button>
  <el-button type='warning' @click='handleNotiWarrning'> {{ $t('common.warning_text') }}</el-button>
</template>

<script setup>
import * as notiService from '@/services/notiService'
import { trans } from '@/utils/language'

const handleNotiSuccess = () => {
  notiService.setNotifySuccess(trans('noti.ok'))
}
const handleNotiError = () => {
  notiService.setNotifyError(trans('noti.ok'))
}
const handleNotiInfo = () => {
  notiService.setNotifyInfo(trans('noti.ok'))
}
const handleNotiWarrning = () => {
  notiService.setNotifyWarning(trans('noti.ok'))
}
</script>
