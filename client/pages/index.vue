<script setup>

import Button from "~/components/global/button.vue";
import GameCard from "~/components/global/card/gameCard.vue";
import { io } from 'socket.io-client'
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
  <div>
    <Button >Se connecter</Button>
    <Button variant="link">Se connecter</Button>
    <Button variant="light">Se connecter</Button>
    <Button variant="dark">Se connecter</Button>
  </div>

  <game-card text="j'ai des margiela a mes  pieds toi t'en a pas lalalilalair" variant=""></game-card>

  <input v-model="text">
  <Button @click="createRoom()">Crée une room</Button>
  <Button @click="joinRoom()">Join room</Button>
  <Button v-if="created" @click="launchParty">Lancer la partie</Button>
=======
  ssssssss
</template>

<style scoped>

</style>