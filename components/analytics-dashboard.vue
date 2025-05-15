<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { gsap } from 'gsap'

Chart.register(...registerables)

interface OrderAnalytics {
  month: number
  count: number
  revenue: number
  averageOrderValue: number
  completedOrders: number
  cancelledOrders: number
  completionRate: number
}

const props = withDefaults(defineProps<{
  data?: OrderAnalytics[]
}>(), {
  data: () => []
})

const isLoaded = ref(false)
const activeTab = ref('revenue')

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const formattedData = computed(() => {
  if (!Array.isArray(props.data)) return []
  
  return props.data.map(item => ({
    ...item,
    monthName: monthNames[item.month - 1],
    formattedRevenue: formatCurrency(item.revenue / 100),
    formattedAOV: formatCurrency(item.averageOrderValue / 100)
  }))
})

const totalRevenue = computed(() => {
  if (!Array.isArray(props.data)) return 0
  
  return props.data.reduce((sum, item) => sum + item.revenue, 0) / 100
})

const totalOrders = computed(() => {
  if (!Array.isArray(props.data)) return 0
  
  return props.data.reduce((sum, item) => sum + item.count, 0)
})

const overallAOV = computed(() => {
  if (totalOrders.value === 0) return 0
  return totalRevenue.value / totalOrders.value
})

const bestMonth = computed(() => {
  if (!Array.isArray(props.data) || props.data.length === 0) return 'None'
  
  const best = [...props.data].sort((a, b) => b.revenue - a.revenue)[0]
  return best.month > 0 ? monthNames[best.month - 1] : 'None'
})

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(value)
}

function initRevenueChart() {
  const ctx = document.getElementById('revenueChart') as HTMLCanvasElement
  if (!ctx || formattedData.value.length === 0) return

  const chartData = {
    labels: formattedData.value.map(item => item.monthName),
    datasets: [{
      label: 'Revenue',
      data: formattedData.value.map(item => item.revenue / 100),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    }]
  }

  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw as number)
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value as number)
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  })
}

function initOrdersChart() {
  const ctx = document.getElementById('ordersChart') as HTMLCanvasElement
  if (!ctx || formattedData.value.length === 0) return

  const chartData = {
    labels: formattedData.value.map(item => item.monthName),
    datasets: [{
      label: 'Order Count',
      data: formattedData.value.map(item => item.count),
      backgroundColor: '#10b981',
      borderRadius: 6,
      maxBarThickness: 40
    }]
  }

  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      },
      animation: {
        delay: (context) => context.dataIndex * 100,
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  })
}

function initAOVChart() {
  const ctx = document.getElementById('aovChart') as HTMLCanvasElement
  if (!ctx || formattedData.value.length === 0) return

  const chartData = {
    labels: formattedData.value.map(item => item.monthName),
    datasets: [{
      label: 'Average Order Value',
      data: formattedData.value.map(item => item.averageOrderValue / 100),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderWidth: 2,
      pointBackgroundColor: '#f59e0b',
      pointRadius: 4,
      tension: 0.2
    }]
  }

  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw as number)
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value as number)
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  })
}

onMounted(() => {
  // Simulate loading for animation effect
  setTimeout(() => {
    isLoaded.value = true
    
    // Initialize charts after DOM is updated
    setTimeout(() => {
      if (Array.isArray(props.data) && props.data.length > 0) {
        initRevenueChart()
        initOrdersChart()
        initAOVChart()
        
        // Animate stats cards
        const cards = document.querySelectorAll('.stat-card')
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        })
      }
    }, 100)
  }, 500)
})
</script>

<template>
  <div class="bg-gray-50 ">
    <div 
      class="max-w-7xl mx-auto transition-all duration-1000" 
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    >
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Vendor Order Analytics</h1>
        <p class="text-gray-600 mt-2">Monthly breakdown of order performance</p>
      </header>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ formatCurrency(totalRevenue) }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div> -->

        <!-- <div class="stat-card bg-red-500 rounded-xl  p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ totalOrders }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div> -->

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Average Order Value</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ formatCurrency(overallAOV) }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Best Performing Month</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ bestMonth }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ formatCurrency(totalRevenue) }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- <div class="stat-card bg-red-500 rounded-xl  p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ totalOrders }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div> -->

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Average Order Value</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ formatCurrency(overallAOV) }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Best Performing Month</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ bestMonth }}</p>
            </div>
            <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Tabs -->
      <div class="bg-white -mt-20 rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div class="border-b border-gray-100">
          <div class="flex">
            <button 
              @click="activeTab = 'revenue'" 
              class="px-6 py-3 text-sm font-medium transition-colors duration-200"
              :class="activeTab === 'revenue' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Revenue
            </button>
            <button 
              @click="activeTab = 'orders'" 
              class="px-6 py-3 text-sm font-medium transition-colors duration-200"
              :class="activeTab === 'orders' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Orders
            </button>
            <button 
              @click="activeTab = 'aov'" 
              class="px-6 py-3 text-sm font-medium transition-colors duration-200"
              :class="activeTab === 'aov' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Average Order Value
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div v-show="activeTab === 'revenue'" style="width: 100%;" class="h-80 w-full transition-opacity duration-500" :class="activeTab === 'revenue' ? 'opacity-100' : 'opacity-0'">
            <canvas style="width: 100%;" id="revenueChart"></canvas>
          </div>
          <div v-show="activeTab === 'orders'" style="width: 100%;" class="h-80 w-full transition-opacity duration-500" :class="activeTab === 'orders' ? 'opacity-100' : 'opacity-0'">
            <canvas style="width: 100%;" id="ordersChart"></canvas>
          </div>
          <div v-show="activeTab === 'aov'" style="width: 100%;" class="h-80 w-full transition-opacity duration-500" :class="activeTab === 'aov' ? 'opacity-100' : 'opacity-0'">
            <canvas style="width: 100%;" id="aovChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Monthly Data Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Monthly Breakdown</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Order Value</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in formattedData" :key="index" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.monthName }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ item.count }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ item.formattedRevenue }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ item.formattedAOV }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
