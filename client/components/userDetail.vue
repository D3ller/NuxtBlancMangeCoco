<script setup lang="ts">
let props = defineProps<{user: object}>();
</script>

<template>
  <div style="background-color: red;">
    <h2><b>Dans le header / UserDetails</b></h2>
    {{props.user}}
  </div>
</template>

<style scoped>

</style>