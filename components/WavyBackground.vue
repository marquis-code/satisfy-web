<template>
    <div class="wavy-background">
      <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M280 20C220 60 180 140 200 240C220 340 120 380 20 280" 
          :stroke="color" 
          stroke-width="40" 
          stroke-linecap="round"
        />
      </svg>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    color: {
      type: String,
      default: '#F47B4D'
    }
  })
  </script>
  
  <style scoped>
  .wavy-background {
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 200px;
    height: 200px;
    opacity: 0.3;
    transform: rotate(0deg);
    transition: all 0.5s ease;
  }
  
  .wavy-background:hover {
    transform: rotate(5deg) scale(1.05);
  }
  </style>