<script setup lang="ts">
let props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isExtended: {
    type: Boolean,
    default: false
  }
})

let emit = defineEmits(['toggle'])

let extended = ref(false)
let item = ref(null)

watch(() => props.isExtended, (newVal) => {
  extended.value = newVal
})

let extend = () => {
  console.log('open')
  extended.value = !extended.value
  emit('toggle', extended.value)
}
</script>

<template>
  <div class="faq-item" @click="extend" ref="item" :class="{ 'extended': extended }">
    <p class="title">{{ title }}</p>

      <div v-if="extended">
        {{ content }}
      </div>

  </div>
</template>
