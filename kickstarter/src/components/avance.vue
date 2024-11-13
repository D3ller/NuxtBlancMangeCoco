<script setup lang="ts">
import Progressbar  from "../components/item/progressbar.vue";
import {ref} from 'vue'

let progress = ref(33)
</script>

<template>
  <section>
    <div class="avance-grid">
      <div class="avance-item first">
        <div class="avance-text-container bigger"><p class="avance-text">Avancée</p>
          <p class="avance-text">{{ progress }}%</p>
        </div>
        <Progressbar :progress="progress"></Progressbar>
      </div>
      <div class="avance-item">
        <p class="avance-text">
          Banana Split est un jeu de carte multijoueur en ligne. Le jeu s'inspire de Blanc Manger Coco et de Cards Against Humanity. Le but est de créer des combinaisons de cartes pour faire rire les autres joueurs. <br>
          Le joueur qui a le plus de points à la fin de la partie gagne.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avance-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 100px;
  margin: 100px 0;
}

.avance-item {
  grid-column: span 6 / span 6;
}

.avance-item.first {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avance-text-container {
  display: flex;
  justify-content: space-between;
}

.avance-text {
  font-size: 20px;
  color: var(--gray-color);
}

.bigger {
  font-size: 26px;
}
</style>