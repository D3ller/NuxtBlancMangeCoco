<script setup lang="ts">
let props = defineProps({
  variant: {
    type: String,
    default: "",
    validator(value, props) {
      return ["", "word"].includes(value);
    }
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
<div :class="props.variant === '' ? 'game-cards' : 'game-cards-word'">
{{text}}
</div>
</template>

<style scoped>

</style>