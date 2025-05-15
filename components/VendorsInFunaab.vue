<template>
  <section class="my-10 overflow-hidden">
    <!-- Animated Header with Gradient Underline -->
    <div class="flex justify-between items-center mb-8 animate-fade-in">
      <div class="relative">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
          Most Recent Vendors
          <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-width-expand"></span>
        </h2>
      </div>
      <NuxtLink to="/vendors" class="group flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-all duration-300 transform hover:translate-x-1">
        <span>View all</span>
        <ChevronRight size="20" class="transition-transform duration-300 group-hover:translate-x-1" />
      </NuxtLink>
    </div>
    
    <!-- Animated Search Bar -->
    <div class="relative mb-8 animate-slide-up" style="--delay: 0.2s">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search 
          class="text-gray-400 transition-colors duration-300"
          :class="{'text-red-500': isSearching || searchQuery}"
          size="20" 
        />
      </div>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search food or vendor" 
        class="w-full pl-10 pr-16 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
        @input="handleSearch"
      />
      
      <!-- Search Categories Pills -->
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2" v-if="!isSearching && !searchQuery">
        <button 
          v-for="(category, index) in popularCategories" 
          :key="category"
          @click="searchQuery = category; handleSearch()"
          class="text-xs px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md"
          :class="[categoryColors[index % categoryColors.length]]"
          :style="`animation-delay: ${0.3 + index * 0.1}s`"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Animated search spinner -->
      <div v-if="isSearching" class="absolute right-3 top-1/2 transform -translate-y-1/2 animate-fade-in">
        <div class="flex items-center space-x-2">
          <div class="relative">
            <div class="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <Pizza class="text-orange-500" size="12" />
            </div>
          </div>
          <span class="text-sm text-gray-500">Searching...</span>
        </div>
      </div>
    </div>
    
    <!-- Category Filters -->
    <div class="mb-8 overflow-x-auto scrollbar-hide">
      <div class="flex space-x-2 pb-2 animate-slide-up" style="--delay: 0.3s">
        <button 
          v-for="(category, index) in allCategories" 
          :key="category"
          @click="toggleCategoryFilter(category)"
          class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
          :class="[
            selectedCategories.includes(category) 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
          :style="`animation-delay: ${0.4 + index * 0.05}s`"
        >
          {{ category }}
        </button>
      </div>
    </div>
    
    <!-- Loading State with Animated Food Icons -->
    <div v-if="isLoading" class="py-16 animate-fade-in">
      <div class="flex flex-col items-center justify-center">
        <div class="relative mb-6">
          <div class="w-16 h-16  border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <Pizza class="text-orange-500 animate-bounce-slow" size="24" />
          </div>
          
          <!-- Orbiting food icons -->
          <div class="absolute top-0 left-0 w-full h-full animate-orbit" style="animation-delay: 0s">
            <Coffee class="absolute -top-2 text-amber-500" size="16" />
          </div>
          <div class="absolute top-0 left-0 w-full h-full animate-orbit" style="animation-delay: 1s">
            <Utensils class="absolute -top-2 text-green-500" size="16" />
          </div>
          <div class="absolute top-0 left-0 w-full h-full animate-orbit" style="animation-delay: 2s">
            <Soup class="absolute -top-2 text-purple-500" size="16" />
          </div>
        </div>
        <p class="text-gray-600 font-medium animate-pulse">Discovering delicious options...</p>
      </div>
    </div>
    
    <!-- Search Results -->
    <div v-else-if="searchQuery && !isSearching" class="animate-fade-in ">
      <div class="" v-if="filteredVendors.length > 0">
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <Search size="18" class="mr-2 text-red-500" />
          Results for "{{ searchQuery }}"
          <span class="ml-2 text-sm font-normal text-gray-500">({{ filteredVendors.length }} vendors found)</span>
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <VendorCard 
            v-for="(vendor, index) in filteredVendors" 
            :key="vendor._id"
            :vendor="vendor"
            :index="index"
            :is-vendor-open="isVendorOpen(vendor)"
            :favorite="favoriteVendors[vendor._id]"
            @toggle-favorite="toggleFavorite"
            @select-vendor="handleSelectedVendor"
            @order="handleOrder"
            :get-closing-time="getClosingTime"
            :get-next-opening-info="getNextOpeningInfo"
            :get-vendor-description="getVendorDescription"
            :format-location="formatLocation"
          />
        </div>
      </div>
      <div v-else class="py-10 animate-fade-in">
        <div class="w-full mx-auto text-center">
          <div class="relative max-w-xs mx-auto mb-8">
            <div class="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <Search size="48" class="text-gray-300 mb-4" />
                <div class="flex space-x-4">
                  <Pizza class="text-red-400 animate-float" size="24" style="animation-delay: 0s" />
                  <Coffee class="text-amber-400 animate-float" size="24" style="animation-delay: 0.5s" />
                  <Utensils class="text-orange-400 animate-float" size="24" style="animation-delay: 1s" />
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-2xl font-bold mb-2">No results found</h3>
          <p class="text-gray-500 mb-8">We couldn't find any vendors matching '{{ searchQuery }}'</p>
          
          <div class="mx-auto container w-full">
            <h3 class="text-xl font-bold mb-6 flex items-center justify-center">
              <Sparkles size="20" class="mr-2 text-amber-500" />
              You may also like
            </h3>
            
            <div class="grid grid-cols-1 w-full sm:grid-cols-2  lg:grid-cols-3 gap-6">
              <VendorCard 
                v-for="(vendor, index) in suggestedVendors" 
                :key="vendor._id"
                :vendor="vendor"
                :index="index"
                :is-vendor-open="isVendorOpen(vendor)"
                :favorite="favoriteVendors[vendor._id]"
                @toggle-favorite="toggleFavorite"
                @select-vendor="handleSelectedVendor"
                @order="handleOrder"
                :get-closing-time="getClosingTime"
                :get-next-opening-info="getNextOpeningInfo"
                :get-vendor-description="getVendorDescription"
                :format-location="formatLocation"
                :is-suggested="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- All Vendors Grid with Staggered Animation -->
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VendorCard 
          v-for="(vendor, index) in filteredRecentVendors" 
          :key="vendor._id"
          :vendor="vendor"
          :index="index"
          :is-vendor-open="isVendorOpen(vendor)"
          :favorite="favoriteVendors[vendor._id]"
          @toggle-favorite="toggleFavorite"
          @select-vendor="handleSelectedVendor"
          @order="handleOrder"
          :get-closing-time="getClosingTime"
          :get-next-opening-info="getNextOpeningInfo"
          :get-vendor-description="getVendorDescription"
          :format-location="formatLocation"
        />
      </div>
    </div>

    <!-- Vendor Closed Modal with Animation -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isCloseModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" @click="isCloseModalOpen = false">
          <div class="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative animate-modal-pop" @click.stop>
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg">
              <div class="relative">
                <Clock size="32" class="text-red-500" />
                <div class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping-slow"></div>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Restaurant Closed</h3>
              <p class="text-gray-600 mb-6">
                Sorry, this restaurant is currently closed. Please check back later for availability.
              </p>
              
              <div class="flex justify-center space-x-4">
                <button @click="isCloseModalOpen = false" class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Close
                </button>
                <button @click="showAllOpenVendors" class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center">
                  <CheckCircle size="18" class="mr-2" />
                  Show Open Vendors
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Scroll to top button -->
    <button 
      v-show="showScrollTop"
      @click="scrollToTop" 
      class="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl transform hover:scale-110 z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp size="24" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useFormattedString } from '@/composables/core/useFormatVendorName';
import { 
  ChevronRight, 
  ChevronUp,
  Search, 
  Heart, 
  CheckCircle, 
  Star, 
  Pizza, 
  Coffee, 
  Clock,
  Utensils,
  Soup,
  Sparkles,
  MapPin
} from 'lucide-vue-next';
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors';
import VendorCard from './VendorCard.vue';

const router = useRouter();
const isCloseModalOpen = ref(false);
const { formatString } = useFormattedString();
const showScrollTop = ref(false);
const selectedVendor = ref(null);

// Define the working hours interface
interface WorkingHour {
  _id: string;
  day: string;
  isActive: boolean;
  openingTime: string;
  closingTime: string;
}

// Define the vendor interface based on the backend structure
interface Vendor {
  _id: string;
  restaurantName: string;
  email: string;
  phoneNumber: string;
  locationName: string;
  address: string;
  category: string;
  isStoreOpen: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  workingHours?: WorkingHour[];
  displayImage?: string;
  packSettings?: {
    limit: number;
    price: number;
    _id: string;
  };
  slug?: string;
}

const { vendors, loading: isLoading } = useFetchVendors();

const searchQuery = ref('');
const isSearching = ref(false);
const searchTimeout = ref<number | null>(null);
const favoriteVendors = reactive<Record<string, boolean>>({});
const currentDay = ref('');
const currentTime = ref('');
const selectedCategories = ref<string[]>([]);

// Category colors for pills
const categoryColors = [
  'bg-red-100 text-red-700',
  'bg-orange-100 text-orange-700',
  'bg-amber-100 text-amber-700',
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
];

// Popular search categories
const popularCategories = ['Pizza', 'Burger', 'Sushi', 'Vegan'];

// All available categories
const allCategories = computed(() => {
  const categories = new Set<string>();
  vendors.value?.forEach((vendor: Vendor) => {
    if (vendor.category) {
      categories.add(vendor.category);
    }
  });
  return Array.from(categories);
});

// Toggle category filter
const toggleCategoryFilter = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

// Filtered vendors based on selected categories
const filteredRecentVendors = computed(() => {
  let filtered = recentVendors.value;
  
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter((vendor: Vendor) => 
      selectedCategories.value.includes(vendor.category)
    );
  }
  
  return filtered;
});

// Recent vendors computation
const recentVendors = computed(() => {
  if (Array.isArray(vendors?.value) && vendors?.value.length > 0) {
    return vendors?.value
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by latest first
      .slice(0, 8); // Get the first 8 elements
  }
  return []; // Return an empty array if no vendors
});

// Initialize current day and time
onMounted(() => {
  updateCurrentDateTime();
  // Update time every minute
  setInterval(updateCurrentDateTime, 60000);
  
  // Add scroll event listener for scroll-to-top button
  window.addEventListener('scroll', handleScroll);
  
  // Initialize with random favorites for demo
  if (vendors.value?.length) {
    vendors.value.forEach((vendor: Vendor) => {
      if (Math.random() > 0.7) { // 30% chance to be favorited
        favoriteVendors[vendor._id] = true;
      }
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});

// Handle scroll for scroll-to-top button
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Function to update current date and time
const updateCurrentDateTime = () => {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDay.value = days[now.getDay()];
  
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
};

// Check if vendor is currently open based on working hours
const isVendorOpen = (vendor: Vendor): boolean => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return vendor.isStoreOpen; // Fallback to the isStoreOpen flag if no working hours
  }
  
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  
  if (!todayHours || !todayHours.isActive) {
    return false; // Closed if today is not active
  }
  
  // Compare current time with opening and closing times
  return isTimeInRange(currentTime.value, todayHours.openingTime, todayHours.closingTime);
};

// Check if a time is within a range
const isTimeInRange = (time: string, start: string, end: string): boolean => {
  // Convert times to comparable format (minutes since midnight)
  const timeMinutes = convertTimeToMinutes(time);
  const startMinutes = convertTimeToMinutes(start);
  const endMinutes = convertTimeToMinutes(end);
  
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
};

// Convert time string (HH:MM) to minutes since midnight
const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Get closing time for a vendor
const getClosingTime = (vendor: Vendor): string => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return 'Unknown';
  }
  
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  
  if (!todayHours || !todayHours.isActive) {
    return 'Closed today';
  }
  
  return formatTime(todayHours.closingTime);
};

// Format time for display (convert 24h to 12h format)
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get next opening information for a closed vendor
const getNextOpeningInfo = (vendor: Vendor): string => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return 'Opening hours unavailable';
  }
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = days.indexOf(currentDay.value);
  
  // Check if vendor opens later today
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  if (todayHours && todayHours.isActive) {
    const openingMinutes = convertTimeToMinutes(todayHours.openingTime);
    const currentMinutes = convertTimeToMinutes(currentTime.value);
    
    if (currentMinutes < openingMinutes) {
      return `Opens today at ${formatTime(todayHours.openingTime)}`;
    }
  }
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = days[nextDayIndex];
    const nextDayHours = vendor.workingHours.find(hour => hour.day === nextDay);
    
    if (nextDayHours && nextDayHours.isActive) {
      if (i === 1) {
        return `Opens tomorrow at ${formatTime(nextDayHours.openingTime)}`;
      } else {
        return `Opens ${nextDay} at ${formatTime(nextDayHours.openingTime)}`;
      }
    }
  }
  
  return 'No upcoming opening hours';
};

const handleSearch = () => {
  isSearching.value = true;
  
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  searchTimeout.value = window.setTimeout(() => {
    // Simulate API call delay
    setTimeout(() => {
      isSearching.value = false;
    }, 800);
  }, 300);
};

const toggleFavorite = (vendorId: string) => {
  favoriteVendors[vendorId] = !favoriteVendors[vendorId];
  
  // Add a little animation to the heart
  const heartEl = document.querySelector(`[data-vendor-id="${vendorId}"] .heart-icon`);
  if (heartEl) {
    heartEl.classList.add('animate-heart-beat');
    setTimeout(() => {
      heartEl.classList.remove('animate-heart-beat');
    }, 1000);
  }
};

// Helper function to get a description for a vendor
const getVendorDescription = (vendor: Vendor): string => {
  return `${vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)} at ${vendor.locationName}`;
};

// Helper function to format location
const formatLocation = (location: string): string => {
  return location.length > 20 ? location.substring(0, 20) + '...' : location;
};

const filteredVendors = computed(() => {
  if (!searchQuery.value) return vendors.value;
  
  const query = searchQuery.value.toLowerCase();
  
  return vendors?.value?.filter((vendor: Vendor) => 
    vendor.restaurantName.toLowerCase().includes(query) ||
    vendor.category.toLowerCase().includes(query) ||
    vendor.locationName.toLowerCase().includes(query) ||
    vendor.address.toLowerCase().includes(query)
  );
});

const suggestedVendors = computed(() => {
  // Return random vendors that are currently open
  return [...vendors.value]
    .filter((vendor: Vendor) => isVendorOpen(vendor))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
});

const handleSelectedVendor = (vendor: Vendor) => {
  selectedVendor.value = vendor;
  
  if(!isVendorOpen(vendor)){
    isCloseModalOpen.value = true;
  } else {
    localStorage.setItem('selected-vendor', JSON.stringify(vendor));
    const formatted = formatString(vendor.restaurantName);
    router.push(`/${formatted}`);
  }
};

const handleOrder = (vendor: Vendor) => {
  localStorage.setItem('selected-vendor', JSON.stringify(vendor));
  const formatted = formatString(vendor.restaurantName);
  router.push(`/${vendor.slug || formatted}`);
};

const showAllOpenVendors = () => {
  isCloseModalOpen.value = false;
  selectedCategories.value = [];
  searchQuery.value = '';
  
  // Scroll to the first open vendor with a highlight effect
  setTimeout(() => {
    const openVendors = vendors.value.filter((vendor: Vendor) => isVendorOpen(vendor));
    if (openVendors.length > 0) {
      const firstOpenVendor = document.querySelector(`[data-vendor-id="${openVendors[0]._id}"]`);
      if (firstOpenVendor) {
        firstOpenVendor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstOpenVendor.classList.add('highlight-vendor');
        setTimeout(() => {
          firstOpenVendor.classList.remove('highlight-vendor');
        }, 2000);
      }
    }
  }, 100);
};
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-width-expand {
  animation: widthExpand 0.8s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: pingSlow 2s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-orbit {
  animation: orbit 8s linear infinite;
}

.animate-heart-beat {
  animation: heartBeat 0.5s ease-in-out;
}

.animate-modal-pop {
  animation: modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.highlight-vendor {
  animation: highlightVendor 2s ease-in-out;
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes pingSlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

@keyframes modalPop {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes highlightVendor {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.3);
  }
}

/* Modal transitions */

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Hide scrollbar but allow scrolling */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>

<!-- VendorCard Component -->