<script setup lang="ts">
import socket from "~/utils/socket";

definePageMeta({
  layout: 'tv'
})

const route = useRoute();
const router = useRouter();
let username = ref('');
let code = ref(route.query.code);
let error = ref('');

if(!code.value) {
  navigateTo('/');
}

function joinRoom(Myusername, Code) {
  socket.emit('join-server', Code, Myusername, (e) => {
    console.log(e)
    if (!e.success) {
      error.value = e.message
      return
    }
    error.value = 'you are in'
    router.push(`room/${Code}`)
  })
}

</script>

<template>
  <div id="page_join_room" v-if="code">
    <div class="container">
      <h2>Rejoindre une room</h2>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="join_room"><input v-model="username" placeholder="Nom d'utilisateur"/>
        <Button @click="joinRoom(username, code)">Rejoindre</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>