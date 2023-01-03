<template>
  <component403 v-if='errorCode === error403' />
  <component500 v-else-if='errorCode === error500' />
  <component404 v-else-if='errorCode !== error200' />
</template>

<script setup>
  import appStore from '@/store/app'
  import { storeToRefs } from 'pinia'
  import Component404 from './404'
  import Component403 from './403'
  import Component500 from './500'
  import { CODE_200, CODE_403, CODE_500 } from '@/constants'
  import router from '@/router'

  const { errorCode } = storeToRefs(appStore())

  const error403 = ref(CODE_403)
  const error500 = ref(CODE_500)
  const error200 = ref(CODE_200)

  onMounted(() => {
    if (errorCode.value === error200.value) {
      router.push('/')
    }
  })
</script>

<script>
  export default {
    name: 'ErrorPage',
  }
</script>

<style scoped>

</style>
