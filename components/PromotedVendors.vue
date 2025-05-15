<template>
    <section class="my-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Promoted Vendors</h2>
        <NuxtLink to="/dashboard" class="text-orange-500 hover:text-orange-600 flex items-center transition-colors duration-300">
          Vendor's portal
          <ChevronRight size="20" />
        </NuxtLink>
      </div>
      
      <div class="relative">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentOffset}px)` }"
            ref="vendorSlider"
          >
            <!-- Duplicate the last few items at the beginning for infinite loop -->
            <div 
              v-for="(vendor, index) in duplicatedVendorsStart" 
              :key="`start-${vendor.id}-${index}`" 
              class="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] px-2 transition-transform duration-300 hover:scale-[1.02]"
            >
              <VendorCard :vendor="vendor" />
            </div>
            
            <!-- Main vendors -->
            <div 
              v-for="vendor in promotedVendors" 
              :key="`main-${vendor.id}`" 
              class="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] px-2 transition-transform duration-300 hover:scale-[1.02]"
            >
              <VendorCard :vendor="vendor" />
            </div>
            
            <!-- Duplicate the first few items at the end for infinite loop -->
            <div 
              v-for="(vendor, index) in duplicatedVendorsEnd" 
              :key="`end-${vendor.id}-${index}`" 
              class="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] px-2 transition-transform duration-300 hover:scale-[1.02]"
            >
              <VendorCard :vendor="vendor" />
            </div>
          </div>
        </div>
        
        <!-- Navigation Buttons -->
        <button 
          @click="prevSlide" 
          class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg z-10 transition-all duration-300 hover:scale-110"
          aria-label="Previous vendors"
        >
          <ChevronLeft size="24" />
        </button>
        
        <button 
          @click="nextSlide" 
          class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg z-10 transition-all duration-300 hover:scale-110"
          aria-label="Next vendors"
        >
          <ChevronRight size="24" />
        </button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { ChevronRight, ChevronLeft } from 'lucide-vue-next';
  import { useVendors } from '~/composables/useVendors';
  import VendorCard from './VendorCard.vue';
  
  const { promotedVendors } = useVendors();
  
  const currentIndex = ref(0);
  const currentOffset = ref(0);
  const vendorSlider = ref<HTMLElement | null>(null);
  const slideWidth = ref(350); // Default width
  const visibleSlides = ref(3); // Default visible slides
  const autoplayInterval = ref<number | null>(null);
  const isTransitioning = ref(false);
  
  // Number of items to duplicate at start and end for infinite scrolling
  const duplicateCount = 3;
  
  // Duplicate vendors for infinite scrolling
  const duplicatedVendorsStart = computed(() => {
    return promotedVendors.value.slice(-duplicateCount);
  });
  
  const duplicatedVendorsEnd = computed(() => {
    return promotedVendors.value.slice(0, duplicateCount);
  });
  
  // Calculate how many slides can be shown based on container width
  const updateVisibleSlides = () => {
    const width = window.innerWidth;
    if (width < 640) {
      visibleSlides.value = 1;
      slideWidth.value = 280;
    } else if (width < 1024) {
      visibleSlides.value = 2;
      slideWidth.value = 320;
    } else {
      visibleSlides.value = 3;
      slideWidth.value = 350;
    }
    
    // Initialize offset to show the first real item (after duplicated ones)
    currentOffset.value = duplicateCount * slideWidth.value;
  };
  
  const nextSlide = () => {
    if (isTransitioning.value) return;
    
    isTransitioning.value = true;
    currentIndex.value++;
    currentOffset.value += slideWidth.value;
    
    // If we've reached the end of the original items, reset to the beginning after animation
    if (currentIndex.value >= promotedVendors.value.length) {
      setTimeout(() => {
        isTransitioning.value = false;
        currentIndex.value = 0;
        currentOffset.value = duplicateCount * slideWidth.value;
      }, 500); // Match this with the transition duration
    } else {
      setTimeout(() => {
        isTransitioning.value = false;
      }, 500);
    }
    
    resetAutoplay();
  };
  
  const prevSlide = () => {
    if (isTransitioning.value) return;
    
    isTransitioning.value = true;
    currentIndex.value--;
    currentOffset.value -= slideWidth.value;
    
    // If we've reached the beginning of the original items, reset to the end after animation
    if (currentIndex.value < 0) {
      setTimeout(() => {
        isTransitioning.value = false;
        currentIndex.value = promotedVendors.value.length - 1;
        currentOffset.value = (duplicateCount + promotedVendors.value.length - 1) * slideWidth.value;
      }, 500); // Match this with the transition duration
    } else {
      setTimeout(() => {
        isTransitioning.value = false;
      }, 500);
    }
    
    resetAutoplay();
  };
  
  const startAutoplay = () => {
    autoplayInterval.value = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  const resetAutoplay = () => {
    if (autoplayInterval.value) {
      clearInterval(autoplayInterval.value);
    }
    startAutoplay();
  };
  
  onMounted(() => {
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    startAutoplay();
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateVisibleSlides);
    if (autoplayInterval.value) {
      clearInterval(autoplayInterval.value);
    }
  });
  </script>