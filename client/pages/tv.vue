<script setup lang="ts">
import {io} from "socket.io-client";

definePageMeta({
  layout: 'tv'
})

let code = "1234";
let qrCode = ref(null)
let loaded = ref(false)

onMounted(() => {
  qrCode.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/room/${code}`
  loaded.value = true
})

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})

let player = ref([]);

socket.emit('create-server', code, (e) => {
  if(e.status === "error") {
    socket.emit('get-players', code, (e) => {
      player.value = e.clients
    })
  }
})

socket.on('player-joined', (e) => {
  player.value = e.clients
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
          <span :style="player.length-1 === 0 ? 'filter: blur(10px);' : ''">{{
              player.length === 0 ? player.length : player.length - 1
            }}</span>
        </div>
      </nav>

      <NuxtImg style="width: 300px; height: 300px;" :src="qrCode"/>
      <h1 class="start" v-if="player.length-1 >= 3">Prêt à démarrer ?</h1>
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