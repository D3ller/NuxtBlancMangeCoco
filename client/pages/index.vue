<script setup>
import socket from '../utils/socket'
import HeaderBanner from "~/components/global/section/headerBanner.vue";
import Piment from "~/components/global/section/piment.vue";
import FAQ from "~/components/global/section/FAQ.vue";
import Button from "~/components/global/button.vue";

useSeoMeta({
  title: "Banana Split — Jeu de cartes inspiré de Blanc Manger Coco",
})

const router = useRouter()

let text = ref('')
let username = ref('')

function joinRoom(Myusername, code) {
  socket.emit('join-server', code, Myusername, (e) => {
    console.log(e)
    if(e.status === "error") {
      console.error(e)
      return
    }
    router.push(`room/${code}`)
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
<section class="join-party">
  <div class="container">
      <h2>Rejoindre une partie?</h2>
      <div class="max-party">
      <input placeholder="Code d'invitation" v-model="text">
      <input v-model="username" placeholder="Votre pseudo">
      <Button style="cursor: pointer" @click="joinRoom(username, text)">Rejoindre</Button>
      </div>
  </div>
</section>


  </div>



</template>

<style scoped>

</style>