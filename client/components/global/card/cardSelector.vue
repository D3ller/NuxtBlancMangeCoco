<script setup lang="ts">
let props = defineProps({
  cards: Array
})

console.log(props.cards)

let emit = defineEmits(['choose-card'])

function chooseCard(index: number) {
  emit('choose-card', index)
}
</script>

<template>
<div style="display: flex; gap: 1rem">
  <card-game-card @click="chooseCard(index)" v-for="(c, index) in props.cards" :text="c.text" variant="word"></card-game-card>
</div>
</template>

<style scoped>

</style>