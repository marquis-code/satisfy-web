<template>
    <div class="p-8">
      <!-- Tabs -->
      <div class="flex items-center space-x-6 border-b pb-4">
        <span class="text-gray-500 cursor-pointer hover:text-black">Insight</span>
        <span class="text-black border-b-2 border-black cursor-pointer">Transactions</span>
      </div>
  
      <!-- Sorting and Pagination Controls -->
      <div class="flex justify-end items-end mt-6 mb-4 border-4">
        <div class="relative justify-between flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            class="border px-4 py-2 outline-none rounded-lg w-60 text-gray-600"
          />
          <span class="text-gray-600">Sort by:</span>
          <select class="border px-4 py-2 rounded-lg text-gray-600">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
  
      <!-- Table -->
      <div class="overflow-x-auto bg-white rounded-lg shadow-md">
        <table class="min-w-full text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-4 px-6">Date</th>
              <th class="py-4 px-6">Description</th>
              <th class="py-4 px-6">Amount</th>
              <th class="py-4 px-6">User</th>
              <th class="py-4 px-6">User class</th>
              <th class="py-4 px-6">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="border-t hover:bg-gray-50">
              <td class="py-4 px-6">{{ transaction.date }}</td>
              <td class="py-4 px-6">
                <span v-if="transaction.highlight" class="font-semibold">{{ transaction.highlight }}</span>
                {{ transaction.description }}
              </td>
              <td class="py-4 px-6">{{ formatCurrency(transaction.amount) }}</td>
              <td class="py-4 px-6 flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                <span>{{ transaction.user }}</span>
              </td>
              <td class="py-4 px-6">{{ transaction.userClass }}</td>
              <td class="py-4 px-6">{{ transaction.source }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-6">
        <span class="text-gray-600">Viewing 1 - 8 of 4,000</span>
        <div class="flex space-x-2 items-center">
          <button class="text-gray-600 hover:bg-gray-200 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="flex space-x-2">
            <button class="bg-green-500 text-white px-3 py-1 rounded-lg">1</button>
            <button class="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-lg">2</button>
            <button class="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-lg">3</button>
            <span class="text-gray-600">...</span>
            <button class="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-lg">12</button>
          </div>
          <button class="text-gray-600 hover:bg-gray-200 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  definePageMeta({
    layout: 'dashboard'
})
  
  const transactions = ref([
    { id: 1, date: '20th May 2022', description: 'Payment for Mile 2 Oke to Akin Adesola St', amount: 4000, user: 'Jerry Mbachu', userClass: 'Private user', source: 'User wallet' },
    { id: 2, date: '15th May 2022', description: 'Payment for New Bridge to Law School', amount: 2000, user: 'Awele Johnson', userClass: 'Public User', source: 'User wallet' },
    { id: 3, date: '20th May 2022', description: 'Mensah Monthly transport allowance', highlight: 'Mensah', amount: 25000, user: 'Lanre Adesile', userClass: 'Business partner', source: 'Company wallet' },
    { id: 4, date: '15th May 2022', description: 'Payment for Everyone Tower to Excellence Hotel', amount: 2000, user: 'Johnson Olaniyi', userClass: 'Public User', source: 'User wallet' },
    { id: 5, date: '20th May 2022', description: 'Payment for Mile 2 Oke to Akin Adesola St', amount: 4000, user: 'Mayowa Ehi', userClass: 'Private user', source: 'User & company wallet' },
    { id: 6, date: '15th May 2022', description: '8:33AM', amount: 2000, user: 'Awele Ehi', userClass: 'Public User', source: 'User wallet' },
    { id: 7, date: '20th May 2022', description: 'Payment for Mile 2 Oke to Akin Adesola St', amount: 4000, user: 'Segun Adewuyi', userClass: 'Private user', source: 'User & company wallet' },
    { id: 8, date: '15th May 2022', description: '8:20 AM', amount: 2000, user: 'Otone Ede', userClass: 'Public User', source: 'User wallet' },
  ]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here, but Tailwind CSS should cover most of it */
  </style>
  