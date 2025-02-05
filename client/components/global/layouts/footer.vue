<script setup lang="ts">
let footer = [
    {
  title: "Le Jeu",
  subLink: [
    {
      title: "Règles",
      to: "/regles"
    },
    {
      title: "Hub",
      to: "/hub"
    },
    {
      title: "Set de cartes",
      to: "/set"
    }
  ]
},
  {
    title: "Compte",
    subLink: [
      {
        title: "Connexion",
        to: "/login"
      },
      {
        title: "Inscription",
        to: "/register"
      }
    ]
  }

]
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-flex">
        <div class="footer-content"><p class="title">Banana Split</p></div>
        <div class="flex">
          <div class="footer-content" v-for="(f, index) in footer" :key="index">
            <p class="title">{{ f.title }}</p>
            <div v-if="f.subLink" class="sub-link">
              <nuxt-link v-for="(s, index) in f.subLink" :key="index" :to="s.to">{{ s.title }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>