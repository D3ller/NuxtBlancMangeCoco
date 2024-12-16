<script setup lang="ts">
definePageMeta({
  middleware: 'user-only'
})

const user = useAuthUser();
</script>

<template>
  {{ user }}
  <div id="page_profile">
    <div class="container">
      <div class="profile">
        <NuxtImg class="avatar"></NuxtImg>
        <h1 style="font-size: 2rem; color: white; font-weight: 700; margin-bottom: 0.5rem">Kora</h1>
        <p class="name">{{ user.email }}</p>

      </div>
      <div class="roles">
        <h2 style="font-size: 2rem; color: white; font-weight: 700; margin-bottom: 0.5rem">Rôles</h2>

        <div class="role" v-if="user.roles" v-for="(r, index) in user.roles" :key="index">
          {{ r }}
        </div>
      </div>

      <div class="stats">
        <h2 style="font-size: 2rem; color: white; font-weight: 700; margin-bottom: 0.5rem">Statistiques</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>