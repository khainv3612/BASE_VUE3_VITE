<template>
  <div
    v-if="loading" class="loading fixed top-0 left-0 right-0 flex
justify-center items-center h-100v w-100v">
    <div class="loader-spinner w-40 h-40">
      <svg
        viewBox="0 0 120 120"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="load one"
          cx="60"
          cy="60"
          r="20"
          pathLength="1"
        />
        <circle class="load two" cx="60" cy="60" r="10"/>
        <circle
          class="load three"
          cx="60"
          cy="60"
          r="30"
          pathLength="1"
        />
      </svg>
    </div>
  </div>
</template>
<script setup>
import appStore from '@/store/app'
import { storeToRefs } from 'pinia'

const { loading } = storeToRefs(appStore())
</script>
<style></style>
