<script setup lang="ts">

import UserDetail from "~/components/userDetail.vue";
import {useAuthUser} from "~/composables/useAuthUser";
const user = useAuthUser();
</script>

<template>
  <UserDetail v-if="user" :user="user" />
  <slot></slot>
</template>

<style scoped>

</style>