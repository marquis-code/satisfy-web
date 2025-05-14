<!-- components/HeroSection.vue -->
<template>
    <div class="relative min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-600">
      <nav class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-indigo-600 rounded"></div>
            <span class="text-white text-xl font-bold">Buildr</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#" class="text-white hover:text-gray-200">Home</a>
            <a href="#" class="text-white bg-black/20 px-4 py-2 rounded-md">Services</a>
            <a href="#" class="text-white hover:text-gray-200">Projects</a>
            <a href="#" class="text-white hover:text-gray-200">Contact Us</a>
          </div>
          <!-- Mobile menu button -->
          <button class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
  
      <main class="container mx-auto px-4  md:pt-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
            Your Vision 
            <span class="text-red-500 mx-2">+</span> 
            our expertise 
            <span class="text-red-500">=</span>
            <br />
            <span class="relative inline-block mt-4">
              unmatched results
              <div class="absolute -bottom-2 left-0 right-0 w-full">
                <svg viewBox="0 0 100 100" class="w-full h-8 text-yellow-400" preserveAspectRatio="none">
                  <path d="M0,50 Q50,20 100,50" fill="none" stroke="currentColor" stroke-width="6"/>
                </svg>
              </div>
            </span>
          </h1>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  // No additional logic needed for this component
  </script>
  
  <style scoped>
  /* Any additional custom styles can go here */
  </style>