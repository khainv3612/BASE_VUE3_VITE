<template>
  <transition name='fade'>
    <div v-if='notification && notification.show' id='toast'>
      <div :class="'toast toast--' + notification.type">
        <div class='toast__icon'>
          <img
            v-if="notification.type === 'success'" src='@/assets/icon/success.svg'
            :alt='notification.type' />
          <img v-if="notification.type === 'error'" src='@/assets/icon/error.svg' :alt='notification.type' />
          <img
            v-if="notification.type === 'warning'" src='@/assets/icon/warning.svg'
            :alt='notification.type' />
          <img v-if="notification.type === 'info'" src='@/assets/icon/info.svg' :alt='notification.type' />
        </div>
        <div class='toast__body'>
          <h3 class='toast__title'>{{ notification.title }}</h3>
          <p class='toast__msg'>{{ notification.message }}</p>
        </div>
        <div class='toast__close' @click='close'>
          <img src='@/assets/images/icons/close.svg' alt='' />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
  import { onBeforeUnmount, ref, watch } from 'vue'
  import appStore from '@/store/app'
  import { storeToRefs } from 'pinia'
  import { TIME_SHOW_NOTIFICATION } from '@/constants'

  const notiStore = appStore()
  const notification = ref({})
  const timeHide = ref(TIME_SHOW_NOTIFICATION)
  const timeOut = ref(null)
  const { notifySuccess, notifyInfo, notifyWarning, notifyError } = storeToRefs(
    appStore(),
  )
  watch([notifyInfo, notifySuccess, notifyWarning, notifyError], () => {
    if (notifyInfo.value.title) {
      close()
      notification.value = {
        ...notifyInfo.value,
        type: 'info',
        image: `/icons/info.svg`,
      }
      notiStore.setNotifyInfo({ title: '', message: '', show: false })
      timeOut.value = setTimeout(
        () => (notification.value.show = false),
        timeHide.value,
      )
    }
    if (notifyError.value.title) {
      close()
      notification.value = {
        ...notifyError.value,
        type: 'error',
        image: `/icons/error.svg`,
      }
      notiStore.setNotifyError({
        title: '',
        message: '',
        show: false,
      })
      timeOut.value = setTimeout(
        () => (notification.value.show = false),
        timeHide.value,
      )
    }
    if (notifyWarning.value.title) {
      close()
      notification.value = {
        ...notifyWarning.value,
        type: 'warning',
        image: `/icons/warning.svg`,
      }
      notiStore.setNotifyWarning({
        title: '',
        message: '',
        show: false,
      })
      timeOut.value = setTimeout(
        () => (notification.value.show = false),
        timeHide.value,
      )
    }
    if (notifySuccess.value.title) {
      close()
      notification.value = {
        ...notifySuccess.value,
        type: 'success',
        image: '/icons/success.svg',
      }
      notiStore.setNotifySuccess({
        title: '',
        message: '',
        show: false,
      })
      timeOut.value = setTimeout(
        () => (notification.value.show = false),
        timeHide.value,
      )
    }
  })
  onBeforeUnmount(() => {
    clearTimeout(timeOut)
  })
  const close = () => {
    clearTimeout(timeOut)
    notification.value.show = false
  }
</script>
