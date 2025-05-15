<template>
  <div class="text-center py-10 bg-white rounded-lg shadow-sm">
    <div class="relative w-48 h-48 mx-auto mb-4">
      <img :src="illustration" alt="Empty state" class="w-full h-full object-contain animate-float" />
      <div class="absolute -top-4 -right-4 animate-bounce-slow">
        <component :is="iconTop" class="text-red-500" size="24" />
      </div>
      <div class="absolute -bottom-4 -left-4 animate-pulse">
        <component :is="iconBottom" class="text-orange-500" size="24" />
      </div>
    </div>
    
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-500 mb-6">{{ description }}</p>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Pizza, Utensils, Coffee } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    default: 'Nothing found'
  },
  description: {
    type: String,
    default: 'We couldn\'t find what you\'re looking for.'
  },
  illustration: {
    type: String,
    default: '/illustrations/empty-state.svg'
  },
  iconTop: {
    type: Object,
    default: () => Pizza
  },
  iconBottom: {
    type: Object,
    default: () => Utensils
  }
});
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
</style>