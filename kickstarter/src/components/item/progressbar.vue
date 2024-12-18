<script setup lang="ts">
import { defineProps } from 'vue'
let props = defineProps<{
  progress: number
}>()
</script>

<template>
<div class="progress-bar">
  <div class="progress-fill" :style="{ width: props.progress + '%' }">
  </div>
</div>
</template>

<style scoped>
.progress-bar {
  background: var(--bg-secondary);
  padding: 2px;
  border-radius: 5000px;
  width: 100%;
  height: 20px;
}

.progress-fill {
  background: var(--theme-color);
  border-radius: 5000px;
  height: 100%;
}

@media only screen and (max-width: 768px) {
    .progress-bar {
        height: 15px; /* Adjust height for smaller screens */
        padding: 1px; /* Reduce padding */
    }

    .progress-fill {
        height: 100%; /* Ensure the fill adjusts to the new bar height */
    }
}

</style>