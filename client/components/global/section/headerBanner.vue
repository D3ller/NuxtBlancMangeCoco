<script setup lang="ts">

import GameCard from "~/components/global/card/gameCard.vue";
</script>

<template>
  <div class="noise">
    <section class="container grid">
      <div class="grid_cols">
        <h1 class="hB-title"><span class="hB-gradient">Revivez des moments fun entre amis !</span></h1>
        <p class="hB-description">
          Un moment où tout est permis : des fous rires, des actions fun, des vérités et autre piments
          dans les parties entre amis.
        </p>

        <Button variant="light">Jouer maintenant !</Button>
      </div>
      <div class="grid_cols">
        <div class="cardSection">
          <GameCard text="Faire pipi dans la piscine et accuser un enfant." variant=""></GameCard>
          <GameCard text="Le secret pour vivre jusqu’à 100 ans, c’est __________." variant="word"></GameCard>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>