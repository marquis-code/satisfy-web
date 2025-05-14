<template>
    <NuxtLink 
      data-aos="fade-up" 
      :to="studyObj.urlPath" 
      class="relative block group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
    >
      <div class="relative w-full">
       <div>
        <img 
          :src="studyObj?.image" 
          :alt="studyObj?.title"
          class="w-full h-[590px] object-cover"
        />
       </div>
        <div 
          class="absolute inset-0 bg-black/70 transition-all duration-300 group-hover:bg-black/20"
        ></div>
        <p 
          class="text-xl font-bold text-white mb-2 absolute top-7 left-7"
        >
          {{ studyObj.name ?? 'Nil' }}
        </p>
        <div class="absolute bottom-0 left-0 p-8 w-full">
          <h3 class="text-2xl font-bold text-white mb-2">{{ studyObj?.title }}</h3>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    studyObj: {
      type: Object,
      default: () => ({})
    }
  })
  </script>
  
  <style scoped>
  .group-hover\:bg-black\/40:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  </style>
  