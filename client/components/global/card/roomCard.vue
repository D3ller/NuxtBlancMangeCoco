<script lang="ts" setup>
let props = defineProps<{
  code: string,
  people: number
}>();

let qrVisible = ref(false)
let location = window.location.href

function spawnQR() {
  qrVisible.value = !qrVisible.value;
  document.body.style.overflow = qrVisible.value ? 'hidden' : 'auto'
}
</script>

<template>
  <ClientOnly>
    <div v-if="qrVisible" class="white_screen" @click="spawnQR">
      <NuxtImg :src="generateQR(location+'/join?code='+props.code)" class="qr"/>
    </div>
    <div class="roomCard">
      <p class="title">{{ props.code }}</p>
      <p class="player">{{ props.people }}/8</p>
      <div class="roomCard_button">
        <Button variant="link" @click="spawnQR">QR Code</Button>
        <Button :href="'/join?code='+props.code">Rejoindre</Button>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>