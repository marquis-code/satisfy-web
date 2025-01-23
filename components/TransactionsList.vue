<template>
  <div class="">
    <div class=" flex lg:flex-row flex-col gap-3 py-3 justify-between">
      <div class="grid md:grid-cols-4 grid-cols-2 gap-8 text-sm font-medium ">
        <div @click="handleTabs('wallet')"
          class="border-2 border-black px-5 flex items-center justify-center py-2 rounded-md cursor-pointer">Wallet
        </div>
        <div @click="handleTabs('payout')"
          class="border-2 border-black px-5 flex items-center justify-center py-2 rounded-md cursor-pointer">Payout
        </div>
        <div @click="handleTabs('commission')"
          class="border-2 border-black px-5 flex items-center justify-center py-2 rounded-md cursor-pointer">
          Commission</div>
        <div @click="handleTabs('settlement')"
          class="border-2 border-black px-5 flex items-center justify-center text-center py-2 rounded-md cursor-pointer">
          Settlement Balance
        </div>
      </div>
      <div class="">
        <select id="orderBy" v-model="sortOrder" @change="updateQuery"
          class="text-sm rounded-md text-gray-600 outline-none border-2 border-black">
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
    <div v-if="route.query.tab === 'transactions'" class="overflow-x-auto bg-white rounded-lg shadow-md text-sm">
      <table class="min-w-full table-fixed divide-y divide-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">S/N</th>
            <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"> Avatar </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> Description</th>
            <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"> Amount </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> Date Created </th>
            <!-- <th class="py-4 pl-6">User class</th>
            <th class="py-4 pl-6">Sourcee</th> -->
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="(transaction, index) in walletTransactions" :key="index" class="odd:bg-gray-50">
            <td class="whitespace-nowrap  text-sm font-medium text-gray-900 sm:pl-4">
              {{ (pagination.page - 1) * pagination.perPage + (index + 1) }}</td>
            <td class="whitespace-nowrap py-4 pr-3 text-xs font-medium">
              <DashboardImageZoom v-if="transaction.user.profilePicture" class="h-10 w-10"
                :src="transaction.user.profilePicture" />
              <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                {{ generateInitials(transaction.user.fname, transaction.user.lname) }}
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <nuxt-link :to="`/dashboard/users/${transaction.user.id}`"
                class="font-medium text-gray-800 no-underline cursor-pointer">{{ transaction.user.fname }} {{
                  transaction.user.lname }}</nuxt-link>
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ transaction.description }}</td>
            <td class="py-4 px-6 font-medium text-right"
              :class="transaction.direction === 'credit' ? 'text-green-600' : 'text-red-600'">{{
                formatCurrency(transaction.amount) }}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">{{ formatDateTime(transaction.createdAt) }}
            </td>


            <!-- <td class="py-4 pl-6">{{ transaction.userClass }}</td>
            <td class="py-4 pl-6">{{ transaction.source }}</td> -->
          </tr>
        </tbody>
      </table>
      <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
        :pages="pagination.pages" @page-changed="handlePageChange" />
    </div>
    <div v-else>
      <CoreEmptyState title="No Data Available" desc="" />
    </div>


  </div>
</template>

<script lang="ts" setup>
import { useFetchUserWalletTransactions } from '@/composables/wallet/fetchUserWalletTransactions';
import { ref } from 'vue';
definePageMeta({
  layout: 'dashboard'
})
const route = useRoute();
const router = useRouter();
const { loading, walletTransactions, fetchUserWalletTransactions, pagination, queryObj, searchQuery } = useFetchUserWalletTransactions();
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

const handleTabs = (page: string) => {
  router.push({ path: route.path, query: { transactionType: 'page' } })
}

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