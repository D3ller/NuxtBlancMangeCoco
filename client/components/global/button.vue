<script setup lang="ts">
let props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "default",
    validator(value, props) {
      return ['default', 'link', 'dark'].includes(value)
    }
  },
  href: {
    type: String || Object,
    required: false
  },
  target: {
    type: String,
    default: '',
    validator(value, props) {
      return ["", "_blank", "_self"]
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})



</script>

<template>
  <button :class="'button-'+props.variant" v-if="!props.href" :disabled="props.disabled">
    <slot></slot>
  </button>

  <NuxtLink v-else :class="'button-'+props.variant" :to="props.href" :target="props.target" :disabled="props.disabled">
    <slot/>
  </NuxtLink>
</template>

<style scoped></style>
