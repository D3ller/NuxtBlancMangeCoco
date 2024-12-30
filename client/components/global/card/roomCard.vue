<script setup lang="ts">
let props = defineProps<{
  code: string,
  people: number
}>();
</script>

<template>
  <ClientOnly>
      <div class="roomCard">
        <p class="title">{{ props.code }}</p>
        <p class="player">{{props.people}}/8</p>
        <div class="roomCard_button">
          <Button variant="link">QR Code</Button>
          <Button :href="'/join?code='+props.code">Rejoindre</Button>
        </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>