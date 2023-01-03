<template>
  <div v-permission="['admin']" style='color: red'>Only admins have access</div>
</template>

<script>
  export default {
    name: 'AdminExampleComponent',
  }
</script>

<style scoped>

</style>
