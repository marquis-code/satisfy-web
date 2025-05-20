<!-- components/NavBar.vue -->
<template>
    <header class="py-6 px-6 md:px-10 bg-white shadow-sm relative z-20">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="@/assets/img/satisfy-logo-coloured.png" alt="Satisfy" class="h-10 animate-bounce-subtle" />
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink to="/login" class="text-gray-700 hover:text-primary transition-colors">
            Already have an account?
          </NuxtLink>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
            class="md:hidden focus:outline-none"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <!-- <Icon v-if="isMenuOpen" name="lucide:x" class="h-6 w-6 text-gray-700" /> -->
            <svg v-if="isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
            <!-- <Icon v-else name="lucide:menu" class="h-6 w-6 text-gray-700" /> -->
          </button>
      </div>
      
      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 right-0 w-full bg-white shadow-lg">
          <div class="py-4 px-6 flex flex-col space-y-4">
            <NuxtLink @click="closeMenu" to="/register" class="text-gray-700 hover:text-primary py-2 transition-colors font-medium">
              Sign Up
            </NuxtLink>
            <NuxtLink @click="closeMenu" to="/login" class="text-gray-700 hover:text-primary py-2 transition-colors font-medium">
              Login
            </NuxtLink>
            <NuxtLink @click="closeMenu" to="/vendors" class="text-gray-700 hover:text-primary py-2 transition-colors font-medium">
              Vendors
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Mobile menu state
  const isMenuOpen = ref(false)
  
  // Toggle mobile menu
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  // Close mobile menu (useful when clicking on links)
  const closeMenu = () => {
    isMenuOpen.value = false
  }
  </script>
  
  <style scoped>
  .animate-bounce-subtle {
    animation: bounce-subtle 3s infinite;
  }
  
  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  </style>