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
</script>
