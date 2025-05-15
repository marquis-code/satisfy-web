<template>
    <main class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Vendor Reviews
          </h1>
          <p class="text-gray-600 dark:text-gray-300">
            See what customers are saying about your services
          </p>
        </div>
  
        <!-- Stats Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transform transition-all duration-500 hover:shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{{ reviews?.length }}</span>
              <span class="text-gray-600 dark:text-gray-300">Total Reviews</span>
            </div>
            <div class="flex flex-col items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {{ averageRating }}
              </span>
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-300 mr-2">Average Rating</span>
                <div class="flex">
                  <template v-for="i in 5" :key="i">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      :fill="i <= Math.round(averageRating) ? 'currentColor' : 'none'" 
                      :stroke="i <= Math.round(averageRating) ? 'none' : 'currentColor'" 
                      class="w-4 h-4" 
                      :class="i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </template>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center p-4">
              <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {{ latestReviewDate }}
              </span>
              <span class="text-gray-600 dark:text-gray-300">Latest Review</span>
            </div>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">Loading reviews...</p>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="reviews?.length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
          <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">No Reviews Yet</h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              You haven't received any reviews yet. Reviews will appear here once customers start sharing their experiences.
            </p>
          </div>
        </div>
  
        <!-- Reviews List -->
        <div v-else class="space-y-6">
          <TransitionGroup 
            name="review-list" 
            tag="div" 
            class="space-y-6"
          >
            <div 
              v-for="(review, index) in reviews" 
              :key="review._id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {{ review.customerName.charAt(0) }}
                    </div>
                  </div>
                  <div class="ml-4 flex-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-medium text-gray-800 dark:text-white">{{ review.customerName }}</h3>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(review.createdAt) }}</span>
                    </div>
                    <div class="flex mt-1 mb-3">
                      <template v-for="i in 5" :key="i">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          :fill="i <= review.rating ? 'currentColor' : 'none'" 
                          :stroke="i <= review.rating ? 'none' : 'currentColor'" 
                          class="w-5 h-5" 
                          :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </template>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ review.message }}</p>
                    
                    <!-- Vendor Reply Section -->
                    <div v-if="review.vendorReply" class="mt-4 pl-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Your Reply:</p>
                      <p class="text-gray-600 dark:text-gray-400 mt-1">{{ review.vendorReply }}</p>
                    </div>
                    
                    <!-- Reply Button -->
                    <!-- <div v-else class="mt-4">
                      <button 
                        class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center transition-colors"
                        @click="handleReply(review._id)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Reply to this review
                      </button>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useFetchVendorsReviews } from "@/composables/modules/reviews/useFetchReviews"
  import { useNuxtApp } from '#app'
  
  const { reviews, loading, fetchVendorReviews } = useFetchVendorsReviews()
  const vendorData = ref({}) as any
  
  const nuxtApp = useNuxtApp()
  
  definePageMeta({
    layout: 'dashboard'
  })
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }
  
  // Calculate average rating
  const averageRating = computed(() => {
    if (!reviews.value || reviews?.value?.length === 0) return 0
    const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews?.value?.length).toFixed(1)
  })
  
  // Get the date of the latest review
  const latestReviewDate = computed(() => {
    if (!reviews.value || reviews?.value?.length === 0) return 'N/A'
    
    const dates = reviews.value.map(review => new Date(review.createdAt))
    const latestDate = new Date(Math.max(...dates.map(date => date.getTime())))
    
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(latestDate)
  })
  
  // Handle reply to review
  const handleReply = (reviewId: string) => {
    // This would be implemented to show a reply form or modal
    console.log('Reply to review:', reviewId)
    // You could implement a modal or form here to capture the reply
  }
  
  onMounted(() => {
    // Get user data from localStorage
    if (process.client) {
      const userString = localStorage.getItem("user")
      if (userString) {
        vendorData.value = JSON.parse(userString)
        // Fetch reviews for this vendor
        fetchVendorReviews(vendorData.value._id)
      }
    }
  })
  </script>
  
  <style scoped>
  /* Animation for the review list */
  .review-list-enter-active,
  .review-list-leave-active {
    transition: all 0.5s ease;
  }
  
  .review-list-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .review-list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  
  /* Staggered animation for review items */
  .review-list-enter-active {
    animation: slide-in 0.6s ease-out both;
  }
  
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Hover effects */
  .bg-white {
    transition: all 0.3s ease;
  }
  
  /* Pulse animation for empty state */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .grid-cols-3 {
      grid-template-columns: 1fr;
    }
  }
  </style>