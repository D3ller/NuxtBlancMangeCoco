<script setup lang="ts">
import Progressbar from "@/components/item/progressbar.vue";
import {ref} from 'vue'

let progress = ref(40)
</script>

<template>
  <section>
    <div class="avance-grid">
      <div class="avance-item first">
        <div class="avance-text-container bigger"><p class="avance-text">Avancée</p>
          <p class="avance-text">{{ progress }}%</p></div>
        <Progressbar :progress="progress"></Progressbar>
      </div>
      <div class="avance-item"><p class="avance-text">Lorem ipsum dolor sit amet consectetur. Sed viverra ac enim ac
        posuere nibh. Sit consectetur nec mattis urna
        nulla non aenean laoreet. Dignissim lacus est sit leo sed dictumst maecenas adipiscing adipiscing. Aenean donec
        cras netus ac mattis id ipsum sapien libero.</p></div>
    </div>
  </section>
</template>

<style scoped>
.avance-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.avance-item {
  grid-column: span 6 / span 6;
}

.avance-item.first {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avance-text-container {
  display: flex;
  justify-content: space-between;
}

.avance-text {
  font-size: 18px;
  color: var(--gray-color);
}

.bigger {
  font-size: 20px;
}
</style>