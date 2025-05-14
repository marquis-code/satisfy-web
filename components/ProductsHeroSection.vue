<template>
    <div class="bg-gradient-to-b to-[#824DF8] via-[#444CE7] from-[#26D1FF] pb-[189px] w-full">
      <WhiteNav shade="coloured" />
      <!-- <nav class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img src="@/assets/icons/black-logo.svg" /> <img src="@/assets/icons/black-logo.svg" />
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-[#222222] font-semibold text-sm transition">Home</NuxtLink>
            <NuxtLink to="/services" class="text-[#222222] font-semibold text-sm transition">Services</NuxtLink>
            <NuxtLink to="/projects" class="text-[#222222] font-semibold text-sm bg-[#222222] transition">Projects</NuxtLink>
            <a href="#contact-us" class="text-[#222222] font-semibold text-sm text-black px-6 py-2 rounded-full  transition">
              Contact us
            </a>
          </div>
  
          <button class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav> -->
  
      <!-- Hero content -->
      <div class="container mx-auto px-4 text-center pt-20">
        <h1 class="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Explore our work
        </h1>
        <p class="text-white text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
          Real projects, tangible results—learn how our clients turned their visions into thriving businesses
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Component logic can be added here if needed
  </script>


<style scoped>
.router-link-exact-active {
  background-color: '#222222';
  color: white;
  border-radius: 35px;
  padding: 10px;
}
</style>