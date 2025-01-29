<script lang="ts" setup>
import {useAuthUser} from "~/composables/useAuthUser";
import UserDetail from "~/components/userDetail.vue";

const user = useAuthUser();
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-flex">
        <NuxtLink to="/">Banana Split</NuxtLink>

        <div></div>


        <div v-if="!user" class="navbar-button">
          <Button href="/register" variant="link">S'inscrire</Button>
          <Button href="/login">Se connecter</Button>
        </div>

        <div v-if="user">
          <UserDetail v-if="user" :user="user"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>