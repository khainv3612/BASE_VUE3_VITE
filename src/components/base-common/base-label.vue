<template>
  <div class='label'>
    <label>{{ msg }}<span v-if='req' class='star_req'>*</span></label>
  </div>
</template>
<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  req: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
