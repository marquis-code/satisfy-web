<template>
  <section class="w-full bg-white py-16 -z-50">
    <div class="container mx-auto px-4 ">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <p class="text-gray-600 uppercase text-sm tracking-wider font-semibold mb-2">TOOLS</p>
        <h2 class="text-2xl md:text-3xl font-semibold text-[#222222]">Tools to Facilitate the Process</h2>
      </div>

      <!-- Tools Horizontal Scroll -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Left Arrow -->
        <button
          v-if="showLeftArrow"
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  text-white rounded-full"
        >
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg> -->
          <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.0300293" width="44" height="44" rx="22" fill="#444CE7"/>
<path d="M25 16.03C25 16.03 19 20.4489 19 22.03C19 23.6112 25 28.03 25 28.03" stroke="#FFF7DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>

        <!-- Tools Wrapper -->
        <div
          ref="scrollContainer"
          class="flex gap-8 overflow-x-auto hide-scrollbar items-center px-4"
          @scroll="checkScrollPosition"
          style="scroll-snap-type: x mandatory;"
        >
          <div
            v-for="tool in tools"
            :key="tool.id"
            class="flex flex-col bg-white items-center gap-2 text-center"
            style="scroll-snap-align: center;"
          >
            <img
              :src="tool.icon"
              :alt="tool.name"
              class="w-12 h-12 z-5 object-contain hover:scale-110 transition-transform duration-200"
            />
            <span class="text-sm text-gray-600 whitespace-nowrap">
              {{ tool.name }}
            </span>
          </div>
        </div>

        <!-- Right Arrow -->
        <button
          v-if="showRightArrow"
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10  text-white"
        >
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg> -->
          <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.0300293" width="44" height="44" rx="22" fill="#444CE7"/>
<path d="M19 16.03C19 16.03 25 20.4489 25 22.03C25 23.6112 19 28.03 19 28.03" stroke="#FFF7DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import stack1 from "@/assets/img/azure-icon.png";
import stack2 from "@/assets/img/jira.png";
import stack3 from "@/assets/img/figma.png";
import stack4 from "@/assets/img/firebase.png";
import stack5 from "@/assets/img/flutter.png";
import stack6 from "@/assets/img/google-docs.png";
import stack7 from "@/assets/img/google-meet.png";
import stack8 from "@/assets/img/google-cloud.png";
import stack9 from "@/assets/img/loom.png";
import stack10 from "@/assets/img/nest-js-icon.png";
import stack11 from "@/assets/img/postgresql-icon.png";
import stack12 from "@/assets/img/react.png";
import stack13 from "@/assets/img/slack.png";
import stack14 from "@/assets/img/vue.png";

const tools = ref([
  { id: "jira", name: "Jira", icon: stack2 },
  { id: "google-meet", name: "Google Meet", icon: stack7 },
  { id: "slack", name: "Slack", icon: stack13 },
  { id: "google-doc", name: "Google Doc", icon: stack6 },
  { id: "loom", name: "Loom", icon: stack9 },
  { id: "figma", name: "Figma", icon: stack3 },
  { id: "flutter", name: "Flutter", icon: stack5 },
  { id: "react", name: "React", icon: stack12 },
  { id: "vue", name: "Vue", icon: stack14 },
  { id: "nest-js", name: "Nest.js", icon: stack10 },
  { id: "postgres-sql", name: "Postgres SQL", icon: stack11 },
  { id: "firebase", name: "Firebase", icon: stack4 },
  { id: "azure", name: "Azure", icon: stack1 },
  { id: "google-cloud", name: "Google Cloud", icon: stack8 },
]);

const scrollContainer = ref<HTMLElement | null>(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(true);

const checkScrollPosition = () => {
  if (!scrollContainer.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth;
};

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({
    left: -200, // Adjust scroll amount
    behavior: "smooth",
  });
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({
    left: 200, // Adjust scroll amount
    behavior: "smooth",
  });
};

onMounted(() => {
  checkScrollPosition();
});
</script>

<style scoped>
/* Hide the scrollbar but keep scrolling functional */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
