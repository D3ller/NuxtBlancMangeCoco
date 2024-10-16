<template>
  <!-- <div v-if="player" v-for="p in player">
    {{p}}
  </div> -->

  <!-- <div v-for="(i, index) in 11" @click="selectCard(index)">
    <card-game-card :text="route.params.salleSlug" :key="index"></card-game-card>
  </div> -->
  <div>
    <p>liste des joueurs</p>
      <div v-if="players?.length > 0">
    <div v-for="player in players" :key="player">
      {{ player }}
    </div>
  </div>
  <div v-else>
    No players yet
  </div>
  </div>
  <button @click="quit()">quit</button>
</template>

<script lang="ts" setup>
import { io } from "socket.io-client";
let players = []


const router = useRouter()
let route = useRoute();
// console.log(route.params.slug)

let roomName = route.params.slug

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})


function quit() {
  socket.disconnect()
  router.push('/')
}

socket.on('player-joined', (e) => {
  console.log(e)
  players.push(e)
  console.log(players[0])
})

watch(players.value, (p) => {
  console.log(`x is ${p}`)
})

let selectCard = (id) => {
  alert(id)
  socket.emit('selectCard', (id))
}
</script>