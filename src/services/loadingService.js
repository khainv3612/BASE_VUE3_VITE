import appStore from '@/store/app'

const loadingStore = appStore()

export function startLoading() {
  loadingStore.setLoading(true)
}

export function stopLoading() {
  loadingStore.setLoading(false)
}
