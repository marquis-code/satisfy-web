<template>
  <section class="my-10 max-w-7xl mx-auto">
<div class="my-6">
  <button class="bg-black text-white px-6 py-2 rounded-full text-sm" @click="router.back()">
      Go Back
    </button>
</div>
    <!-- <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Most Recent Vendors</h2>
      <NuxtLink to="/vendors" class="text-red-700 hover:text-red-800 flex items-center transition-colors duration-300">
        View all
        <ChevronRight size="20" />
      </NuxtLink>
    </div> -->
    
    <div class="relative mb-6">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search food or vendor" 
        class="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        @input="handleSearch"
      />
      <Search 
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        :class="{'text-red-500': isSearching}"
        size="20" 
      />
      
      <!-- Animated search spinner -->
      <div v-if="isSearching" class="absolute right-3 top-1/2 transform -translate-y-1/2">
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
    
    <!-- Loading State -->
    <div v-if="isLoading" class="py-10">
      <div :class="'py-10'" class="flex flex-col items-center justify-center">
        <div class="relative">
          <div class="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <Pizza class="text-orange-500" size="20" />
          </div>
        </div>
        <p class="mt-4 text-gray-600">Loading vendors...</p>
      </div>
    </div>
    
    <!-- Search Results -->
    <div v-else-if="searchQuery && !isSearching">
      <div v-if="filteredVendors.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            v-for="vendor in filteredVendors" 
            :key="vendor._id"
            @click="handleSelectedVendor(vendor)"
            class="vendor-card bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            :class="{'vendor-closed': !isVendorOpen(vendor)}"
          >
            <div class="relative cursor-pointer">
              <img :src="vendor.displayImage" :alt="vendor.restaurantName" class="w-full h-48 cursor-pointer object-cover transition-all duration-300" />
              <div class="absolute top-2 right-2 flex space-x-2">
                <button class="bg-white rounded-full p-1.5 shadow-sm transition-transform duration-300 hover:scale-110">
                  <Heart size="18" :class="favoriteVendors[vendor._id] ? 'text-red-500 fill-red-500' : 'text-gray-600'" @click.stop="toggleFavorite(vendor._id)" />
                </button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div v-if="isVendorOpen(vendor)" class="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center animate-pulse">
                  <CheckCircle size="14" class="mr-1" />
                  Open Now
                </div>
                <div v-else class="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Clock size="14" class="mr-1" />
                  Closed
                </div>
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg">{{ vendor.restaurantName }}</h3>
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ getVendorDescription(vendor) }}</p>
              
              <div class="mt-3 flex items-center">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">{{ vendor.category }}</span>
                <span class="ml-2 text-xs text-gray-500">{{ formatLocation(vendor.locationName) }}</span>
              </div>
              
              <div class="mt-3 text-sm">
                <div class="flex items-center">
                  <Clock size="14" class="mr-1 text-gray-500" />
                  <span v-if="isVendorOpen(vendor)" class="text-green-600">
                    Open until {{ getClosingTime(vendor) }}
                  </span>
                  <span v-else class="text-red-600">
                    {{ getNextOpeningInfo(vendor) }}
                  </span>
                </div>
              </div>
              
              <div class="mt-4 flex justify-between items-center">
                <a href="#" class="text-sm text-red-700 hover:text-red-800 font-medium">View Menu</a>
                <button 
                  class="transition-all duration-300"
                  :class="isVendorOpen(vendor) ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  :disabled="!isVendorOpen(vendor)"
                  @click.stop="isVendorOpen(vendor) ? handleOrder(vendor) : null"
                  :title="isVendorOpen(vendor) ? 'Order Now' : 'Currently Closed'"
                  >
                  <span class="px-3 py-1 rounded-md text-sm block">
                    {{ isVendorOpen(vendor) ? 'Order Now' : 'Closed' }}
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Overlay for closed vendors -->
            <div v-if="!isVendorOpen(vendor)" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity duration-300">
              <div class="bg-white/80 p-3 rounded-lg shadow-lg text-center transform transition-transform duration-300 animate-bounce-slow">
                <Clock size="24" class="mx-auto mb-2 text-red-500" />
                <p class="font-bold text-red-600">Currently Closed</p>
                <p class="text-sm text-gray-600">{{ getNextOpeningInfo(vendor) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="py-10 text-center">
          <div class="relative max-w-xs mx-auto mb-6">
            <img src="/illustrations/no-results.svg" alt="Empty state illustration" class="w-full" />
            <Pizza class="absolute top-0 right-0 text-red-500" size="32" />
            <Coffee class="absolute bottom-0 left-0 text-orange-500" size="32" />
          </div>
          <h3 class="text-xl font-bold mb-2">No results found</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any vendors matching '{{ searchQuery }}'</p>
          
          <div class="max-w-3xl mx-auto">
            <h3 class="text-xl font-bold mb-4">You may also like</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              <div 
                v-for="vendor in suggestedVendors" 
                :key="vendor._id" 
                @click="handleSelectedVendor(vendor)"
                class="vendor-card bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                :class="{'vendor-closed': !isVendorOpen(vendor)}"
              >
                <div class="relative">
                  <img :src="vendor?.displayImage" :alt="vendor.restaurantName" class="w-full h-32 object-cover transition-all duration-300" />
                  <div class="absolute top-2 right-2">
                    <button class="bg-white rounded-full p-1.5 shadow-sm transition-transform duration-300 hover:scale-110">
                      <Heart size="18" :class="favoriteVendors[vendor._id] ? 'text-red-500 fill-red-500' : 'text-gray-600'" @click.stop="toggleFavorite(vendor._id)" />
                    </button>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <div v-if="isVendorOpen(vendor)" class="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center animate-pulse">
                      <CheckCircle size="14" class="mr-1" />
                      Open
                    </div>
                    <div v-else class="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock size="14" class="mr-1" />
                      Closed
                    </div>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="font-bold">{{ vendor.restaurantName }}</h4>
                  <p class="text-sm text-gray-500">{{ getVendorDescription(vendor) }}</p>
                  <div class="flex items-center mt-2">
                    <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">{{ vendor.category }}</span>
                  </div>
                  <div class="mt-2 text-xs">
                    <div class="flex items-center">
                      <Clock size="12" class="mr-1 text-gray-500" />
                      <span v-if="isVendorOpen(vendor)" class="text-green-600">
                        Open until {{ getClosingTime(vendor) }}
                      </span>
                      <span v-else class="text-red-600">
                        {{ getNextOpeningInfo(vendor) }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Overlay for closed vendors -->
                <div v-if="!isVendorOpen(vendor)" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity duration-300">
                  <div class="bg-white/80 p-2 rounded-lg shadow-lg text-center transform transition-transform duration-300 animate-bounce-slow">
                    <Clock size="20" class="mx-auto mb-1 text-red-500" />
                    <p class="font-bold text-sm text-red-600">Currently Closed</p>
                    <p class="text-xs text-gray-600">{{ getNextOpeningInfo(vendor) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- All Vendors Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="vendor in recentVendors" 
        :key="vendor._id"
        @click="handleSelectedVendor(vendor)"
        class="vendor-card bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative"
        :class="{'vendor-closed': !isVendorOpen(vendor)}"
      >
        <div class="relative">
          <img :src="vendor?.displayImage" :alt="vendor.restaurantName" class="w-full h-48 object-cover transition-all duration-300" />
          <div class="absolute top-2 right-2 flex space-x-2">
            <button class="bg-white rounded-full p-1.5 shadow-sm transition-transform duration-300 hover:scale-110">
              <Heart size="18" :class="favoriteVendors[vendor._id] ? 'text-red-500 fill-red-500' : 'text-gray-600'" @click.stop="toggleFavorite(vendor._id)" />
            </button>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div v-if="isVendorOpen(vendor)" class="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center animate-pulse">
              <CheckCircle size="14" class="mr-1" />
              Open Now
            </div>
            <div v-else class="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
              <Clock size="14" class="mr-1" />
              Closed
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-lg">{{ vendor.restaurantName }}</h3>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ getVendorDescription(vendor) }}</p>
          
          <div class="mt-3 flex items-center">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">{{ vendor.category }}</span>
            <span class="ml-2 text-xs text-gray-500">{{ formatLocation(vendor.locationName) }}</span>
          </div>
          
          <div class="mt-3 text-sm">
            <div class="flex items-center">
              <Clock size="14" class="mr-1 text-gray-500" />
              <span v-if="isVendorOpen(vendor)" class="text-green-600">
                Open until {{ getClosingTime(vendor) }}
              </span>
              <span v-else class="text-red-600">
                {{ getNextOpeningInfo(vendor) }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 flex justify-between items-center">
            <a href="#" class="text-sm text-red-700 hover:text-red-800 font-medium">View Menu</a>
            <button 
              class="transition-all duration-300"
              :class="isVendorOpen(vendor) ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
              :disabled="!isVendorOpen(vendor)"
              @click.stop="isVendorOpen(vendor) ? handleOrder(vendor) : null"
              :title="isVendorOpen(vendor) ? 'Order Now' : 'Currently Closed'"
              >
              <span class="px-3 py-1 rounded-md text-sm block">
                {{ isVendorOpen(vendor) ? 'Order Now' : 'Closed' }}
              </span>
            </button>
          </div>
        </div>
        
        <!-- Overlay for closed vendors -->
        <div v-if="!isVendorOpen(vendor)" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity duration-300">
          <div class="bg-white/80 p-3 rounded-lg shadow-lg text-center transform transition-transform duration-300 animate-bounce-slow">
            <Clock size="24" class="mx-auto mb-2 text-red-500" />
            <p class="font-bold text-red-600">Currently Closed</p>
            <p class="text-sm text-gray-600">{{ getNextOpeningInfo(vendor) }}</p>
          </div>
        </div>
      </div>
    </div>

    <CoreModal :isOpen="isCloseModalOpen" @close="isCloseModalOpen = false">
      <div class="p-6 rounded-md w-5/12 relative" @click.stop>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div
            class="bg-white rounded-md p-6 shadow-lg w-full space-y-4 max-w-md relative text-center"
          >
            <div class="flex justify-center items-center mb-4">
              <div class="">
                <svg
                  width="65"
                  height="64"
                  viewBox="0 0 65 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.923828"
                    width="63.1513"
                    height="64"
                    rx="31.5756"
                    fill="#0F973D"
                  />
                  <path
                    d="M44.1631 32.3596C44.1631 25.7418 38.7982 20.377 32.1804 20.377C25.5626 20.377 20.1978 25.7418 20.1978 32.3596C20.1978 38.9774 25.5626 44.3423 32.1804 44.3423C38.7982 44.3423 44.1631 38.9774 44.1631 32.3596Z"
                    stroke="white"
                    stroke-width="1.7974"
                  />
                  <path
                    d="M27.584 32.9633L30.5297 35.9839L37.0103 28.7344"
                    stroke="white"
                    stroke-width="1.7974"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <p class="text-xl font-semibold text-[#667185] mb-4">
              Restaurant Closed
            </p>
            <p class="text-[#667185] mb-6 leading-snug">
              Sorry, this restaurant is currently closed. Please check back later for availability.
            </p>
            <div class="pt-6">
              <button
                @click="isCloseModalOpen = false"
                class="bg-[#292929] text-[#EAEAEA] w-full py-3.5 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CoreModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useFormattedString } from '@/composables/core/useFormatVendorName'
import { ChevronRight, Search, Heart, CheckCircle, Star, Pizza, Coffee, Clock } from 'lucide-vue-next';
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors'
const router = useRouter()
const isCloseModalOpen = ref(false)
const { formatString } = useFormattedString()

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
}

const recentVendors = computed(() => {
  if (Array.isArray(vendors?.value) && vendors?.value.length > 0) {
    return vendors?.value
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest first
      // .slice(0, 6); // Get the first 6 elements
  }
  return []; // Return an empty array if no vendors
});

const { vendors, loading: isLoading } = useFetchVendors();

const searchQuery = ref('');
const isSearching = ref(false);
const searchTimeout = ref<number | null>(null);
const favoriteVendors = reactive<Record<string, boolean>>({});
const currentDay = ref('');
const currentTime = ref('');

// Initialize current day and time
onMounted(() => {
  updateCurrentDateTime();
  // Update time every minute
  setInterval(updateCurrentDateTime, 60000);
});

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
    isLoading.value = true;
    
    // Simulate API call delay
    setTimeout(() => {
      isSearching.value = false;
      isLoading.value = false;
    }, 1500);
  }, 500);
};

const toggleFavorite = (vendorId: string) => {
  favoriteVendors[vendorId] = !favoriteVendors[vendorId];
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
  
  return vendors?.value?.slice(0, 3).filter((vendor: Vendor) => 
    vendor.restaurantName.toLowerCase().includes(query) ||
    vendor.category.toLowerCase().includes(query) ||
    vendor.locationName.toLowerCase().includes(query) ||
    vendor.address.toLowerCase().includes(query)
  );
});

const suggestedVendors = computed(() => {
  // Since we don't have ratings, we'll just return random vendors
  return [...vendors.value]
    .sort(() => 0.5 - Math.random())
    // .slice(0, 6);
});

const handleSelectedVendor = (vendor: Vendor) => {
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
  router.push(`/${vendor?.slug}`);
};
</script>

<style scoped>
.vendor-card {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.vendor-closed {
  filter: grayscale(20%);
}

.vendor-closed:hover {
  filter: grayscale(0%);
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>