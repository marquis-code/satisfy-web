<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-white/10 transition-all duration-300" :class="{ 'bg-white/90 backdrop-blur-sm shadow-md': scrolled }">
    <nav class="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="sr-only">OLGnova</span>
          <div class="text-olg-green w-10 h-10 transition-transform duration-300 group-hover:rotate-45">
            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C22.4 0 0 22.4 0 50c0 27.6 22.4 50 50 50s50-22.4 50-50c0-27.6-22.4-50-50-50zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
              <path d="M50 70c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm0-30c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z"/>
            </svg>
          </div>
          <h1 class="text-olg-blue text-2xl font-sans font-bold transition-all duration-300 group-hover:tracking-wider">
            OLGnova
          </h1>
        </NuxtLink>
      </div>
      
      <div class="flex lg:hidden">
        <button 
          type="button" 
          class="inline-flex items-center justify-center rounded-md p-2.5 text-olg-blue hover:bg-olg-blue/10 transition-colors duration-200" 
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span class="sr-only">Open main menu</span>
          <div class="relative w-6 h-6">
            <span 
              class="absolute block h-0.5 bg-current transform transition-all duration-300"
              :class="[
                mobileMenuOpen ? 'rotate-45 top-3' : 'top-1.5',
                'w-6'
              ]"
            ></span>
            <span 
              class="absolute top-3 block h-0.5 bg-current transform transition-all duration-300"
              :class="[
                mobileMenuOpen ? 'opacity-0' : 'opacity-100',
                'w-6'
              ]"
            ></span>
            <span 
              class="absolute block h-0.5 bg-current transform transition-all duration-300"
              :class="[
                mobileMenuOpen ? '-rotate-45 top-3' : 'top-4.5',
                'w-6'
              ]"
            ></span>
          </div>
        </button>
      </div>
      
      <div class="hidden lg:flex lg:gap-x-8 z-50">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.path" 
          class="text-base font-semibold text-olg-blue hover:text-olg-green relative overflow-hidden group py-2"
        >
          {{ item.name }}
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-olg-green transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0"></span>
        </NuxtLink>
      </div>
      
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink 
          to="/programs" 
          class="text-base font-semibold text-white bg-olg-blue px-4 py-2 rounded-md hover:bg-olg-green transition-colors duration-300 flex items-center gap-1"
        >
          Programs 
          <span class="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </nav>
    
    <!-- Mobile menu -->
    <div 
      class="lg:hidden overflow-hidden transition-all duration-500 ease-in-out"
      :class="mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'"
    >
      <div class="bg-white px-6 py-4 shadow-lg">
        <div class="space-y-1">
          <NuxtLink 
            v-for="(item, index) in navigation" 
            :key="item.name" 
            :to="item.path" 
            class="block rounded-lg px-3 py-2 text-base font-semibold text-olg-blue hover:bg-olg-blue/10 transition-all duration-200"
            :style="{ transitionDelay: `${index * 50}ms` }"
            :class="mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          
          <div class="pt-4 mt-4 border-t border-gray-200">
            <NuxtLink 
              to="/programs" 
              class="flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-olg-blue hover:bg-olg-blue/10 transition-all duration-200"
              :class="mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
              :style="{ transitionDelay: `${navigation.length * 50}ms` }"
              @click="mobileMenuOpen = false"
            >
              Programs
              <span aria-hidden="true" class="text-olg-green">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Teams', path: '/teams' },
  { name: 'Publications', path: '/publications' },
]

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Handle scroll events to change navbar appearance
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

// Close mobile menu when window is resized to desktop size
const handleResize = () => {
  if (window.innerWidth >= 1024 && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
:root {
  --olg-blue: #3a75a4;
  --olg-green: #a6d5a0;
}

.text-olg-blue {
  color: var(--olg-blue);
}

.text-olg-green {
  color: var(--olg-green);
}

.bg-olg-blue {
  background-color: var(--olg-blue);
}

.bg-olg-blue\/10 {
  background-color: rgba(58, 117, 164, 0.1);
}

.hover\:bg-olg-blue\/10:hover {
  background-color: rgba(58, 117, 164, 0.1);
}

.bg-olg-green {
  background-color: var(--olg-green);
}

.hover\:bg-olg-green:hover {
  background-color: var(--olg-green);
}

.hover\:text-olg-green:hover {
  color: var(--olg-green);
}
</style>