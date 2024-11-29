<template>
  <div class="">
    <!-- Sorting and Pagination Controls -->
    <div class="flex justify-end mt-6 mb-4  text-sm">
      <div class="relative flex items-center space-x-2">
        <div class="flex items-center rounded border-none relative">
          <input type="text" class=" text-sm rounded focus:outline-none focus:border-none px-5 flex-1 bg-transparent border-none ">
          <svg class="absolute right-3" width="21px" height="21px" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </div>
        <span class="text-gray-300">Sort by :</span>
        <select class="text-sm rounded-lg text-gray-600 outline-none border-none">
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md text-sm">
      <table class="min-w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-4 px-6 w-36">Date</th>
            <th class="py-4 px-6">Description</th>
            <th class="py-4 px-6">Amount</th>
            <th class="py-4 px-6 w-52">User</th>
            <th class="py-4 px-6">User class</th>
            <th class="py-4 px-6">Source</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id" class="border-t hover:bg-gray-50">
            <td class="py-4 px-6 w-36">{{ transaction.date }}</td>
            <td class="py-4 px-6">
              <span v-if="transaction.highlight" class="font-semibold">{{ transaction.highlight }}</span>
              {{ transaction.description }}
            </td>
            <td class="py-4 px-6">{{ formatCurrency(transaction.amount) }}</td>
            <td class="py-4 px-6 flex items-center space-x-2 w-52">
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