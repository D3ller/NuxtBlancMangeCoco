<template>
<NuxtLayout>
  <NuxtPage/>
</NuxtLayout>
</template>


<script setup>
import { io } from 'socket.io-client'

const socket = io({
  path: '/api/ws',
  addTrailingSlash: false,
})

socket.on('connect', () => {
  console.info('connect')
})

socket.on('id', (id) => {
  console.log(id)
})

</script>
