<script setup lang="ts">

definePageMeta({
  layout: 'tv'
})

let code = ref(null)
let qrCode = ref(null)
let loaded = ref(false)

let player = ref([]);
let randomName6 = Math.random().toString(36).substring(2, 8);

let bCard :string = ref("");

socket.emit('create-server', randomName6, (e) => {
  console.log(e)
  code.value = e.room.name
  qrCode.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/join?code=${e.room.name}`
  loaded.value = true
    socket.emit('get-players', code.value, (e) => {
      if(e.players) {
        player.value.push(e.players.users[0])
      }
    })
})

socket.on('room-update', (e) => {
  console.log(e);
  if (e?.users) {
    player.value = e.users
  }
})

socket.on('blue-card', (e) => {
  console.log(e.text)
  bCard.value = e.text
})

socket.on('tv', (e) => {
  console.log(e)
})
</script>

<template>
  <div id="page_tv">
    <div id="tv_loaded" v-if="loaded">

      <nav class="nav">
        <div class="nav-item">
          Code de connexion:
          <span>{{ code }}</span>
        </div>
        <div class="nav-item">
          <p>Nombre de joueurs:</p>
          <span>{{player.length}}</span>
        </div>
      </nav>

      <NuxtImg style="width: 300px; height: 300px;" :src="qrCode"/>
      <h1 class="start" v-if="player.length-1 >= 3">Prêt à démarrer ?</h1>
    </div>

    <div v-if="bCard">
      {{ bCard }}
    </div>

    <aside class="aside" v-if="player.length > 0">
      <div class="aside-item" v-for="p in player">
        <p>{{ p.username.substring(0, 1).toUpperCase() + p.username.substring(1).toLowerCase() }}</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
</style>