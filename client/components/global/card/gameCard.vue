<script setup lang="ts">
let props = withDefaults(defineProps<{
  variant: "" | "word",
  text: string
}>(), {
  variant: ""
})
</script>

<template>
<div :class="props.variant === '' ? 'game-cards' : 'game-cards-word'">
{{text}}
</div>
</template>

<style scoped>

</style>