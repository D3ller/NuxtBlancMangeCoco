<script setup lang="ts">
let props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
})
</script>

<template>
<div class="about_card">
  <h3>{{title}}</h3>
  <p>{{text}}</p>
</div>
</template>

<style scoped>

</style>