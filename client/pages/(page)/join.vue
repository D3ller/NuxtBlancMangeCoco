<script setup lang="ts">
import socket from "~/utils/socket";

const route = useRoute();
const router = useRouter();
let username = ref('');
let code = ref(route.query.code);

if(!code.value) {
  navigateTo('/');
}

function joinRoom(Myusername, Code) {
  socket.emit('join-server', Code, Myusername, (e) => {
    console.log(e)
    if(e.status === "error") {
      console.error(e)
      return
    }
    router.push(`room/${Code}`)
  })
}

</script>

<template>
  <div v-if="code"><input v-model="username" placeholder="Username"/>
    <button @click="joinRoom(username, code)">Join room</button>
  </div>
</template>

<style scoped>

</style>