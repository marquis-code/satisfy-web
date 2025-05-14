<!-- components/HeroSection.vue -->
<template>
    <!-- <div class="w-full bg-gradient-to-b from-blue-500 to-blue-700 py-16"> -->
      <div class="">
        <h1 class="text-white text-[22px] sm:text-3xl md:text-6xl font-bold leading-tight">
          Your Vision
          <span class="text-[#EA4335] mx-1 lg:mx-2">+</span>
          our expertise
          <span class="text-[#EA4335] mx-2">=</span>
        </h1>
        <div class="relative mt-2 flex justify-center items-center">
          <div class="relative">
            <!-- Circle image container -->
            <!-- <img 
              src="@/assets/img/circular-ring.svg" 
              alt="decorative circle" 
              class="absolute -top-2 -left-2 w-[500px] h-[50px] object-contain"
            /> -->
            <!-- Typewriter text container -->
            <div class="flex items-center">
              <span 
                ref="typewriterText" 
                class="text-[22px] sm:text-3xl md:text-6xl font-bold z-10 relative"
                :class="currentTextColor"
              >
                {{ displayedText }}
              </span>
              <span 
                class="text-[22px] sm:text-3xl md:text-6xl font-bold ml-3 text-white"
              >
                {{ staticText }}
              </span>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  
  interface WordPair {
    dynamic: string;
    static: string;
  }
  
  const words: WordPair[] = [
    { dynamic: 'Unmatched', static: 'results' },
    { dynamic: 'Innovative', static: 'solutions' }
  ]
  
  const currentWordIndex = ref(0)
  const displayedText = ref('')
  const isDeleting = ref(false)
  const currentTextColor = computed(() => 
    currentWordIndex.value === 0 ? 'text-green-500' : 'text-green-500'
  )
  const staticText = computed(() => 
    words[currentWordIndex.value].static
  )
  
  const typeText = async () => {
    const currentWord = words[currentWordIndex.value].dynamic
    const speed = isDeleting.value ? 75 : 150
  
    if (!isDeleting.value) {
      if (displayedText.value.length < currentWord.length) {
        displayedText.value = currentWord.slice(0, displayedText.value.length + 1)
        setTimeout(typeText, speed)
      } else {
        isDeleting.value = true
        setTimeout(typeText, 2000) // Wait before starting to delete
      }
    } else {
      if (displayedText.value.length > 0) {
        displayedText.value = currentWord.slice(0, displayedText.value.length - 1)
        setTimeout(typeText, speed)
      } else {
        isDeleting.value = false
        currentWordIndex.value = (currentWordIndex.value + 1) % words.length
        setTimeout(typeText, 500) // Wait before typing next word
      }
    }
  }
  
  onMounted(() => {
    setTimeout(() => {
      typeText()
    }, 1000)
  })
  </script>