<script lang="ts" setup>
definePageMeta({
  layout: 'tv'
})

let room = reactive({
  code: "",
  qrCode: "",
  loaded: false,
  started: false,
  players: [],
  bCard: "",
  bCardVisible: true,
  wCards: [],
  cardPosition: 0,
})

let randomName6 = Math.random().toString(36).substring(2, 8);

onMounted(() => {
  socket.emit('create-server', randomName6, (e) => {
    console.log(e)
    room.code = e.room.name
    room.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/join?code=${e.room.name}`
    room.loaded = true
    socket.emit('get-players', room.code, (e) => {
      if (e.players) {
        room.players.push(e.players.users[0])
      }
    })
  })
})

useSeoMeta({
  title: "TV — Salle " + randomName6
})

socket.on('room-update', (e) => {
  console.log(e);
  if (e?.users) {
    room.players = e.users
  }
})

socket.on('blue-card', (e) => {
  console.log(e.text)
  room.started = true;
  room.bCard = e.text
})

socket.on('white_cards', (e) => {
  console.log(e)
  room.wCards = e
})

socket.on('tv', (e) => {
  console.log(e)
})

socket.on('clear', () => {
  room.wCards = []
  room.bCardVisible = false
})

socket.on('updateCardPosition', (e) => {
  room.cardPosition = e;
})

let copyCode = () => {
  navigator.clipboard.writeText(window.location.origin + '/join?code=' + room.code)
}
</script>

<template>
  <div id="page_tv">
    <div v-if="room.loaded" id="tv_loaded">

      <nav class="nav">
        <ClientOnly>
          <div class="nav-item" @click="copyCode">
            Code de connexion:
            <span>{{ room.code }}</span>
          </div>
        </ClientOnly>
        <div class="nav-item">
          <p>Nombre de joueurs:</p>
          <span>{{ room.players.length }}</span>
        </div>
      </nav>

      <NuxtImg v-if="!room.started" :src="room.qrCode" style="width: 300px; height: 300px;"></NuxtImg>
      <h1 v-if="room.players.length-1 >= 3 && !room.started" class="start">Prêt à démarrer ?</h1>
    </div>

    <div style="display: flex; align-items: center; gap: 2rem;">
      <div v-if="room.bCard && room.bCardVisible" style="color:white;">
        <CardGameCard :text="room.bCard" variant=""></CardGameCard>
      </div>

      <div v-if="room.wCards.length > 0" style="color:white;">
        <CardGameCard :text="room.wCards[room.cardPosition].text" variant="word"></CardGameCard>
      </div>
    </div>

    <aside v-if="room.players.length > 0" class="aside">
      <div v-for="p in room.players" class="aside-item">
        <p>{{ p.username.substring(0, 1).toUpperCase() + p.username.substring(1).toLowerCase() }}</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
</style>