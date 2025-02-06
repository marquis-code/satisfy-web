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
      <PaymentTableList :walletTransactions="walletTransactions" :loading="loading" :pagination="pagination"/>
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