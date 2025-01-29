<template>
  <div id="page_room">
    <div>
      <p class="title">Room: {{ roomName }}</p>
      <div v-if="currentRoom.users.length > 0 && !currentRoom.started" id="players">
        <div v-for="p in currentRoom.users" class="player-item">
          {{ p.username }}
        </div>
      </div>

      <h2 v-if="waiting" class="waiting">En attente des autres joueurs et du choix du leader...</h2>

      <div v-if="!waiting && currentPlayer.cards && currentRoom.status === 'started' && currentPlayer.role != 'leader'">
        <cardSelector :cards="currentPlayer.cards" class="selector" @chooseCard="choosenCards" />
      </div>
    </div>
    <div class="roomButton">
      <div v-if="currentPlayer.role == 'leader' && currentRoom.status !== 'started'">
        <Button @click="startGame()">Démarrer</Button>
      </div>
      <Button variant="link" @click="quitGame()">Quitter</Button>
    </div>

    <div v-if="isAnswered && currentRoom.status === 'started' && currentPlayer.role == 'leader'">
      <span @click="updateCardPosition('down')">fleche de gauche</span>
      <span @click="updateCardPosition('up')">fleche de droite</span>
      <Button @click="Confirm()">Confirmer</Button>
    </div>
  </div>

  <!-- <div v-if="cRoom.wining">
    Le joueur : {{ cRoom.playerWon }} à gagné la game
  </div> -->
</template>

<script lang="ts" setup>
import socket from '../../utils/socket'
import CardSelector from "~/components/global/card/cardSelector.vue";

definePageMeta({
  layout: 'room',
})

const router = useRouter()
let route = useRoute();
let roomName = route.params.slug
let username = route.query.username
let cardPosition = ref(0)

let isAnswered = ref(false);

const waiting = ref(false)

/**
 * This is the CurrentRoom reactive variable who manage the game.
 * If you change something in this varibale it can changing screen,
 * set the winner etc..
 */

let currentRoom = reactive({
  name: '',
  status: '',
  users: [],
  answers: [],
  player_won: ''
})

let currentPlayer = reactive({
  username: '',
  role: '',
  socketId: '',
  cards: [],
  wins: 0
})

onMounted(() => {
  socket.emit('getCurrentRoom', roomName, (cb) => {
    currentRoom.name = cb.room.name
    currentRoom.status = cb.room.status
    currentRoom.users = cb.room.users
    currentRoom.player_won = cb.room.player_won
    currentRoom.answers = cb.answers
  })

  socket.emit('getCurrentPlayer', username, roomName, (cb) => {
    let { user } = cb;
    currentPlayer = user
  })

  socket.emit('roomUpdate', roomName)
})

// fonction qui reçoit la mise a jour des autres salle 
// dans le cas ou un joueur rejoins ou un paramètre est changé
socket.on('roomUpdate', (cb) => {
  currentRoom.name = cb.name
  currentRoom.status = cb.status
  currentRoom.users = cb.users
  currentRoom.player_won = cb.player_won
  currentRoom.answers = cb.answers

  cb.users.forEach(user => {
    if (user.username == username) {
      currentPlayer.cards = user.cards
    }
  });

  console.log('room updated')
})

socket.on('playerUpdate', (user) => {
  console.log('user updated', user)
  currentPlayer.cards = user.cards
  currentPlayer.role = user.role,
    currentPlayer.wins = user.wins
})

socket.on('turn', (room) => {
  console.log('tour suivant dans 10 sec')
  
  setTimeout(() => {
    console.log('turn')

    waiting.value = false
    isAnswered.value = false

    room.users.forEach(user => {
      if (user.username == currentPlayer.username) {
        currentPlayer.cards = user.cards
        currentPlayer.role = user.role
        currentPlayer.wins = user.wins
      }
    });
  }, 1000)

})

function updateCardPosition(param: string) {
  const maxPosition = currentRoom.answers.length - 1;
  switch (param) {
    case 'up':
      cardPosition.value++;
      if (cardPosition.value > maxPosition) {
        cardPosition.value = 0;
      }
      socket.emit('cardPosition', cardPosition.value, roomName)
      break;

    case 'down':
      cardPosition.value--;
      if (cardPosition.value < 0) {
        cardPosition.value = maxPosition;
      }
      socket.emit('cardPosition', cardPosition.value, roomName)
      break;
  }
}

useSeoMeta({
  title: "Banana Split — Salle " + roomName
})

function startGame() {
  socket.emit('startGame', roomName)
}

const choosenCards = (index) => {
  waiting.value = true
  socket.emit('choose-card', roomName, currentPlayer, currentPlayer.cards[index])
}

socket.on('answers', (p) => {
  currentRoom = p;
  isAnswered.value = true
  // console.log(currentRoom)
})

function Confirm() {
  // console.log(currentRoom)
  socket.emit('confirm', roomName, cardPosition.value, (cb) => {
    console.log(cb)
  })
}

</script>