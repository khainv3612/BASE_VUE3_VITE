<template>
  <div>500 HIHI</div>
</template>

<script>
  import appStore from '@/store/app'
  import { CODE_500 } from '@/constants'

  export default {
    name: 'Component500',

    setup() {
      const app = appStore()
      onMounted(() => {
        app.setPageError(true)
        app.setErrorCode(CODE_500)
      })
    },
  }
</script>

<style scoped>
</style>
