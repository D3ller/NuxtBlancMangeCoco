<script setup lang="ts">

import UserDetail from "~/components/userDetail.vue";
import {useAuthUser} from "~/composables/useAuthUser";
import Navbar from "~/components/global/layouts/navbar.vue";
const user = useAuthUser();
</script>

<template>
  <Navbar></Navbar>
  <UserDetail v-if="user" :user="user" />
  <slot></slot>
  <LayoutsFooter></LayoutsFooter>
</template>

<style scoped>

</style>