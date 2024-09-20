<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(defineProps<{ title: string; active: boolean }>(), {
  active: false,
});
</script>

<template>
<div class="aside-item" :class="{active}">
  {{props.title}}
</div>
</template>

<style scoped>
.aside-item {
  padding: 15px 10px;
  color: var(--gray-color);
  transition: color 0.3s, border-left-color 0.1s, font-weight 0.1s;
  border-left: 4px solid var(--bg-color);
  cursor: pointer;
}

.aside-item.active {
  color: white !important;
  border-color: var(--theme-color);
  font-weight: 600;
  font-size: 20px;
}
</style>