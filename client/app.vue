<template>
<NuxtLayout>
  <NuxtPage/>
</NuxtLayout>
</template>


<script setup>
import { io } from 'socket.io-client'

const socket = io.connect('http://10.152.5.52:6060');

socket.on('connect', () => {
  console.log('Successfully connected!');
});

socket.on('id', (e) => {
console.log(e)
})

socket.emit('create-server', 'test', (response) => {
  if (response.success) {
    console.log('Room created successfully:', response.message);
  } else {
    console.error('Failed to create room:', response.message);
  }
});


// socket.on('connect', () => {
//   console.info('connect')
// })
//
// socket.on('id', (id) => {
//   console.log(id)
// })

</script>
