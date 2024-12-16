<script setup lang="ts">
import Navbar from "~/components/global/layouts/navbar.vue";
</script>

<template>
  <Navbar></Navbar>
  <slot></slot>
  <LayoutsFooter></LayoutsFooter>
</template>

<style scoped>

</style>