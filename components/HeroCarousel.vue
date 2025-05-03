<!-- components/HeroCarousel.vue -->
<template>
    <div class="hero-carousel relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
      <!-- Dynamic Image Carousel -->
      <div class="absolute inset-0 -z-10">
        <div 
          v-for="(image, index) in carouselImages" 
          :key="index" 
          class="absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out"
          :class="currentImageIndex === index ? 'opacity-100' : 'opacity-0'"
        >
          <img :src="image" alt="Background" class="size-full h-full w-full object-cover" />
          <!-- Dark overlay with custom intensity -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-sm"></div>
        </div>
      </div>
  
      <!-- Decorative elements & gradients -->
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
  
      <!-- Content -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <!-- Announcement banner -->
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-sm bg-white/5 transition-all duration-300 group">
              <span class="relative z-10">Announcing our next round of funding.</span> 
              <NuxtLink to="#" class="font-semibold text-white ml-1 group-hover:text-indigo-300 transition-colors duration-300">
                <span class="absolute inset-0" aria-hidden="true"></span>Read more 
                <span aria-hidden="true" class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </NuxtLink>
              <div class="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
            </div>
          </div>
  
          <!-- Main heading with animated text reveal -->
          <div class="text-center">
            <h1 class="hero-title text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl relative overflow-hidden">
              <span class="block">Welcome to</span>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 font-bold tracking-wide">OLGnova</span>
            </h1>
            
            <p class="mt-8 text-pretty text-lg text-gray-300 sm:text-xl/8 max-w-3xl mx-auto backdrop-blur-sm bg-black/10 p-4 rounded-lg">
              We specialize in driving positive change through expert research, strategic communication, and tailored solutions. We empower organizations to reach their full potential and create lasting, sustainable impact. Whether conducting surveys, research, and evaluations or delivering communication services, we provide data-driven insights and innovative strategies to foster global success.
            </p>
            
            <!-- Carousel indicators -->
            <div class="flex justify-center gap-2 mt-8">
              <button 
                v-for="(_, index) in carouselImages" 
                :key="index"
                @click="currentImageIndex = index"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'"
                aria-label="Switch to image"
              ></button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom gradient -->
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import image1 from "@/assets/img/founder2.jpg"
  import image2 from "@/assets/img/founder4.jpg"
  import image3 from "@/assets/img/founder5.jpg"
  import image4 from "@/assets/img/founder6.png"
  import image5 from "@/assets/img/founder10.png"
  
  // Define carousel images
  const carouselImages = [
image1,image2, image3,image4, image5
  ]
  
  // Track current image index
  const currentImageIndex = ref(0)
  let intervalId: NodeJS.Timeout | null = null
  
  // Function to advance carousel
  const advanceCarousel = (): void => {
    currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length
  }
  
  // Set up and clean up the carousel interval
  onMounted(() => {
    // Start carousel autoplay
    intervalId = setInterval(advanceCarousel, 5000)
    
    // Add entrance animations for text elements
    const animateTextElements = () => {
      const titles = document.querySelectorAll('.hero-title span')
      titles.forEach((title, index) => {
        setTimeout(() => {
          title.classList.add('animate-in')
        }, index * 400)
      })
    }
    
    setTimeout(animateTextElements, 300)
  })
  
  onUnmounted(() => {
    // Clean up interval when component is destroyed
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
  </script>
  
  <style scoped>
  .hero-carousel {
    min-height: 100vh;
  }
  
  .hero-title span {
    display: block;
    position: relative;
  }
  
  .hero-title span::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: scaleX(0);
    transition: transform 0.8s ease;
  }
  
  .hero-title:hover span::after {
    transform: scaleX(1);
  }
  
  /* Entrance animations */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-in {
    animation: fadeUp 0.8s ease-out forwards;
  }
  </style>