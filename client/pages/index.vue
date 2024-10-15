<script setup>

import {io} from 'socket.io-client'
import HeaderBanner from "~/components/global/section/headerBanner.vue";
import Piment from "~/components/global/section/piment.vue";
import FAQ from "~/components/global/section/FAQ.vue";

const router =useRouter()

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})

let text = ref('')
let created = ref(false)

let createRoom = () => {
  socket.emit('create-room', text.value)
}

let joinRoom = () => {
  socket.emit('join-room', text.value)
}

socket.on('room-created', (message) => {
  created.value = true
router.push('/salle/'+message)
})
</script>

<template>

  <div id="page_home">
    <header-banner></header-banner>
    <piment></piment>
    <f-a-q></f-a-q>

  </div>
  <!--  <div>-->
  <!--    <Button >Se connecter</Button>-->
  <!--    <Button variant="link">Se connecter</Button>-->
  <!--    <Button variant="light">Se connecter</Button>-->
  <!--    <Button variant="dark">Se connecter</Button>-->
  <!--  </div>-->

  <!--  <game-card text="j'ai des margiela a mes  pieds toi t'en a pas lalalilalair" variant=""></game-card>-->

  <!--  <input v-model="text">-->
  <!--  <Button @click="createRoom()">Crée une room</Button>-->
  <!--  <Button @click="joinRoom()">Join room</Button>-->
  <!--  <Button v-if="created" @click="launchParty">Lancer la partie</Button>-->
  <!--  </div>-->

</template>

<style scoped>

</style>