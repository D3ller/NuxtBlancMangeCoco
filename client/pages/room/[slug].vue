<template>
  <div id="page_room">
  <div>
    <p class="title">Room: {{ roomName }}</p>
      <div v-if="cRoom.players.length > 0" id="players">
        <div class="player-item" v-for="p in cRoom.players">
          {{ p.username }}
        </div>
  </div>
  <div v-else>
    No players yet
  </div>

    <div v-if="cRoom.cards.cards.length > 0 && cRoom.started && cRoom.cards.visible">
      <cardSelector @chooseCard="choosenCards" :cards="cRoom.cards.cards"/>
    </div>
  </div>
  <button @click="quit()">quit</button>
    <button @click="start()">start</button>
  </div>
</template>

<script lang="ts" setup>
import socket from '../../utils/socket'
import CardSelector from "~/components/global/card/cardSelector.vue";

definePageMeta({
  layout: 'room'
})

const router = useRouter()
let route = useRoute();
let roomName = route.params.slug

let cRoom = reactive({
  players: [],
  cards: {
    visible: false,
    cards: []
  },
  started: false
})

let choosenCards = (index: number) => {
  socket.emit('choose-card', roomName, index, (e) => {
    console.log(e)
  })

  cRoom.cards.visible = false
}

function quit() {
  socket.emit('leave-room', roomName, (e) => {
    console.log(e)
    router.push('/')
  })
}

function start() {
  socket.emit('start-game', roomName, (e) => {
    console.log(e)
  })
}

onMounted(() => {
  socket.emit('get-players', roomName, (e) => {
    console.log(e)
    cRoom.players = e.players.users;
  })
})

socket.on('cards', (e) => {
  console.log(e);
  cRoom.cards.cards = e
  cRoom.cards.visible = true
  cRoom.started = true
})

socket.on('card-chosen', (e) => {
  console.log(e)
})

socket.on('room-update', (e) => {
  console.log(e)
  if (e?.users) {
    cRoom.players = e.users
  }
})
</script>