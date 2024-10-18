<script setup>

import {io} from 'socket.io-client'
import HeaderBanner from "~/components/global/section/headerBanner.vue";
import Piment from "~/components/global/section/piment.vue";
import FAQ from "~/components/global/section/FAQ.vue";

import Button from "~/components/global/button.vue";
import GameCard from "~/components/global/card/gameCard.vue";
const router = useRouter()

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})

let text = ref('')
// let created = ref(false)

function createRoom(roomName) {
  socket.emit('create-server', roomName, (response) => {
    console.log(response);
    if (response.status === "room created") {
      console.log(response.data);
      router.push(`/room/${roomName}`);
    } else if (response.status === "error") {
      console.error(response.message); // Afficher l'erreur côté client
    }
  });
}


function joinRoom(roomName) {
  socket.emit('join-server', roomName, (e) => {
    console.log(e)
    router.push(`room/${roomName}`)
  })
  router.push(`room/${roomName}`)
}
// socket.on('player-joined', (e) => {
//   console.log(e)
// })

socket.on('error', (err) => {
  alert(err)
})

</script>

<template>

  <div id="page_home">
    <header-banner></header-banner>
    <piment></piment>
    <f-a-q></f-a-q>

  </div>

  <!-- <game-card text="j'ai des margiela a mes  pieds toi t'en a pas lalalilalair" variant=""></game-card> -->

  <input v-model="text">
  <Button @click="createRoom(text)">Crée une room</Button>
  <Button @click="joinRoom(text)">Join room</Button>
  <!-- <Button v-if="created" @click="launchParty">Lancer la partie</Button> -->
  ======= ssssssss
</template>

<style scoped>

</style>