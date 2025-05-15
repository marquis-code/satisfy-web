<template>
    <div class="flex flex-col items-center justify-center" :class="containerClass">
      <div class="relative">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <Pizza class="text-orange-500 animate-pulse" size="16" />
        </div>
      </div>
      <p v-if="message" class="mt-2 text-sm text-gray-500">{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Pizza } from 'lucide-vue-next';
  
  defineProps({
    message: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    }
  });
  </script>