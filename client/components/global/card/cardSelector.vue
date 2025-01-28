<script setup lang="ts">
let props = defineProps({
  cards: Array
})

console.log(props.cards)

let emit = defineEmits(['choose-card'])

function chooseCard(index: number, id) {
  emit('choose-card', index, id)
}
</script>

<template>
<div style="display: flex; gap: 1rem">
  <card-game-card v-for="(c, index) in props.cards" :key="c._id" :text="c.text" variant="word" @click="chooseCard(index, c._id)"></card-game-card>
</div>
</template>

<style scoped>

</style>