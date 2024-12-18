<template>
  <div id="page_room">
  <div>
    <p class="title">Room: {{ roomName }}</p>
      <div v-if="cRoom.players.length > 0 && !cRoom.started" id="players">
        <div class="player-item" v-for="p in cRoom.players">
          {{ p.username }}
        </div>
  </div>

    <div v-if="cRoom.cards.cards.length > 0 && cRoom.started && cRoom.cards.visible">
      <cardSelector @chooseCard="choosenCards" :cards="cRoom.cards.cards"/>
    </div>
  </div>
  <div v-if="!cRoom.started && cRoom.leader">
  <button @click="quit()">quit</button>
    <button @click="start()">start</button>
  </div>

  <div v-if="cRoom.started && cRoom.leader && cRoom.finalChoice.visible">
    <span @click="updateCardPosition('down')">fleche de gauche</span>
    <span @click="updateCardPosition('up')">fleche de droite</span>
  </div>
  </div>
</template>

<script lang="ts" setup>
import socket from '../../utils/socket'
import CardSelector from "~/components/global/card/cardSelector.vue";

definePageMeta({
  layout: 'room'
})

const router = useRouter()
let route = useRoute();
let roomName = route.params.slug

let cRoom = reactive({
  players: [],
  cards: {
    visible: false,
    cards: []
  },
  started: false,
  leader: false,
  finalChoice: {
    visible: false,
    cardPosition: 0,
    cards: []
  }
})

let choosenCards = (index: number) => {
  socket.emit('choose-card', roomName, index, (e) => {
    console.log(e)
  })

  cRoom.cards.visible = false
}

function quit() {
  socket.emit('leave-room', roomName, (e) => {
    console.log(e)
    router.push('/')
  })
}

function start() {
  socket.emit('start-game', roomName, (e) => {
    console.log(e, "60")
  })
}

function updateCardPosition(param :string) {
  const maxPosition = cRoom.finalChoice.cards.length - 1;
  switch (param) {
    case 'up':
      cRoom.finalChoice.cardPosition++;
      if (cRoom.finalChoice.cardPosition > maxPosition) {
        cRoom.finalChoice.cardPosition = 0;
      }
      socket.emit('cardPosition', cRoom.finalChoice.cardPosition, roomName)
      break;

    case 'down':
      cRoom.finalChoice.cardPosition--;
      if (cRoom.finalChoice.cardPosition < 0) {
        cRoom.finalChoice.cardPosition = maxPosition;
      }
      socket.emit('cardPosition', cRoom.finalChoice.cardPosition, roomName)
      break;
    }
}

onMounted(() => {
  socket.emit('get-players', roomName, (e) => {
    cRoom.players = e.players.users;
    if(e.currentPlayers && e.currentPlayers.role === "leader") {
      cRoom.leader = true;
    }
  })

  window.addEventListener('beforeunload', (event) => {
    quit()
  })
})

socket.on('cards', (e) => {
  console.log(e);
  cRoom.cards.cards = e
  cRoom.cards.visible = true
  cRoom.started = true
})

socket.on('room-update', (e) => {
  console.log(e)
  if (e?.users) {
    cRoom.players = e.users
  }
})

socket.on('final-choice', (e) => {
  cRoom.finalChoice.visible = true;
  cRoom.finalChoice.cards = e;
})
</script>