<script setup lang="ts">

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
  wCards: [],
  cardPosition: 0,
})

let randomName6 = Math.random().toString(36).substring(2, 8);

socket.emit('create-server', randomName6, (e) => {
  console.log(e)
  room.code = e.room.name
  room.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/join?code=${e.room.name}`
  room.loaded = true
    socket.emit('get-players', room.code, (e) => {
      if(e.players) {
        room.players.push(e.players.users[0])
      }
    })
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

socket.on('updateCardPosition', (e) => {
room.cardPosition = e;
})
</script>

<template>
  <div id="page_tv">
    <div id="tv_loaded" v-if="room.loaded">

      <nav class="nav">
        <div class="nav-item">
          Code de connexion:
          <span>{{ room.code }}</span>
        </div>
        <div class="nav-item">
          <p>Nombre de joueurs:</p>
          <span>{{room.players.length}}</span>
        </div>
      </nav>

      <NuxtImg style="width: 300px; height: 300px;" :src="room.qrCode" v-if="!room.started"></NuxtImg>
      <h1 class="start" v-if="room.players.length-1 >= 3 && !room.started">Prêt à démarrer ?</h1>
    </div>

    <div style="display: flex; align-items: center; gap: 2rem;">
    <div v-if="room.bCard" style="color:white;">
      <CardGameCard :text="room.bCard" variant=""></CardGameCard>
    </div>

    <div v-if="room.wCards.length > 0" style="color:white;">
      <CardGameCard :text="room.wCards[room.cardPosition].text" variant="word"></CardGameCard>
    </div>
  </div>

    <aside class="aside" v-if="room.players.length > 0">
      <div class="aside-item" v-for="p in room.players">
        <p>{{ p.username.substring(0, 1).toUpperCase() + p.username.substring(1).toLowerCase() }}</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
</style>