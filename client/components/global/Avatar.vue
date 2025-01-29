<script setup lang="ts">
let props = defineProps<{
  src?: string;
  alt: string;
}>();

let regexUrl = new RegExp("(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})(\\.[a-zA-Z0-9]{2,})?\n");
let url = ref(false)

url.value = props.src && regexUrl.test(props.src);

</script>

<template>
  <NuxtImg :width="50" :height="50" v-if="src && url">
  </NuxtImg>

  <div style="width: 50px; height: 50px; background-color: #1e1e1e; border: 1px solid rgba(69,69,69,0.42); display: flex; justify-content: center; align-items: center" v-else>
    <span>{{props.alt[0].toUpperCase()}}</span>
  </div>
</template>

<style scoped>

</style>