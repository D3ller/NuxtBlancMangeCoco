<script setup>
import HeaderBanner from "~/components/global/section/headerBanner.vue";
import Piment from "~/components/global/section/piment.vue";
import FAQ from "~/components/global/section/FAQ.vue";

import Button from "~/components/global/button.vue";
const router = useRouter()

import socket from '../utils/socket'


let text = ref('')
let username = ref('')


function joinRoom(Myusername) {
  socket.emit('join-server', 'test', Myusername, (e) => {
    if(e.status === "error") {
      console.error(e)
      return
    }
    console.log(e)
    router.push(`room/test`)
  })
}

socket.on('error', (err) => {
  alert(err)
})

</script>

<template>

  <div id="page_home">
    <header-banner></header-banner>
    <piment></piment>
    <f-a-q></f-a-q>

  </div>

  <!-- <game-card text="j'ai des margiela a mes  pieds toi t'en a pas lalalilalair" variant=""></game-card> -->

  <input v-model="username" placeholder="username">
  <Button @click="joinRoom(username)">Join room</Button>
  <!-- <Button v-if="created" @click="launchParty">Lancer la partie</Button> -->
  ======= ssssssss
</template>

<style scoped>

</style>