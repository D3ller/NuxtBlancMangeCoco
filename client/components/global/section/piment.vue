<script setup lang="ts">
import AboutCard from "~/components/global/card/aboutCard.vue";

let card: { title: string, text: string }[] = [
  {
    title: "Jouer avec vos amis",
    text: "Rassemblez vos amis et plongez dans des parties endiablées. Préparez-vous à rire, à débattre et à créer des souvenirs mémorables !"
  },
  {
    title: "Créez vos propres sets",
    text: "Laissez libre cours à votre imagination en concevant des sets de cartes personnalisés. Rendez vos parties uniques et adaptées à votre style !"
  },
  {
    title: "Ajouter des sets de cartes",
    text: "Enrichissez vos parties en ajoutant de nouveaux sets de cartes. Découvrez des thèmes variés pour des heures de jeu inédites."
  }
];
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
      <Button href="/set">Découvrir nos sets</Button>
    </div>


  </section>
</template>

<style scoped>

</style>