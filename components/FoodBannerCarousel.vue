<template>
  <div class="relative my-8 overflow-hidden">
    <!-- Animated loader while fetching vendors -->
    <div v-if="isLoading" class="py-16 px-4">
      <div class="flex flex-col items-center justify-center">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="animate-bounce-slow">
              <Pizza class="text-orange-500" size="24" />
            </div>
          </div>
        </div>
        <p class="mt-6 text-gray-600 font-medium animate-pulse">Discovering delicious options...</p>
      </div>
    </div>

    <div v-else class="vendor-carousel">
      <!-- Carousel header with animated title -->
      <div class="mb-6 px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 relative inline-block animate-fade-in">
          Popular Vendors
          <span class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-width-expand"></span>
        </h2>
      </div>

      <!-- Main carousel container -->
      <div class="overflow-hidden rounded-xl shadow-lg">
        <div
          class="flex transition-transform duration-700 ease-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            v-for="(vendor, index) in vendors" 
            :key="vendor._id" 
            class="min-w-full"
          >
            <div 
              class="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden"
              :class="[
                'bg-gradient-to-br', 
                getBgGradient(vendor),
                {'animate-slide-up': index === currentSlide}
              ]"
            >
              <!-- Animated background patterns -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-20 -translate-y-20"></div>
                <div class="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl transform translate-x-20 translate-y-20"></div>
              </div>
              
              <!-- Vendor content with staggered animations -->
              <div class="flex flex-col md:flex-row h-full items-center p-6 md:p-8 relative z-10">
                <div 
                  class="w-full md:w-3/5 text-white z-10 mb-4 md:mb-0"
                  :class="{'animate-slide-right': index === currentSlide}"
                  :style="{'animation-delay': '0.2s'}"
                >
                  <div class="flex items-center mb-2">
                    <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Utensils class="text-white" size="18" />
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold">{{ vendor.restaurantName }}</h2>
                  </div>
                  
                  <div 
                    v-if="vendor.category" 
                    class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4 backdrop-blur-sm"
                    :class="{'animate-slide-right': index === currentSlide}"
                    :style="{'animation-delay': '0.4s'}"
                  >
                    {{ vendor.category }}
                  </div>
                  
                  <div 
                    class="flex flex-wrap gap-2 mb-6"
                    :class="{'animate-slide-right': index === currentSlide}"
                    :style="{'animation-delay': '0.6s'}"
                  >
                    <span v-for="tag in getRandomTags(vendor)" :key="tag" class="px-2 py-1 bg-white/10 rounded-md text-xs">
                      {{ tag }}
                    </span>
                  </div>
                  
                  <button 
                    @click="router.push(`/${vendor.slug}`)" 
                    class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    :class="{'animate-slide-right': index === currentSlide}"
                    :style="{'animation-delay': '0.8s'}"
                  >
                    <ShoppingBag size="18" class="mr-2 group-hover:animate-bounce-once" />
                    Order Now
                    <ChevronRight size="18" class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
                
                <div 
                  class="w-full md:w-2/5 flex items-center justify-center"
                  :class="{'animate-slide-left': index === currentSlide}"
                  :style="{'animation-delay': '0.4s'}"
                >
                  <div class="relative">
                    <!-- Decorative elements -->
                    <div class="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-70 animate-pulse-slow"></div>
                    <div class="absolute -bottom-3 -left-3 w-8 h-8 bg-orange-500 rounded-full opacity-70 animate-pulse-slow" style="animation-delay: 0.5s"></div>
                    
                    <!-- Vendor image with hover effects -->
                    <div class="relative overflow-hidden rounded-2xl shadow-2xl group">
                      <img 
                        :src="vendor.displayImage || getRandomImage(vendor)" 
                        :alt="vendor.restaurantName" 
                        class="w-auto h-[180px] sm:h-[200px] md:h-[220px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div class="text-white">
                          <div class="flex items-center">
                            <Star class="text-yellow-400 mr-1" size="14" fill="currentColor" />
                            <span class="text-sm font-medium">{{ (4 + Math.random()).toFixed(1) }}</span>
                            <span class="mx-2 text-xs opacity-70">&bull;</span>
                            <Clock class="mr-1" size="14" />
                            <span class="text-sm">{{ Math.floor(15 + Math.random() * 30) }} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced navigation buttons with animations -->
      <button 
        @click="prevSlide" 
        class="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-orange-50 rounded-full p-2 sm:p-3 shadow-lg z-10 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        :class="{'opacity-0 -translate-x-4': currentSlide === 0, 'opacity-100 translate-x-0': currentSlide > 0}"
        aria-label="Previous vendor"
      >
        <ChevronLeft size="24" class="text-orange-500" />
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-orange-50 rounded-full p-2 sm:p-3 shadow-lg z-10 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        :class="{'opacity-0 translate-x-4': currentSlide === vendors?.length - 1, 'opacity-100 translate-x-0': currentSlide < vendors?.length - 1}"
        aria-label="Next vendor"
      >
        <ChevronRight size="24" class="text-orange-500" />
      </button>
      
      <!-- Animated indicators -->
      <div class="flex justify-center mt-6">
        <div 
          v-for="(_, index) in vendors" 
          :key="index"
          @click="goToSlide(index)"
          class="group cursor-pointer mx-1 py-2"
          role="button"
          :aria-label="`Go to vendor ${index + 1}`"
          :aria-current="currentSlide === index"
        >
          <div 
            class="h-2 rounded-full transition-all duration-500 ease-out-expo"
            :class="[
              currentSlide === index 
                ? 'w-8 bg-gradient-to-r from-orange-500 to-red-500' 
                : 'w-2 bg-gray-300 group-hover:bg-gray-400'
            ]"
          ></div>
        </div>
      </div>
      
      <!-- Vendor count indicator -->
      <div class="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm animate-fade-in">
        {{ currentSlide + 1 }} / {{ vendors?.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Pizza, 
  Utensils, 
  Star, 
  Clock 
} from 'lucide-vue-next';

const router = useRouter();
const { vendors, loading: isLoading } = useFetchVendors();

// Sample images for vendors without display images
const sampleImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
];

// Sample tags for vendors
const foodTags = [
  'Fast Delivery', 'Top Rated', 'Healthy Options', 'Spicy', 'Vegetarian',
  'Vegan', 'Gluten-Free', 'Local Favorite', 'New', 'Trending', 'Breakfast',
  'Lunch', 'Dinner', 'Desserts', 'Drinks', 'Snacks', 'Family Meals'
];

// State for carousel
const currentSlide = ref(0);
const autoplayInterval = ref<number | null>(null);
const touchStartX = ref(0);
const touchEndX = ref(0);

// Get a random image for vendors without display images
const getRandomImage = (vendor: any) => {
  // Use a deterministic approach based on vendor ID to always get the same image
  const index = vendor._id.charCodeAt(0) % sampleImages?.length;
  return `${sampleImages[index]}?w=500&h=300&fit=crop&crop=entropy`;
};

// Get random tags for each vendor
const getRandomTags = (vendor: any) => {
  const numTags = 2 + Math.floor(Math.random() * 2); // 2-3 tags
  const tags: string[] = [];
  
  // Use vendor ID to create deterministic tags
  const seed = vendor._id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  
  for (let i = 0; i < numTags; i++) {
    const index = (seed + i) % foodTags?.length;
    tags.push(foodTags[index]);
  }
  
  return tags;
};

// Get the background gradient class based on the vendor category
const getBgGradient = (vendor: any) => {
  const category = vendor.category?.toLowerCase() || '';
  
  if (category.includes('fast food')) {
    return 'from-red-700 to-orange-600';
  } else if (category.includes('pizza') || category.includes('italian')) {
    return 'from-green-700 to-emerald-600';
  } else if (category.includes('asian') || category.includes('chinese') || category.includes('japanese')) {
    return 'from-blue-700 to-indigo-600';
  } else if (category.includes('dessert') || category.includes('bakery')) {
    return 'from-pink-700 to-rose-600';
  } else if (category.includes('healthy') || category.includes('vegan')) {
    return 'from-teal-700 to-green-600';
  } else {
    // Generate a gradient based on vendor ID for consistency
    const id = vendor._id || '';
    const charCode = id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % 5;
    
    const gradients = [
      'from-purple-700 to-violet-600',
      'from-amber-700 to-yellow-600',
      'from-cyan-700 to-blue-600',
      'from-fuchsia-700 to-pink-600',
      'from-emerald-700 to-teal-600'
    ];
    
    return gradients[charCode];
  }
};

// Navigation functions
const nextSlide = () => {
  if (currentSlide.value < vendors.value?.length - 1) {
    currentSlide.value++;
    resetAutoplay();
  } else {
    // Add a bounce effect when trying to go past the last slide
    const carousel = document.querySelector('.vendor-carousel');
    if (carousel) {
      carousel.classList.add('animate-bounce-x');
      setTimeout(() => {
        carousel.classList.remove('animate-bounce-x');
      }, 500);
    }
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
    resetAutoplay();
  } else {
    // Add a bounce effect when trying to go before the first slide
    const carousel = document.querySelector('.vendor-carousel');
    if (carousel) {
      carousel.classList.add('animate-bounce-x-reverse');
      setTimeout(() => {
        carousel.classList.remove('animate-bounce-x-reverse');
      }, 500);
    }
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetAutoplay();
};

// Touch event handlers for swipe functionality
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const touchDiff = touchStartX.value - touchEndX.value;
  
  // Detect swipe (with a threshold of 50px)
  if (Math.abs(touchDiff) > 50) {
    if (touchDiff > 0) {
      // Swipe left, go to next slide
      nextSlide();
    } else {
      // Swipe right, go to previous slide
      prevSlide();
    }
  }
  
  // Reset touch values
  touchStartX.value = 0;
  touchEndX.value = 0;
};

// Autoplay functionality
const startAutoplay = () => {
  autoplayInterval.value = window.setInterval(() => {
    if (currentSlide.value < vendors.value?.length - 1) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0; // Loop back to the first slide
    }
  }, 6000); // Longer interval for better user experience
};

const resetAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
  startAutoplay();
};

// Pause autoplay when user interacts with the page
const pauseAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const resumeAutoplay = () => {
  if (!autoplayInterval.value) {
    startAutoplay();
  }
};

// Lifecycle hooks
onMounted(() => {
  startAutoplay();
  
  // Pause autoplay when user interacts with the page
  window.addEventListener('mouseover', pauseAutoplay);
  window.addEventListener('mouseout', resumeAutoplay);
  window.addEventListener('touchstart', pauseAutoplay);
  window.addEventListener('touchend', resumeAutoplay);
});

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
  
  // Clean up event listeners
  window.removeEventListener('mouseover', pauseAutoplay);
  window.removeEventListener('mouseout', resumeAutoplay);
  window.removeEventListener('touchstart', pauseAutoplay);
  window.removeEventListener('touchend', resumeAutoplay);
});
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-slide-right {
  animation: slideRight 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-width-expand {
  animation: widthExpand 0.8s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

.animate-bounce-once {
  animation: bounceOnce 0.6s ease-in-out;
}

.animate-bounce-x {
  animation: bounceX 0.5s ease-in-out;
}

.animate-bounce-x-reverse {
  animation: bounceXReverse 0.5s ease-in-out;
}

/* Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes widthExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@keyframes bounceOnce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes bounceX {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(10px);
  }
  40%, 80% {
    transform: translateX(5px);
  }
}

@keyframes bounceXReverse {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-10px);
  }
  40%, 80% {
    transform: translateX(-5px);
  }
}

/* Custom easing function */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .vendor-carousel .absolute.top-4.right-4 {
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>