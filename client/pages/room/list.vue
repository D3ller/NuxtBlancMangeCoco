<script setup lang="ts">
import RoomCard from "~/components/global/card/roomCard.vue";

let rooms = ref(null)

socket.emit('get-rooms', (e) => {
  console.log(e)
  rooms.value = e
})

socket.on('rooms', (e) => {
  console.log(e)
  rooms.value = e
})

onUnmounted(() => {
  socket.off('rooms')
})
</script>

<template>
<div id="page_room_list">
  <div class="container">
    <h2>Listes des Rooms</h2>
    <div class="room_grid">
      <room-card v-for="room in rooms" :key="room.code" :code="room.name" :people="room.users"></room-card>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>