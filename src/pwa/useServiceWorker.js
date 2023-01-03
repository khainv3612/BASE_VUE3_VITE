import { useRegisterSW } from "virtual:pwa-register/vue"
import { clearCache } from "@/services/cacheService"

const { needRefresh } = useRegisterSW()
watch(needRefresh, async () => {
  if (needRefresh.value) {
    clearCache()
    window.location.reload()
  }
}, { immediate: true })
