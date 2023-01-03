<template>
  <header-common v-if='hasToken' />
  <header-auth v-else />
  <div class='default_layout_config default_layout_component'>
    <slot />
  </div>
  <footer-common v-if='hasToken' />
  <footer-auth v-else />
</template>

<script setup>
  import HeaderAuth from '@/layouts/navbar/auth/HeaderCommonAuth'
  import FooterAuth from '@/layouts/navbar/auth/FooterCommonAuth'
  import HeaderCommon from '@/layouts/navbar/default/HeaderCommon'
  import FooterCommon from '@/layouts/navbar/default/FooterCommon'
  import { getToken } from '@/services/authService'

  const hasToken = getToken()
  onMounted(() => {
  })
</script>
