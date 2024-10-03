<template>
  <div v-if="player" v-for="p in player">
    {{p}}
  </div>

  <div v-for="(i, index) in 11" @click="selectCard(index)">
    <card-game-card :text="route.params.salleSlug" :key="index"></card-game-card>
  </div>
</template>

<script lang="ts" setup>
import {io} from "socket.io-client";

let route = useRoute();
console.log(route.params.salleSlug)

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})

let player = ref(null)

socket.emit('getPlayers', route.params.salleSlug, (err, response) => {
  if(err) {
console.log(err)
    player.value = err.client
  } else {
    console.log(response.test)
  }
})

let selectCard = (id) => {
  alert(id)
  socket.emit('selectCard', (id))
}
</script>