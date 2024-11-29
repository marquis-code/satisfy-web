<template>
    <div class="">
        <CoreTabsComponent :tabs="tabs" @update:activeTab="handleTabChange">
            <template #default="{ activeTab }">
      
                <section v-if="activeTab === 'insight'" class="py-8 border-gray-100 rounded-lg bg-white border-[0.5px] px-3 space-y-10" >
                    <div class="">
                        <!-- Overview Section -->
                        <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg font-medium">Overview</h2>
                        <div class="relative">
                            <select class="border border-gray-300 bg-white px-7 outline-none py-2 rounded-lg shadow-sm text-sm text-gray-600">
                            <option>Current month</option>
                            <option>Previous month</option>
                            </select>
                        </div>
                        </div>
                    
                        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <!-- Total payment Card -->
                        <div class="bg-red-50 p-6 rounded-lg ">
                            <div class="flex items-center justify-between">
                            <h3 class="text-gray-700 font-bold">Total payment</h3>
                            </div>
                            <svg width="204" height="56" viewBox="0 0 204 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M203 44.5469C203 44.5469 191.876 30.2469 173.5 30.2469C158 30.2469 151.983 47.2969 138.5 47.2969C120 47.2969 120 18.6969 100.5 18.6969C83.5 18.6969 76.9411 54.9969 51.5 54.9969C25 54.9969 31.0532 14.2969 1 14.2969" stroke="#E13D45" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                
                            <div class="mt-4 flex items-center justify-between">
                            <h2 class="text-3xl font-semibold text-black flex items-center gap-x-3">
                                <div class="bg-red-100 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                                ₦405.01k</h2>
                            <span class="text-red-500">-7.3%</span>
                            </div>
                            <div class="mt-2 text-gray-500 text-sm">Compared from Last Month</div>
                        </div>
                    
                        <!-- Wallet balance Card -->
                        <div class="bg-green-50 p-6 rounded-lg ">
                            <div class="flex items-center justify-between">
                            <h3 class="text-gray-700 font-bold">Wallet balance</h3>
                            </div>
                            <svg width="204" height="62" viewBox="0 0 204 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 31.65C1 31.65 12.1236 45.95 30.5 45.95C46 45.95 52.017 39.9 65.5 39.9C84 39.9 84 60.8 103.5 60.8C120.5 60.8 127.059 42.1 152.5 42.1C179 42.1 172.947 8 203 8" stroke="#20E682" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                
                            <div class="mt-4 flex items-center justify-between">
                            <!-- <h2 class="text-3xl font-semibold text-black">₦110.01k</h2> -->
                            <h2 class="text-3xl font-semibold text-black flex items-center gap-x-3">
                                <div class="bg-green-100 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-green-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </div>
                                ₦405.01k</h2>
                            <span class="text-green-500">+7.3%</span>
                            </div>
                            <div class="mt-2 text-gray-500 text-sm">Compared from Last Month</div>
                        </div>
                    
                        <!-- Credit line Card -->
                        <div class="bg-red-50 p-6 rounded-lg ">
                            <div class="flex items-center justify-between">
                            <h3 class="text-gray-700 font-bold">Credit line</h3>
                            <!-- <div class="bg-red-100 p-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div> -->
                            </div>
                            <svg width="204" height="56" viewBox="0 0 204 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M203 44.5469C203 44.5469 191.876 30.2469 173.5 30.2469C158 30.2469 151.983 47.2969 138.5 47.2969C120 47.2969 120 18.6969 100.5 18.6969C83.5 18.6969 76.9411 54.9969 51.5 54.9969C25 54.9969 31.0532 14.2969 1 14.2969" stroke="#E13D45" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                
                            <div class="mt-4 flex items-center justify-between">
                            <!-- <h2 class="text-3xl font-semibold text-black">₦205.33k</h2> -->
                            <h2 class="text-3xl font-semibold text-black flex items-center gap-x-3">
                                <div class="bg-red-100 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                                ₦205.33k</h2>
                            <span class="text-red-500">-7.3%</span>
                            </div>
                            <div class="mt-2 text-gray-500 text-sm">Compared from Last Month</div>
                        </div>
                    
                        <!-- Payouts Card -->
                        <div class="bg-green-50 p-6 rounded-lg ">
                            <div class="flex items-center justify-between">
                            <h3 class="text-gray-700 font-bold">Payouts</h3>
                            <div class="bg-green-100 p-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-green-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </div>
                            </div>
                            <svg width="204" height="62" viewBox="0 0 204 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 31.65C1 31.65 12.1236 45.95 30.5 45.95C46 45.95 52.017 39.9 65.5 39.9C84 39.9 84 60.8 103.5 60.8C120.5 60.8 127.059 42.1 152.5 42.1C179 42.1 172.947 8 203 8" stroke="#20E682" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            <div class="mt-4 flex items-center justify-between">
                            <!-- <h2 class="text-3xl font-semibold text-black">₦120.43k</h2> -->
                            <h2 class="text-3xl font-semibold text-black flex items-center gap-x-3">
                                <div class="bg-green-100 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-green-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </div>
                                ₦120.43k</h2>
                            <span class="text-green-500">+7.3%</span>
                            </div>
                            <div class="mt-2 text-gray-500 text-sm">Compared from Last Month</div>
                        </div>
                        </div>
                    </div>
                
                    <!-- Transactions Chart -->
                    <div class="">
                        <p class="font-medium">Transactions</p>
                        <apexchart 
                        type="line" 
                        height="350" 
                        :options="chartOptions" 
                        :series="series" 
                        />
                    </div>
                </section>
                <TransactionsList v-if="activeTab === 'transactions'" />
            </template>
          </CoreTabsComponent>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref } from "vue";
import ApexCharts from "vue3-apexcharts";
definePageMeta({
  layout: "dashboard",
});

// Chart Data
const series = ref([
  {
    name: "Funding",
    data: [6, 8, 9, 10, 8.3, 11, 12],
  },
  {
    name: "Expenses",
    data: [4, 6, 5, 7, 5, 8, 9],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    categories: [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 AM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
    ],
  },
  yaxis: {
    title: {
      text: "Transactions",
    },
  },
  markers: {
    size: 4,
  },
  colors: ["#000000", "#00E396"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
  },
});

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
</script>
  
  <style scoped>
/* Additional styling can be added here if needed */
</style>
  