<template>
  <div class="min-h-screen">
    <div class="container mx-auto">
      <!-- Working Hours Section -->
      <div class="bg-white dark:bg-gray-800 rounded-md shadow-xl p-8 mb-8 transform transition-all duration-500 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-8">
          <span class="relative group">
            Vendor Availability
            <span class="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
          <Clock class="ml-3 h-6 w-6 text-orange-500" />
        </h2>
        
        <div v-if="isLoading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        
        <div v-else class="space-y-6">
          <div 
            v-for="(day, index) in workingHours" 
            :key="day.name"
            class="grid grid-cols-1 md:grid-cols-3 items-center gap-6 py-5 border-[0.5px] px-2 border-gray-100 dark:border-gray-700 last:border-0 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            :class="{'animate-pulse-once': day.isUpdating}"
          >
            <div class="text-gray-700 dark:text-gray-300 font-medium text-lg">{{ day.name }}</div>
            
            <div class="flex justify-center">
              <div 
                class="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 relative"
                :class="[
                  day.isActive ? 'bg-green-500' : 'bg-red-500',
                  day.isUpdating ? 'opacity-70' : ''
                ]"
                @click="toggleDayAvailability(day)"
              >
                <div v-if="day.isUpdating" class="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-20">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
                <Clock v-else-if="day.isActive" class="h-6 w-6 text-white" />
                <X v-else class="h-6 w-6 text-white" />
                <span class="absolute -bottom-6 text-xs font-medium" :class="day.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ day.isActive ? 'Available' : 'Unavailable' }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Opening Time -->
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Opening Time</div>
                <div class="relative">
                  <input 
                    type="time" 
                    v-model="day.openingTime"
                    :disabled="!day.isActive || day.isUpdating"
                    class="w-full border rounded-lg py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    :class="day.isActive 
                      ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white' 
                      : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'"
                    @focus="day.isFocused = 'opening'"
                    @blur="day.isFocused = null"
                    @change="handleTimeChange(day, 'opening')"
                  />
                  <!-- <Clock 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200" 
                    :class="day.isActive ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'"
                  /> -->
                  <span 
                    class="absolute inset-0 border-2 border-orange-500 rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none"
                    :class="{'opacity-100': day.isActive && day.isFocused === 'opening'}"
                  ></span>
                </div>
                
                <!-- Opening Time Save Button - Separate and animated -->
                <Transition name="slide-up">
                  <button 
                    v-if="day.isActive && day.hasOpeningTimeChanged"
                    @click="saveTimeChange(day, 'opening')"
                    class="mt-2 w-full text-xs flex items-center justify-center py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    :disabled="day.isUpdatingTime === 'opening'"
                  >
                    <div v-if="day.isUpdatingTime === 'opening'" class="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                    <Save v-else class="h-4 w-4 mr-2" />
                    <span>Save Opening Time</span>
                  </button>
                </Transition>
              </div>
              
              <!-- Closing Time -->
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Closing Time</div>
                <div class="relative">
                  <input 
                    type="time" 
                    v-model="day.closingTime"
                    :disabled="!day.isActive || day.isUpdating"
                    class="w-full border rounded-lg py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    :class="day.isActive 
                      ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white' 
                      : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'"
                    @focus="day.isFocused = 'closing'"
                    @blur="day.isFocused = null"
                    @change="handleTimeChange(day, 'closing')"
                  />
                  <!-- <Clock 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200" 
                    :class="day.isActive ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'"
                  /> -->
                  <span 
                    class="absolute inset-0 border-2 border-orange-500 rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none"
                    :class="{'opacity-100': day.isActive && day.isFocused === 'closing'}"
                  ></span>
                </div>
                
                <!-- Closing Time Save Button - Separate and animated -->
                <Transition name="slide-up">
                  <button 
                    v-if="day.isActive && day.hasClosingTimeChanged"
                    @click="saveTimeChange(day, 'closing')"
                    class="mt-2 w-full flex text-xs items-center justify-center py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    :disabled="day.isUpdatingTime === 'closing'"
                  >
                    <div v-if="day.isUpdatingTime === 'closing'" class="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                    <Save v-else class="h-4 w-4 mr-2" />
                    <span>Save Closing Time</span>
                  </button>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Availability Summary Card -->
      <div class="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <span class="relative group">
            Availability Summary
            <span class="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </h3>
        
        <div v-if="isLoading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-lg p-4 border border-green-100 dark:border-green-800 transition-all duration-300 hover:shadow-md">
            <h4 class="text-green-700 dark:text-green-400 font-medium mb-2 flex items-center">
              <CheckCircle class="h-5 w-5 mr-2" />
              Available Days
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="day in availableDays" 
                :key="day.name"
                class="px-3 py-1 bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 rounded-full text-sm transition-all duration-200 hover:bg-green-200 dark:hover:bg-green-800/60"
              >
                {{ day.name }}
              </span>
              <span v-if="availableDays.length === 0" class="text-gray-500 dark:text-gray-400 text-sm italic">
                No available days
              </span>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 rounded-lg p-4 border border-red-100 dark:border-red-800 transition-all duration-300 hover:shadow-md">
            <h4 class="text-red-700 dark:text-red-400 font-medium mb-2 flex items-center">
              <X class="h-5 w-5 mr-2" />
              Unavailable Days
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="day in unavailableDays" 
                :key="day.name"
                class="px-3 py-1 bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-300 rounded-full text-sm transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-800/60"
              >
                {{ day.name }}
              </span>
              <span v-if="unavailableDays.length === 0" class="text-gray-500 dark:text-gray-400 text-sm italic">
                No unavailable days
              </span>
            </div>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:shadow-md">
          <h4 class="text-blue-700 dark:text-blue-400 font-medium mb-2 flex items-center">
            <Info class="h-5 w-5 mr-2" />
            Weekly Hours
          </h4>
          <p class="text-gray-700 dark:text-gray-300">
            You are available for <span class="font-bold text-blue-600 dark:text-blue-300">{{ totalHours }}</span> hours per week.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Success Toast -->
  <Teleport to="body">
    <Transition name="toast">
      <div 
        v-if="showSuccessToast" 
        class="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 transform transition-all duration-500"
      >
        <CheckCircle class="h-5 w-5 mr-2" />
        <span>{{ successMessage }}</span>
      </div>
    </Transition>

    <!-- Error Toast -->
    <Transition name="toast">
      <div 
        v-if="showErrorToast" 
        class="fixed bottom-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 transform transition-all duration-500"
      >
        <AlertTriangle class="h-5 w-5 mr-2" />
        <span>{{ errorMessage }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useUpdateWorkingHours } from "@/composables/modules/vendor/useUpdateWorkngHours"
import { useFetchVendor } from "@/composables/modules/vendor/useFetchVendor"
import { 
  Clock, 
  X,
  AlertTriangle,
  CheckCircle,
  Save,
  Info
} from 'lucide-vue-next'
import { definePageMeta } from '#imports'

const { updateWorkingHours, loading: updateLoading } = useUpdateWorkingHours()
const { vendor: vendorObj, fetchVendor, loading: fetchingVendor } = useFetchVendor()

// Types
interface WorkingHour {
  _id?: string
  name: string
  day: string
  openingTime: string
  closingTime: string
  isActive: boolean
  isUpdating?: boolean
  isUpdatingTime?: 'opening' | 'closing' | null
  isFocused?: 'opening' | 'closing' | null
  originalOpeningTime: string
  originalClosingTime: string
  hasOpeningTimeChanged: boolean
  hasClosingTimeChanged: boolean
}

// Working Hours Data
const workingHours = ref<WorkingHour[]>([])
const isLoading = computed(() => fetchingVendor.value || updateLoading.value)

// Toast state
const showSuccessToast = ref(false)
const successMessage = ref('')
const showErrorToast = ref(false)
const errorMessage = ref('')

// Computed properties for summary
const availableDays = computed(() => {
  return workingHours.value.filter(day => day.isActive)
})

const unavailableDays = computed(() => {
  return workingHours.value.filter(day => !day.isActive)
})

const totalHours = computed(() => {
  let total = 0
  
  for (const day of workingHours.value) {
    if (day.isActive) {
      const openTime = new Date(`2000-01-01T${day.openingTime}:00`)
      const closeTime = new Date(`2000-01-01T${day.closingTime}:00`)
      
      // If closing time is before opening time, assume it's the next day
      let diff = closeTime.getTime() - openTime.getTime()
      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000 // Add 24 hours
      }
      
      // Convert milliseconds to hours
      total += diff / (1000 * 60 * 60)
    }
  }
  
  return total.toFixed(1)
})

// Initialize working hours from vendor object
function initializeWorkingHours() {
  if (!vendorObj.value || !vendorObj.value.workingHours || !Array.isArray(vendorObj.value.workingHours)) {
    console.error('Vendor object or working hours not available', vendorObj.value)
    return
  }
  
  const vendorWorkingHours = vendorObj.value.workingHours
  
  // Map the vendor working hours to our component format
  workingHours.value = vendorWorkingHours.map(dayData => {
    return {
      _id: dayData._id,
      name: dayData.day,
      day: dayData.day,
      openingTime: dayData.openingTime,
      closingTime: dayData.closingTime,
      isActive: dayData.isActive,
      originalOpeningTime: dayData.openingTime,
      originalClosingTime: dayData.closingTime,
      hasOpeningTimeChanged: false,
      hasClosingTimeChanged: false
    }
  })
  
  // Sort days in correct order if needed
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  workingHours.value.sort((a, b) => {
    return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  })
  
  console.log('Initialized working hours:', workingHours.value)
}

// Handle time changes
function handleTimeChange(day: WorkingHour, timeType: 'opening' | 'closing') {
  if (timeType === 'opening') {
    day.hasOpeningTimeChanged = day.openingTime !== day.originalOpeningTime
  } else {
    day.hasClosingTimeChanged = day.closingTime !== day.originalClosingTime
  }
}

// Save time changes
async function saveTimeChange(day: WorkingHour, timeType: 'opening' | 'closing') {
  try {
    // Set loading state
    day.isUpdatingTime = timeType
    
    // Prepare the payload for the API
    const payload = {
      day: day.day,
      openingTime: day.openingTime,
      closingTime: day.closingTime,
      isActive: day.isActive
    }
    
    console.log('Updating working hours with payload:', payload)
    
    // Call the backend API
    await updateWorkingHours(payload)
    
    // Update the original values after successful update
    if (timeType === 'opening') {
      day.originalOpeningTime = day.openingTime
      day.hasOpeningTimeChanged = false
    } else {
      day.originalClosingTime = day.closingTime
      day.hasClosingTimeChanged = false
    }
    
    // Refresh vendor data
    await fetchVendor()
    
    // Re-initialize working hours with fresh data
    initializeWorkingHours()
    
    // Show success message
    showToast(`Updated ${day.day} ${timeType === 'opening' ? 'opening' : 'closing'} time`)
  } catch (error) {
    // Revert to original value on error
    if (timeType === 'opening') {
      day.openingTime = day.originalOpeningTime
      day.hasOpeningTimeChanged = false
    } else {
      day.closingTime = day.originalClosingTime
      day.hasClosingTimeChanged = false
    }
    
    // Show error message
    showErrorToast(`Failed to update ${day.day} hours: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    // Clear loading state
    day.isUpdatingTime = null
  }
}

// Toggle day availability
async function toggleDayAvailability(day: WorkingHour) {
  // Don't allow toggling if already updating
  if (day.isUpdating || day.isUpdatingTime) return

  try {
    // Set loading state
    day.isUpdating = true
    
    // Toggle the state locally first (optimistic UI update)
    const newIsActive = !day.isActive
    day.isActive = newIsActive
    
    // Prepare the payload for the API
    const payload = {
      day: day.day,
      openingTime: day.openingTime,
      closingTime: day.closingTime,
      isActive: newIsActive
    }
    
    console.log('Toggling availability with payload:', payload)
    
    // Call the backend API
    await updateWorkingHours(payload)
    
    // Refresh vendor data
    await fetchVendor()
    
    // Re-initialize working hours with fresh data
    initializeWorkingHours()
    
    // Show success message
    showToast(`${day.day} is now ${newIsActive ? 'available' : 'unavailable'}`)
  } catch (error) {
    // Revert the optimistic update on error
    day.isActive = !day.isActive
    
    // Show error message
    showErrorToast(`Failed to update ${day.day}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    // Clear loading state
    day.isUpdating = false
  }
}

// Toast functions
function showToast(message: string) {
  successMessage.value = message
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

// function showErrorToast(message: string) {
//   errorMessage.value = message
//   showErrorToast.value = true
//   setTimeout(() => {
//     showErrorToast.value = false
//   }, 4000)
// }

// Watch for changes in the vendor object
watch(() => vendorObj.value, (newVendor) => {
  if (newVendor) {
    console.log('Vendor object updated:', newVendor)
    initializeWorkingHours()
  }
}, { immediate: true, deep: true })

// Initialize on component mount
onMounted(async () => {
  try {
    console.log('Component mounted, fetching vendor data')
    await fetchVendor()
  } catch (error) {
    showErrorToast(`Failed to fetch vendor data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<style>
/* Add animations and transitions */
.animate-pulse-once {
  animation: pulse 1s ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    background-color: rgba(249, 115, 22, 0.1);
  }
}

/* Slide up animation for save buttons */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Button hover effect */
button:not(:disabled):hover {
  filter: brightness(1.05);
}

/* Input focus animation */
input:focus {
  animation: pulse-border 1.5s infinite;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>