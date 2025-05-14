<template>
    <!-- <div class="group block relative overflow-hidden rounded-2xl"> -->
      <!-- <div class="aspect-w-16 aspect-h-9 w-full relative">
        <img :src="image" :alt="title" class="h-[300px] object-cover" />
        <div class="absolute hidden  inset-0 bg-black/60 flex flex-col justify-end p-6">
          <h3 class="text-white  text-lg font-semibold mb-2">{{ title }}</h3>
          <p class="text-lg font-bold text-white absolute top-6 left-6">{{name}}</p>
          <div class="flex gap-2 mb-3">
            <span v-for="tag in tags" :key="tag" 
              class="text-xs text-white/80 border-r border-white/20 pr-2 last:border-0">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div> -->
    <NuxtLink 
      data-aos="fade-up" 
      :to="href" 
      class="relative block group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
    >
      <div class="relative  w-full">
        <img 
          :src="image" 
          :alt="title"
          class="w-full h-[300px] object-cover"
        />
        <div 
          class="absolute inset-0 bg-black/70 transition-all duration-300 group-hover:bg-black/40"
        ></div>
        <p 
          class="text-xl font-bold text-white mb-2 absolute top-4 left-4"
        >
          {{ name ?? 'Nil' }}
        </p>
        <div class="absolute bottom-0 left-0 p-4 w-full">
          <h3 class="text-base lg:text-md font-bold text-white mb-2">{{ title }}</h3>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    image: {
      type: String
    },
    title: {
      type: String
    },
    href: {
      type: String
    },
    name: {
      type: String
    },
    tags: {
      type: Array
    }
  })
  </script>
  