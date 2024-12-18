<script setup>
import socket from '../utils/socket'
import HeaderBanner from "~/components/global/section/headerBanner.vue";
import Piment from "~/components/global/section/piment.vue";
import FAQ from "~/components/global/section/FAQ.vue";
import Button from "~/components/global/button.vue";

const router = useRouter()

let text = ref('')
let username = ref('')

function joinRoom(Myusername) {
  socket.emit('join-server', 'test', Myusername, (e) => {
    console.log(e)
    if(e.status === "error") {
      console.error(e)
      return
    }
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


  <input v-model="username" placeholder="username">
  <Button @click="joinRoom(username)">Join room</Button>
</template>

<style scoped>

</style>