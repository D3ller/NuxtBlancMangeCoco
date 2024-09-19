<script setup lang="ts">
import AsideItem from "@/components/item/asideItem.vue";
import { ref } from "vue";

let menu : {title: string, active: boolean} = ref([
  {title: "Description du projet", active: true},
  {title: "Note de cadrage", active: false},
  {title: "Planning", active: false},
  {title: "Etat de l'art du domaine", active: false},
  {title: "Avancée du projet", active: false}
])

let updateActive = (e) => {
  menu.value.forEach(i => {
    i.active = false
  })

  menu.value[e].active = true

}
</script>

<template>
<aside-item v-for="(i, index) in menu" :title="i.title" :active="i.active" @click="updateActive(index)"></aside-item>
</template>

<style scoped>

</style>