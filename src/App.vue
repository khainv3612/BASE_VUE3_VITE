<template>
  <el-config-provider :locale="vi">
    <component :is='layout'>
      <Notification/>
      <Loading/>
      <router-view v-if="isOnline"/>
      <offline v-else/>
    </component>
  </el-config-provider>
</template>
<script setup>
import vi from 'element-plus/dist/locale/vi.mjs'
import Offline from '@/components/no-internet/Offline'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { PUBLIC_LAYOUT } from '@/constants'

const route = useRoute()
const isOnline = ref(navigator.onLine)
const layout = computed(() => {
  return (route.meta.layout || PUBLIC_LAYOUT)
})

const updateOnlineStatus = (e) => {
  const { type } = e
  isOnline.value = type === 'online'
}
onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})
onBeforeUnmount(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

watch(isOnline, () => {
  if (isOnline.value)
    window.location.reload()
})
</script>
