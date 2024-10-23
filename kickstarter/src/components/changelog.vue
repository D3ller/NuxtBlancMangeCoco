<script setup lang="ts">

import AsideMenu from "@/components/item/asideMenu.vue";

let scrollInside = (e : any) => {
  console.log(e)
  let el = document.getElementById(e)
  el?.scrollIntoView({behavior: "smooth"})
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
  margin-top: 80px;
}

.aside-grid-item {
  grid-column: span 3 / span 3;
}

.aside-grid-item-2 {
  grid-column: span 9 / span 9;
}

.aside-content {
  padding: 20px;
  color: white;
  overflow-y: scroll;
  height: 100vh;
  font-size: 20px;
}

.title {
  font-size: 40px;
}

.aside-content::-webkit-scrollbar {
  width: 4px;
}

.aside-content::-webkit-scrollbar-thumb {
  background-color: var(--gray-color);
}

.aside-content::-webkit-scrollbar-track {
  background-color: var(--bg-secondary);
}


.aside-content h2 {
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

</style>