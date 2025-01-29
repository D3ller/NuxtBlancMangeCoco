<script lang="ts" setup>
const route = useRoute();
const router = useRouter()

definePageMeta({
  layout: 'tv'
})

// let room = reactive({
//   code: "",
//   qrCode: "",
//   loaded: false,
//   started: false,
//   players: [],
//   bCard: "",
//   wCards: [],
//   cardPosition: 0,
// })

const cardPos = ref(0)

let currentRoom = reactive({
  name: '',
  status: '',
  users: [],
  player_won: '',
  blueCard: '',
  answers: []
})

const qrcode = ref('')

onMounted(() => {
  const roomName = route.query.id

  qrcode.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/join?code=${currentRoom.name}`
  
  socket.emit('getCurrentRoom', roomName, (cb) => {
    // initialisation de l'etat de la room
    currentRoom.name = cb.room.name;
    currentRoom.status = cb.room.status;
    currentRoom.users = cb.room.users;
    currentRoom.player_won = cb.room.player_won;
    currentRoom.blueCard = cb.room.blueCard;
  })

  socket.emit('joinTvGroup', roomName, (cb) => {
    console.log(cb)
  })
})

socket.on('roomUpdate', (cb) => {
  console.log('room updated')
  currentRoom.name = cb.name;
  currentRoom.status = cb.status;
  currentRoom.users = cb.users;
  currentRoom.player_won = cb.player_won;
  currentRoom.answers = cb.answers;
  currentRoom.blueCard = cb.blueCard;
})

socket.on('answers', (room) => {
  currentRoom.answers = room.answers
})

socket.on('updatePos', (pos) => {
  cardPos.value = pos
})

socket.on('kick', () => {
  router.push('/')
})


let copyCode = () => {
  // creation du qrcode
  navigator.clipboard.writeText(window.location.origin + '/join?code=' + route.query.id)
}
</script>

<template>
  <div id="page_tv">
    <div v-if="currentRoom.name" id="tv_loaded">

      <nav class="nav">
        <ClientOnly>
          <div class="nav-item" @click="copyCode">
            Code de connexion:
            <span>{{ route.query.id }}</span>
          </div>
        </ClientOnly>
        <div class="nav-item">
          <p>Nombre de joueurs:</p>
          <span>{{ currentRoom.users.length }}</span>
        </div>
      </nav>

      <NuxtImg v-if="currentRoom.status == 'waiting'" :src="qrcode" style="width: 300px; height: 300px;"></NuxtImg>
      <h1 v-if="currentRoom.users.length >= 3 && !currentRoom.status == 'waiting'" class="start">Prêt à démarrer ?</h1>
    </div>

    <div v-else>
      <iframe src="https://lottie.host/embed/c63d5556-3f80-4f4b-82dd-bd2eae00444c/0tobCTdnYo.lottie"></iframe>
    </div>

    <div style="display: flex; align-items: center; gap: 2rem;">
      <div v-if="currentRoom.blueCard" style="color:white;">
        <CardGameCard :text="currentRoom.blueCard.text" variant=""></CardGameCard>
      </div>

      <div v-if="currentRoom.answers.length > 0" style="color:white;">
        <CardGameCard :text="currentRoom.answers[cardPos].text" variant="word"></CardGameCard>
      </div>
    </div>

    <aside v-if="currentRoom.users.length > 0" class="aside">
      <div v-for="p in currentRoom.users" class="aside-item">
        <p>{{ p.username.substring(0, 1).toUpperCase() + p.username.substring(1).toLowerCase() }}</p>
      </div>
    </aside>
  </div>
</template>

<style scoped></style>