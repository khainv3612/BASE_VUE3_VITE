<template>
  <header-auth/>
  <div class='auth_layout_config auth_layout_component'>
    <slot/>
  </div>
  <footer-auth/>
</template>
<script setup>
import HeaderAuth from '@/layouts/navbar/auth/HeaderCommonAuth'
import FooterAuth from '@/layouts/navbar/auth/FooterCommonAuth'
</script>
