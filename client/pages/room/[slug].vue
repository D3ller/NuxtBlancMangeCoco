<template>
  <div id="page_room">
  <div>
    <p class="title">Room: {{ roomName }}</p>
      <div v-if="players" id="players">
        <div class="player-item" v-for="p in players.clients">
      {{ p.username }} <span v-if="p.role === 'partyist'">(Admin)</span>
        </div>
  </div>
  <div v-else>
    No players yet
  </div>
  </div>
  <button @click="quit()">quit</button>
  </div>
</template>

<script lang="ts" setup>
import { io } from "socket.io-client";
let players = ref()

definePageMeta({
  layout: 'room'
})

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

onMounted(() => {
  socket.emit('get-players', roomName, (e) => {
    console.log(e)
    players.value = e
  })
})

socket.on('player-joined', (e) => {
  console.log(e)
  players.value = e
  console.log(players)
})
</script>