<template>
  <div id="page_room">
  <div>
    <p class="title">Room: {{ roomName }}</p>
      <div v-if="players" id="players">
        <div class="player-item" v-for="p in players">
          {{ p.username }}
        </div>
  </div>
  <div v-else>
    No players yet
  </div>
  </div>
  <button @click="quit()">quit</button>
    <button @click="start()">start</button>
  </div>
</template>

<script lang="ts" setup>
import socket from '../../utils/socket';

let players = ref()

definePageMeta({
  layout: 'room'
})

let route = useRoute();
let roomName = route.params.slug;

let rooms = reactive({
  players: [],
  started: false,
})

async function quit() {
  alert('quit')
  await socket.emit('leave-players', roomName, (e) => {
    console.log(e);
  })
  // socket.disconnect()
  // router.push('/')
}

function start() {
  socket.emit('start-game', roomName, (e) => {
    console.log(e);
  })
}

onMounted(() => {
  socket.emit('get-players', roomName, (e) => {
    console.log(e.players.users);
    players.value = e.players.users;
  })
})

socket.on('room-update', (e) => {
  console.log(e);
  if (e.users) {
    players.value = e?.users;
  }
  // players.value = e.users;
})

socket.on('cards', (e) => {
  console.log(e);
})
</script>