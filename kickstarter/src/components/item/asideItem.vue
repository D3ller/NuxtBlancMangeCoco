<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(defineProps<{ title: string; active: boolean }>(), {
  active: false,
});
</script>

<template>
<div class="aside-item">
  {{props.title}}
  {{active}}
</div>
</template>

<style scoped>
.aside-item {
  padding: 10px;
  color: var(--gray-color);
}
</style>