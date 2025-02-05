<template>
<NuxtLayout>
  <NuxtPage/>
</NuxtLayout>
</template>


<script setup>
import socket from './utils/socket'

socket.on('connect', () => {
  console.log('Successfully connected!');
});

// socket.on('id', (e) => {
//   console.log(e)
// })
</script>
