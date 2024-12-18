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
  <NuxtImg src="https://via.placeholder.com/150" alt="card" />
  <h3>{{title}}</h3>
  <p>{{text}}</p>
</div>
</template>

<style scoped>

</style>