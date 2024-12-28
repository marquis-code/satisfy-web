<template>
  <div class="">
    <!-- Sorting and Pagination Controls -->
    <div class="flex justify-end mt-6 mb-4  text-sm">
      <div class="relative flex items-center space-x-2">
        <div class="flex items-center rounded border-none relative">
          <input type="text"
            class=" text-sm rounded focus:outline-none focus:border-none px-5 flex-1 bg-transparent border-none ">
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
        <select id="orderBy" v-model="sortOrder" @change="updateQuery"
          class="text-sm rounded-lg text-gray-600 outline-none border-none">
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md text-sm">
      <table class="min-w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-4 pl-6 w-44 ">Date</th>
            <th class="py-4 pl-6">Description</th>
            <th class="py-4 pl-6">Amount</th>
            <th class="py-4 pl-6">User</th>
            <!-- <th class="py-4 pl-6">User class</th>
            <th class="py-4 pl-6">Source</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in walletTransactions" :key="transaction.id" class="border-t hover:bg-gray-50">
            <td class="py-4 pl-6 w-44 ">{{ formatDateTime(transaction.createdAt) }}</td>
            <td class="py-4 pl-6">{{ transaction.description }}</td>
            <td class="py-4 px-6 font-medium text-right"
              :class="transaction.direction === 'credit' ? 'text-green-600' : 'text-red-600'">{{
                formatCurrency(transaction.amount) }}</td>
            <td class="py-4 pl-6 flex items-center gap-2" >
              <DashboardImageZoom v-if="transaction.user.profilePicture" class="h-10 w-10"
                :src="transaction.user.profilePicture" />
              <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                {{ generateInitials(transaction.user.fname, transaction.user.lname) }}
              </div>
              <span>{{ transaction.user.fname }} {{ transaction.user.lname }}</span>
            </td>
            <!-- <td class="py-4 pl-6">{{ transaction.userClass }}</td>
            <td class="py-4 pl-6">{{ transaction.source }}</td> -->
          </tr>
        </tbody>
      </table>
      <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
        :pages="pagination.pages" @page-changed="handlePageChange" />
    </div>

    <!-- Pagination -->
    <!-- <div class="flex justify-between items-center mt-6">
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
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { useFetchUserWalletTransactions } from '@/composables/wallet/fetchUserWalletTransactions';
import { ref } from 'vue';
definePageMeta({
  layout: 'dashboard'
})
const { loading, walletTransactions, fetchUserWalletTransactions, pagination, queryObj } = useFetchUserWalletTransactions();
fetchUserWalletTransactions();

const handlePageChange = (val: any) => {
  pagination.value.page = val
}
const sortKey = ref('createdAt');
const sortOrder = ref('desc');
const updateQuery = () => {
  queryObj.value = {
    sortBy: sortKey.value,
    orderBy: sortOrder.value,
  };
  fetchUserWalletTransactions();
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};
const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};
</script>

<style scoped>
/* Add any additional styling here, but Tailwind CSS should cover most of it */
</style>