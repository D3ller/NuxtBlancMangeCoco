<script setup lang="ts">

import AsideMenu from "@/components/item/asideMenu.vue";

let scrollInside = (e) => {
  console.log(e)
  let el = document.getElementById(e)
  el.scrollIntoView({behavior: "smooth"})
}
</script>

<template>
  <div class="aside-grid">
    <div class="aside-grid-item">
      <aside-menu @scrollTo="scrollInside"></aside-menu>
    </div>
    <div class="aside-grid-item-2">
      <div class="aside-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aside-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
}

.aside-grid-item {
  grid-column: span 3 / span 3;
}

.aside-grid-item-2 {
  grid-column: span 9 / span 9;
}

.aside-content {
  padding: 20px;
  color: var(--gray-color);
  overflow-y: scroll;
}

.aside-content h2 {
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

</style>