import { ref } from 'vue'

export async function clearCache() {
  if (window.caches != null) {
    const res = ref(false)
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName).then(function (response) {
          res.value = true
        })
      })
    })
  }
  await localStorage.clear()
  await sessionStorage.clear()
}
