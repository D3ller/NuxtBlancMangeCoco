<script setup lang="ts">
import Avatar from "~/components/global/Avatar.vue";

let props = defineProps<{user: object}>();
</script>

<template>
  <NuxtLink :to="{name: 'profile'}">
    <Avatar class="rounded" :alt="props.user.email" :src="props.user.email"/>
  </NuxtLink>
</template>

<style scoped>

</style>