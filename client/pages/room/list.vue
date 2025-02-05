<script setup lang="ts">
import RoomCard from "~/components/global/card/roomCard.vue";

let rooms = ref([])

socket.emit('getRooms', (e) => {
  // console.log(e)
  rooms.value = e.rooms
})

socket.on('rooms', (e) => {
  console.log('rooms', e)
  rooms.value = e || []
})

// onUnmounted(() => {
//   socket.off('rooms')
// })
</script>

<template>
  <div id="page_room_list">
    <div class="container">
      <h2>Listes des Rooms</h2>
      <div class="room_grid" v-if="rooms.length">
        <room-card v-for="room in rooms" :key="room" :code="room.name" :people="room.users.length"></room-card>
      </div>
      <div v-else class="loader">
        <iframe src="https://lottie.host/embed/c63d5556-3f80-4f4b-82dd-bd2eae00444c/0tobCTdnYo.lottie"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>

.loader {
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>