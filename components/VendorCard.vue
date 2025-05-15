 
<template>
  <div 
    :data-vendor-id="vendor._id"
    class="vendor-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 relative"
    :class="[
      {'vendor-closed': !isVendorOpen},
      {'animate-slide-up': true}
    ]"
    :style="`--delay: ${0.2 + index * 0.1}s`"
    @click="$emit('select-vendor', vendor)"
  >
    <!-- Vendor Image with Overlay -->
    <div class="relative overflow-hidden group cursor-pointer">
      <img 
        :src="vendor.displayImage || getRandomFoodImage(vendor)" 
        :alt="vendor.restaurantName" 
        class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
      
      <!-- Action buttons -->
      <div class="absolute top-3 right-3 flex space-x-2 z-10">
        <button 
          class="bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          @click.stop="$emit('toggle-favorite', vendor._id)"
        >
          <Heart 
            size="18" 
            class="heart-icon transition-colors duration-300"
            :class="favorite ? 'text-red-500 fill-red-500' : 'text-gray-600'" 
          />
        </button>
      </div>
      
      <!-- Restaurant name and category on image -->
      <div class="absolute bottom-0 left-0 w-full p-4 z-10">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-bold text-lg text-white drop-shadow-md group-hover:text-red-100 transition-colors duration-300">
              {{ vendor.restaurantName }}
            </h3>
            <div class="flex items-center mt-1">
              <span class="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full mr-2">
                {{ vendor.category }}
              </span>
              <div class="flex items-center text-white text-xs">
                <MapPin size="12" class="mr-1" />
                <span class="truncate max-w-[100px]">{{ formatLocation(vendor.locationName) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Open/Closed Status -->
          <div>
            <div v-if="isVendorOpen" class="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse">
              <CheckCircle size="12" class="mr-1" />
              Open
            </div>
            <div v-else class="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Clock size="12" class="mr-1" />
              Closed
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Vendor Details -->
    <div class="p-4">
      <!-- Description -->
      <p class="text-sm text-gray-600 mb-3">{{ getVendorDescription(vendor) }}</p>
      
      <!-- Hours -->
      <div class="text-sm mb-4">
        <div class="flex items-center">
          <Clock size="14" class="mr-1 text-gray-500" />
          <span v-if="isVendorOpen" class="text-green-600 font-medium">
            Open until {{ getClosingTime(vendor) }}
          </span>
          <span v-else class="text-red-600">
            {{ getNextOpeningInfo(vendor) }}
          </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-between items-center">
        <button 
          class="text-sm text-red-600 hover:text-red-700 font-medium flex items-center group"
          @click.stop="$emit('select-vendor', vendor)"
        >
          View Menu
          <ChevronRight size="16" class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        
        <button 
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
          :class="isVendorOpen ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
          :disabled="!isVendorOpen"
          @click.stop="isVendorOpen ? $emit('order', vendor) : null"
        >
          <ShoppingBag size="16" class="mr-1" />
          {{ isVendorOpen ? 'Order Now' : 'Closed' }}
        </button>
      </div>
    </div>
    
    <!-- Overlay for closed vendors -->
    <div 
      v-if="!isVendorOpen" 
      class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 transition-opacity duration-300"
      @click.stop="$emit('select-vendor', vendor)"
    >
      <div class="bg-white/90 p-4 rounded-xl shadow-lg text-center transform transition-transform duration-300 animate-bounce-slow">
        <Clock size="28" class="mx-auto mb-2 text-red-500" />
        <p class="font-bold text-red-600 text-lg">Currently Closed</p>
        <p class="text-sm text-gray-600">{{ getNextOpeningInfo(vendor) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Heart, CheckCircle, Clock, ShoppingBag, MapPin } from 'lucide-vue-next';

// Props
const props = defineProps({
  vendor: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  isVendorOpen: {
    type: Boolean,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  getClosingTime: {
    type: Function,
    required: true
  },
  getNextOpeningInfo: {
    type: Function,
    required: true
  },
  getVendorDescription: {
    type: Function,
    required: true
  },
  formatLocation: {
    type: Function,
    required: true
  },
  isSuggested: {
    type: Boolean,
    default: false
  }
});

// Emit events
defineEmits(['toggle-favorite', 'select-vendor', 'order']);

// Sample food images for vendors without display images
const foodImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
];

// Get a random food image based on vendor ID for consistency
const getRandomFoodImage = (vendor) => {
  const index = vendor._id.charCodeAt(0) % foodImages.length;
  return `${foodImages[index]}?w=500&h=300&fit=crop`;
};
</script>

<style scoped>
.vendor-card {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.vendor-card:hover {
  transform: translateY(-5px);
}

.vendor-closed {
  filter: grayscale(30%);
}

.vendor-closed:hover {
  filter: grayscale(10%);
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: var(--delay, 0s);
}

.animate-bounce-slow {
  animation: bounceSlow 3s infinite;
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

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>