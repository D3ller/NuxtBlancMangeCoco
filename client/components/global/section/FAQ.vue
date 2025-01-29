<script setup lang="ts">
import FaqItems from "~/components/global/item/faqItems.vue";

let faqItem: { title: string, content: string } = [
  {
    title: "De quel matériel ai-je besoin pour jouer\n?",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fring"
  },
  {
    title: "A qui le jeu s’adresse-il\n?",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fring"
  },
  {
    title: " Peut-on jouer à distance ou uniquement en présentiel\n?",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fring"
  },
  {
    title: "Comment gagner dans Banana Split\n?",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fring"
  },
  {
    title: "Qui sommes-nous\n?",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fring"
  },


]

let activeIndex = ref(-1)

let toggleItem = (index: number, isOpen: boolean) => {
  if (isOpen) {
    activeIndex.value = index
  } else {
    activeIndex.value = -1
  }
}
</script>

<template>
  <section class="faq">
    <div class="container"><h2>FAQ</h2>

      <div class="faq-container">
        <faq-items
            v-for="(f, index) in faqItem"
            :key="index"
            :title="f.title.replace('\n', '&nbsp;')"
            :content="f.content"
            :isExtended="activeIndex === index"
            @toggle="toggleItem(index, $event)"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>