<template>
    <NuxtLink 
      :to="path" 
      :class="[
        'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors',
        isActive && 'bg-gray-700 text-white',
        isCollapsed && 'justify-center',
        className
      ]"
    >
      <component :is="icon" v-if="icon" size="20" />
      <span v-if="!isCollapsed" class="ml-3">{{ label }}</span>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  defineProps({
    icon: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  });
  </script>