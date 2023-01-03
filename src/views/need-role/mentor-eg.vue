<template>
<div v-permission="['admin', 'mentor']" style='color: red'>Only admins and mentors have access</div>
</template>

<script>
  export default {
    name: 'MentorExampleComponent',
  }
</script>

<style scoped>

</style>
