<template>
  <div class="">
    <CoreTabsComponent :tabs="tabs" @update:activeTab="handleTabChange">
      <template #default="{ activeTab }">

        <section v-if="activeTab === 'insight'"
          class="py-8 border-gray-100 rounded-lg bg-white border-[0.5px] px-3 space-y-10">
          <div class="">
            <!-- Overview Section -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-medium">Overview</h2>
              <div class="relative">
                <select v-model="selectedRange" @change="onRangeChange"
                  class="border border-gray-300 bg-white px-7 outline-none py-2 rounded-lg shadow-sm text-sm text-gray-600">
                  <option value="today">All Time</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_60_days">Last 60 Days</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6" v-if="!loading && Object.keys(walletSummary).length">
              <!-- Wallet balance Card -->
              <div class="bg-blue-100 p-6 rounded-lg cursor-pointer" @click="setActiveAmountType('wallet')">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-700 font-bold">Wallet balance</h3>
                </div>                  

                <div class="mt-4 flex items-center justify-between flex-wrap">
                  <h2 class="text-2xl font-semibold text-black flex items-center gap-x-3">
                    ₦{{ formatTotal(walletSummary.wallet.diff) }}
                  </h2>
                  <span v-if="parseFloat(walletSummary.wallet.growth) >= 0" class="text-green-400">{{
                    walletSummary.wallet.growth }}</span>
                  <span v-else class=" text-red-500 text-wrap">
                    {{ walletSummary.wallet.growth }}
                  </span>
                </div>
                <div class="mt-2 text-gray-500 text-sm">Compared from {{formatRange(selectedRange)}}</div>
              </div>

              <!-- Payouts Card -->
              <div class=" bg-black opacity-80 p-6 rounded-lg cursor-pointer" @click="setActiveAmountType('payout')">
                <div class="flex items-center justify-between">
                  <h3 class="text-white font-bold">Payouts</h3>
                </div>                  
                <div class="mt-4 flex items-center justify-between flex-wrap">
                  <h2 class="text-2xl font-semibold text-white flex items-center gap-x-3">
                    <!-- <div class="bg-green-100 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-green-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div> -->
                    ₦{{ formatTotal(walletSummary.payout.diff) }}
                  </h2>
                  <span v-if="parseFloat(walletSummary.payout.growth) >= 0" class="text-green-400">{{
                    walletSummary.payout.growth }}</span>
                  <span v-else class=" text-red-500">
                    {{ walletSummary.payout.growth }}
                  </span>
                </div>
                <div class="mt-2 text-gray-500 text-sm">Compared from {{formatRange(selectedRange)}}</div>
              </div>

              <!-- Commission Card -->
              <div class="bg-green-100 p-6 rounded-lg cursor-pointer" @click="setActiveAmountType('commission')">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-700 font-bold">Commission</h3>
                </div>                  

                <div class="mt-4 flex items-center justify-between flex-wrap">
                  <h2 class="text-2xl font-semibold text-black flex items-center gap-x-3">
                    <!-- <div class="bg-red-100 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div> -->
                    ₦{{ formatTotal(walletSummary.commission.diff) }}
                  </h2>
                  <span v-if="parseFloat(walletSummary.commission.growth) >= 0" class="text-green-400">{{
                    walletSummary.commission.growth }}</span>
                  <span v-else class=" text-red-500">
                    {{ walletSummary.commission.growth }}
                  </span>
                </div>
                <div class="mt-2 text-gray-500 text-sm">Compared from {{formatRange(selectedRange)}}</div>
              </div>

              <!-- Settlement Balance Card -->
              <div class="bg-purple-100 p-6 rounded-lg cursor-pointer" @click="activeView = 'table'">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-700 font-bold">Settlement Balance</h3>
                </div>
                <div class="mt-4 flex items-center justify-between flex-wrap">
                  <h2 class="text-2xl font-semibold text-black flex items-center gap-x-3">
                    <!-- <div class="bg-red-100 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div> -->
                    ₦{{formatTotal(getSettlementBalance("NGN"))}}
                  </h2>
                  <!-- <span class="text-red-500">-7.3%</span> -->
                </div>
                <div class="mt-2 text-gray-500 text-sm">Compared from {{formatRange(selectedRange)}}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8" v-if="loading">
              <div v-for="itm in 4" :key="itm" class="h-[200px] bg-slate-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          <!-- Transactions Chart -->
          <div v-if="activeView === 'chart'" class="">
            <TransactionsChart v-model:amountType="activeAmountType"/>
          </div>
          <TransactionsList v-else />
        </section>
        <TransactionsList v-if="activeTab === 'transactions'" />
      </template>
    </CoreTabsComponent>
  </div>
</template>

<script lang="ts" setup>
import { useFetchWalletSummary } from "@/composables/wallet/fetchWalletSummary";
import { ref } from "vue";
const { loading, walletSummary, fetchWalletSummary, setFilterData, metaObj } = useFetchWalletSummary();
fetchWalletSummary();
definePageMeta({
  layout: "dashboard",
});
const formatTotal = (total: number | string): string => {
  const numericTotal = typeof total === 'string' ? parseFloat(total) : total;
  if (isNaN(numericTotal)) {
    return "0.00";
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericTotal);
};

const formatRange = (input: string): string => {
  return input
    .split('_')  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
    .join(' '); 
};


const selectedRange = ref('today');
const dateFilter = ref<any>([]);
const showAll = ref<boolean>(true);



const onRangeChange = () => {
  const payload = {
    range: selectedRange.value,
    startDate: dateFilter.value[0] || metaObj.value.startDate,
    endDate: dateFilter.value[1] || metaObj.value.endDate,
    showAll: showAll.value,
  };
  setFilterData(payload);
  fetchWalletSummary();
};


const getSettlementBalance = (currency: string): number => {
  console.log(walletSummary.value)
  const settlementBalance = walletSummary.value?.settlement?.wallets?.find(wallet => wallet.currency === currency);
  return settlementBalance ? settlementBalance.balance : 0; 
}



const activeView = ref("chart")

// Functions to manage card colors based on trend
const getCardBgColor = (trend: "up" | "down") => {
  return trend === "up" ? "bg-green-100" : "bg-red-100";
};

const getTextColor = (trend: "up" | "down") => {
  return trend === "up" ? "text-green-500" : "text-red-500";
};

const tabs = [
  { key: "insight", label: "Insight" },
  { key: "transactions", label: "Transactions" },
];

const handleTabChange = (tabKey: string) => {
  console.log("Selected tab:", tabKey);
};
const activeAmountType = ref('wallet')
const setActiveAmountType = (type) => {
  activeView.value = 'chart'
  activeAmountType.value = type; 
};
</script>

<style scoped>
/* Additional styling can be added here if needed */
</style>