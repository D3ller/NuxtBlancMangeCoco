<script setup lang="ts">
import AsideItem from "@/components/item/asideItem.vue";
import { ref } from "vue";

let menu : {title: string, active: boolean} = ref([
  {title: "Description du projet", active: true, slug: "description"},
  {title: "Note de cadrage", active: false, slug: "note"},
  {title: "Planning", active: false, slug: "planning"},
  {title: "Etat de l'art du domaine", active: false, slug: "etat"},
  {title: "Avancée du projet", active: false, slug: "avance"},
])

const emit = defineEmits(['scrollTo'])

let updateActive = (e) => {
  menu.value.forEach(i => {
    i.active = false
  })

  menu.value[e].active = true
  emit('scrollTo', menu.value[e].slug)

}
</script>

<template>
  <div class="aside-menu">
    <aside-item v-for="(i, index) in menu" :title="i.title" :active="i.active"
                @click="updateActive(index)"></aside-item>
  </div>
</template>

<style scoped>
.aside-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>