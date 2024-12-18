<script setup lang="ts">

import GameCard from "~/components/global/card/gameCard.vue";
</script>

<template>
  <div class="noise">
    <section class="container">
      <div class="hB">
        <h1 class="hB-title">Revivez des moments fun entre amis !</h1>
        <p class="hB-description">
          Un moment où tout est permis : des fous rires, des actions fun, des vérités et autre piments
          dans les parties entre amis.
        </p>
      </div>

      <div class="buttonSection">
        <Button variant="link">Jouer maintenant !</Button>
        <Button>Créer une partie</Button>
      </div>

        <div class="cardSection">
          <GameCard text="Faire pipi dans la piscine et accuser un enfant." variant=""></GameCard>
          <GameCard text="Le secret pour vivre jusqu’à 100 ans, c’est __________." variant="word"></GameCard>
        </div>
    </section>
  </div>
</template>

<style scoped>

</style>