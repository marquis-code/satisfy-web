<!-- components/ContactForm.vue -->
<template>
    <div class="min-h-screen bg-[#111111] text-white">
      <div class="container mx-auto px-4 py-12 lg:py-24">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Left Column -->
          <div class="space-y-8">
            <div>
              <h1 class="text-3xl lg:text-4xl font-bold mb-4">Level up your brand</h1>
              <p class="text-gray-300">We' love to hear from you. Our friendly team is always here to chat.</p>
            </div>
  
            <!-- Contact Information -->
            <div class="space-y-6">
              <!-- Email Section -->
              <div class="flex items-start space-x-4">
                <div class="mt-1">
                  <!-- <IconMail class="w-6 h-6 text-blue-500" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
                </div>
                <div>
                  <h3 class="font-medium mb-1">Email us</h3>
                  <a href="mailto:example@buildr.com" class="text-blue-400 hover:text-blue-300">
                    example@buildr.com
                  </a>
                </div>
              </div>
  
              <!-- Office Section -->
              <div class="flex items-start space-x-4">
                <div class="mt-1">
                  <!-- <IconMapPin class="w-6 h-6 text-blue-500" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
                </div>
                <div>
                  <h3 class="font-medium mb-1">Office</h3>
                  <p class="text-blue-400">100 Smith Street</p>
                  <p class="text-blue-400">Collingwood VIC 3066 AU</p>
                </div>
              </div>
  
              <!-- Phone Section -->
              <div class="flex items-start space-x-4">
                <div class="mt-1">
                  <!-- <IconPhone class="w-6 h-6 text-blue-500" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
                </div>
                <div>
                  <h3 class="font-medium mb-1">Phone</h3>
                  <a href="tel:+15550000000" class="text-blue-400 cursor-pointer hover:text-blue-300">
                    +1 (555) 000-0000
                  </a>
                </div>
              </div>
            </div>
  
            <!-- Social Links -->
            <div class="flex space-x-4 pt-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <!-- <IconLinkedin class="w-6 h-6" /> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <!-- <IconTwitter class="w-6 h-6" /> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
              </a>
            </div>
          </div>
  
          <!-- Right Column - Form -->
          <div class="bg-[#1A1A1A] rounded-lg p-6 lg:p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">First name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="w-full px-4 pgray-300 bg-[#262626] rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Last name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="w-full px-4 text-gray-300 py-2 bg-[#262626] rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                    placeholder="Last name"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-2 text-gray-300 bg-[#262626] rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  placeholder="you@company.com"
                />
              </div>
  
              <div>
                <label class="block text-sm font-medium mb-2">Phone number</label>
                <div class="flex">
                  <select
                    v-model="form.countryCode"
                    class="px-3 py-2 text-gray-300 bg-[#262626] rounded-l border-y border-l border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="flex-1 px-4 py-2 text-gray-300 bg-[#262626] rounded-r border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium mb-2">Message</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  class="w-full px-4 text-gray-300 py-2 bg-[#262626] rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter a message..."
                ></textarea>
              </div>
  
              <div class="flex items-center">
                <input
                  v-model="form.privacyPolicy"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <label class="ml-2 text-sm text-gray-300">
                  You agree to our <NuxtLink class="underline z-50" to="/privacy-policy">privacy policy.</NuxtLink>
                </label>
              </div>
  
              <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
//   import { IconMail, IconMapPin, IconPhone, IconLinkedin, IconTwitter } from '@/components/icons'
  
  interface FormData {
    firstName: string
    lastName: string
    email: string
    countryCode: string
    phone: string
    message: string
    privacyPolicy: boolean
  }
  
  const form = ref<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    message: '',
    privacyPolicy: false
  })
  
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', form.value)
  }
  </script>