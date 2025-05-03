<template>
    <article 
      class="program-card bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
      :class="{ 'opacity-0': !isVisible }"
      ref="cardRef"
    >
      <div class="grid md:grid-cols-2 gap-0">
        <!-- Image Section -->
        <div 
          :class="{ 'md:order-2': reverse }"
          class="relative h-64 md:h-auto overflow-hidden group"
        >
          <img 
            :src="program.coverImage" 
            :alt="program.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6 md:hidden">
            <h3 class="text-2xl font-bold text-white leading-tight">{{ program.title }}</h3>
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="p-6 md:p-10 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-center mb-4">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                {{ program.subtitle }}
              </span>
              <div class="ml-auto flex space-x-1">
                <span 
                  v-for="i in 5" 
                  :key="i"
                  class="w-2 h-2 rounded-full bg-indigo-500"
                  :class="i > 3 ? 'opacity-30' : ''"
                ></span>
              </div>
            </div>
            
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 hidden md:block">
              {{ program.title }}
            </h3>
            
            <p class="text-gray-600 mb-6">{{ program.description }}</p>
            
            <div class="space-y-6">
              <!-- Program Overview -->
              <div v-if="expanded">
                <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Program Overview
                </h4>
                <p class="text-gray-600 pl-10">{{ program.overview }}</p>
              </div>
  
              <!-- Responsibilities -->
              <div v-if="expanded">
                <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </span>
                  Intern Responsibilities
                </h4>
                <ul class="pl-10 space-y-2">
                  <li 
                    v-for="(item, index) in program.responsibilities" 
                    :key="index"
                    class="text-gray-600 flex items-start"
                  >
                    <span class="text-indigo-500 mr-2 mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
  
              <!-- Program Structure -->
              <div v-if="expanded">
                <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Program Structure
                </h4>
                <div class="pl-10 grid md:grid-cols-3 gap-4">
                  <div 
                    v-for="(item, index) in program.structure" 
                    :key="index"
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <h5 class="text-sm font-medium text-gray-500 mb-1">{{ item.title }}</h5>
                    <p class="text-gray-800 font-medium">{{ item.value }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Benefits -->
              <div v-if="expanded">
                <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  Benefits for Participants
                </h4>
                <div class="pl-10 space-y-4">
                  <div 
                    v-for="(benefit, index) in program.benefits" 
                    :key="index"
                    class="benefit-item"
                  >
                    <h5 class="text-md font-semibold text-gray-800 mb-1 flex items-center">
                      <BenefitIcon :type="benefit.icon" class="mr-2" />
                      {{ benefit.title }}
                    </h5>
                    <p class="text-gray-600 pl-7">{{ benefit.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button 
              @click="expanded = !expanded" 
              class="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 flex items-center"
            >
              {{ expanded ? 'Show Less' : 'Learn More' }}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 ml-1 transition-transform duration-300" 
                :class="{ 'rotate-180': expanded }"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button class="btn-apply">
              Apply Now
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps, PropType } from 'vue'
  import { useIntersectionObserver } from '@vueuse/core'
  
  // Types
  interface BenefitItem {
    title: string
    description: string
    icon: string
  }
  
  interface ProgramStructure {
    title: string
    value: string
  }
  
  interface Program {
    id: string
    title: string
    subtitle: string
    description: string
    coverImage: string
    overview: string
    responsibilities: string[]
    structure: ProgramStructure[]
    benefits: BenefitItem[]
  }
  
  const props = defineProps({
    program: {
      type: Object as PropType<Program>,
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  })
  
  // State
  const expanded = ref(false)
  const isVisible = ref(false)
  const cardRef = ref<HTMLElement | null>(null)
  
  // Intersection observer for reveal animation
  onMounted(() => {
    useIntersectionObserver(
      cardRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, 200)
        }
      },
      { threshold: 0.2 }
    )
  })
  </script>
  
  
  <style scoped>
  .program-card {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease;
  }
  
  .program-card.opacity-0 {
    opacity: 0;
    transform: translateY(40px);
  }
  
  .benefit-item {
    position: relative;
    transition: transform 0.3s ease;
  }
  
  .benefit-item:hover {
    transform: translateX(8px);
  }
  
  .btn-apply {
    @apply inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 sm:ml-auto;
  }
  </style>