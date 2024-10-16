<script setup lang="ts">
import AboutCard from "~/components/global/card/aboutCard.vue";

let card: { title: string, text: string } = [{
  title: "Crée vos propres cartes",
  text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. \n" +
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.  "
}, {
  title: "Ajouter des sets de carte",
  text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. \n" +
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.  "
}]
</script>

<template>
  <section class="piment">
    <div class="container">
      <h2>Ajouter du piment à vos parties</h2>

      <div class="grid">
<div v-for="c in card" class="grid_cols">
  <about-card :title="c.title" :text="c.text"></about-card>
</div>
      </div>

    </div>

    <div class="flex">
      <Button variant="dark">Découvrir nos sets</Button>
    </div>


  </section>
</template>

<style scoped>

</style>