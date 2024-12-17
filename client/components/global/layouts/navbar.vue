<script setup lang="ts">
import {useAuthUser} from "~/composables/useAuthUser";
import UserDetail from "~/components/userDetail.vue";

const user = useAuthUser();
</script>

<template>
<nav class="navbar">
  <div class="container">
    <div class="navbar-flex">
      <p>Banana Split</p>

      <div></div>


      <div class="navbar-button" v-if="!user">
        <Button href="/register" variant="link">S'inscrire</Button>
        <Button href="/login">Se connecter</Button>
      </div>

      <div v-if="user">
        <UserDetail v-if="user" :user="user" />
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>

</style>