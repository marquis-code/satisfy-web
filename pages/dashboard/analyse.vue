<template>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Tabs -->
        <div class="mb-6 border-b border-gray-200">
          <div class="flex space-x-4">
            <button 
              @click="activeTab = 'overview'" 
              :class="[
                'py-3 px-4 text-sm font-medium transition-all duration-200',
                activeTab === 'overview' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              ]"
            >
              Overview
            </button>
            <button 
              @click="activeTab = 'sales'" 
              :class="[
                'py-3 px-4 text-sm font-medium transition-all duration-200',
                activeTab === 'sales' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              ]"
            >
              Sales
            </button>
          </div>
        </div>
  
        <!-- Overview Tab -->
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Total Orders Card -->
              <div class="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                <div class="flex justify-between">
                  <div>
                    <div class="text-green-500 mb-2">
                        <LayoutGrid class="h-6 w-6" />
                      <!-- <Cube3 class="h-6 w-6" /> -->
                    </div>
                    <h2 class="text-3xl font-bold">{{ stats.totalOrders }}</h2>
                    <p class="text-gray-500 text-sm">Total Orders</p>
                  </div>
                  <div class="text-gray-200">
                    <Coffee class="h-16 w-16" />
                  </div>
                </div>
              </div>
              
              <!-- Today's Orders Card -->
              <div class="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                <div class="flex justify-between">
                  <div>
                    <div class="text-green-500 mb-2">
                      <LayoutGrid class="h-6 w-6" />
                    </div>
                    <h2 class="text-3xl font-bold">{{ stats.todaysOrders }}</h2>
                    <p class="text-gray-500 text-sm">Today's Orders</p>
                  </div>
                  <div class="text-gray-200">
                    <BarChart3 class="h-16 w-16" />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Monthly Analysis -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-medium mb-4">Monthly Analysis</h2>
              <div class="bg-green-50 rounded-lg p-4 h-64">
                <canvas ref="monthlyChartRef"></canvas>
              </div>
            </div>
  
            <!-- Location Analysis -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-medium mb-4">Location Analysis</h2>
              <div class="bg-green-50 rounded-lg p-4 h-64">
                <canvas ref="locationChartRef"></canvas>
              </div>
            </div>
          </div>
        </Transition>
  
        <!-- Sales Tab -->
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="activeTab === 'sales'" class="space-y-6">
            <!-- Sales Overview -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <div class="text-green-500 mb-2">
                    <LayoutGrid class="h-6 w-6" />
                  </div>
                  <p class="text-gray-500 text-sm">Total Sales</p>
                  <h2 class="text-2xl font-bold">₦{{ formatNumber(sales.totalSales) }}</h2>
                  <button 
                    @click="downloadExcel" 
                    class="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
                  >
                    <Download class="h-4 w-4 mr-2" />
                    Download In Excel
                  </button>
                </div>
                <div class="text-gray-200 hidden md:block">
                  <BarChart3 class="h-16 w-16" />
                </div>
              </div>
            </div>
  
            <!-- Sales Table -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center">
                <div class="mb-4 md:mb-0">
                  <label class="text-sm text-gray-500">Show</label>
                  <select 
                    v-model="pagination.perPage" 
                    class="mx-2 border border-gray-300 rounded-md p-1 text-sm"
                    @change="fetchSalesData"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span class="text-sm text-gray-500">entries</span>
                </div>
                <div class="w-full md:w-auto">
                  <label class="text-sm text-gray-500 mr-2">Search:</label>
                  <input 
                    v-model="searchQuery" 
                    @input="debouncedSearch"
                    type="text" 
                    class="border border-gray-300 rounded-md p-2 w-full md:w-64"
                  >
                </div>
              </div>
  
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th 
                        v-for="column in columns" 
                        :key="column.key"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ column.label }}
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="sales.items.length === 0">
                      <td :colspan="columns.length + 1" class="px-6 py-4 text-center text-sm text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                    <tr 
                      v-for="item in sales.items" 
                      :key="item.id"
                      class="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ item.productId }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ item.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ item.count }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{{ formatNumber(item.unitPrice) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{{ formatNumber(item.sales) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          @click="openWithdrawModal(item)"
                          class="text-green-600 hover:text-green-900 transition-colors duration-150"
                        >
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <div class="flex flex-col md:flex-row justify-between items-center mt-4">
                <div class="text-sm text-gray-500 mb-4 md:mb-0">
                  Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="prevPage" 
                    :disabled="pagination.currentPage === 1"
                    :class="[
                      'px-4 py-2 text-sm border rounded-md transition-colors duration-150',
                      pagination.currentPage === 1 
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Previous
                  </button>
                  <button 
                    @click="nextPage" 
                    :disabled="pagination.currentPage >= pagination.lastPage"
                    :class="[
                      'px-4 py-2 text-sm border rounded-md transition-colors duration-150',
                      pagination.currentPage >= pagination.lastPage 
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
  
      <!-- Withdraw Confirmation Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div v-if="showWithdrawModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                aria-hidden="true"
                @click="showWithdrawModal = false"
              ></div>
  
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
              <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertTriangle class="h-6 w-6 text-red-600" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Confirm Withdrawal
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Are you sure you want to withdraw ₦{{ selectedItem ? formatNumber(selectedItem.sales) : '0.00' }} from {{ selectedItem ? selectedItem.name : '' }}? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    @click="confirmWithdraw" 
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  >
                    Withdraw
                  </button>
                  <button 
                    @click="showWithdrawModal = false" 
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
  
      <!-- Toast Notification -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="toast.show" 
          class="fixed bottom-0 right-0 mb-4 mr-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircle v-if="toast.type === 'success'" class="h-6 w-6 text-green-400" />
                <XCircle v-else class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ toast.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="toast.show = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import { 
    // Cube3, 
    LayoutGrid, 
    BarChart3, 
    Coffee, 
    Download, 
    AlertTriangle, 
    CheckCircle, 
    XCircle, 
    X 
  } from 'lucide-vue-next'
  import Chart from 'chart.js/auto'
  
  // Types
  interface SalesItem {
    id: number
    productId: string
    name: string
    count: number
    unitPrice: number
    sales: number
  }
  
  interface Pagination {
    currentPage: number
    perPage: number
    total: number
    lastPage: number
    from: number
    to: number
  }
  
  // State
  const activeTab = ref('overview')
  const monthlyChartRef = ref<HTMLCanvasElement | null>(null)
  const locationChartRef = ref<HTMLCanvasElement | null>(null)
  const monthlyChart = ref<Chart | null>(null)
  const locationChart = ref<Chart | null>(null)
  const searchQuery = ref('')
  const showWithdrawModal = ref(false)
  const selectedItem = ref<SalesItem | null>(null)
  const toast = ref({
    show: false,
    type: 'success',
    title: '',
    message: '',
    timeout: null as NodeJS.Timeout | null
  })
  
  // Stats data
  const stats = ref({
    totalOrders: 0,
    todaysOrders: 0
  })
  
  // Sales data
  const sales = ref({
    totalSales: 0,
    items: [] as SalesItem[]
  })
  
  // Pagination
  const pagination = ref<Pagination>({
    currentPage: 1,
    perPage: 50,
    total: 0,
    lastPage: 1,
    from: 0,
    to: 0
  })
  
  // Table columns
  const columns = [
    { key: 'productId', label: 'PRODUCT ID' },
    { key: 'name', label: 'NAME' },
    { key: 'count', label: 'COUNT' },
    { key: 'unitPrice', label: 'UNIT PRICE(₦)' },
    { key: 'sales', label: 'SALES(₦)' }
  ]
  
  // Composables
  const { fetchStats, fetchSales } = useStats()
  
  // Methods
  const formatNumber = (value: number): string => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  const fetchSalesData = async () => {
    const result = await fetchSales({
      page: pagination.value.currentPage,
      perPage: pagination.value.perPage,
      search: searchQuery.value
    })
    
    sales.value = result.sales
    pagination.value = result.pagination
  }
  
  const debouncedSearch = useDebounceFn(() => {
    pagination.value.currentPage = 1
    fetchSalesData()
  }, 300)
  
  const prevPage = () => {
    if (pagination.value.currentPage > 1) {
      pagination.value.currentPage--
      fetchSalesData()
    }
  }
  
  const nextPage = () => {
    if (pagination.value.currentPage < pagination.value.lastPage) {
      pagination.value.currentPage++
      fetchSalesData()
    }
  }
  
  const downloadExcel = () => {
    showToast('Success', 'Sales data downloaded successfully', 'success')
  }
  
  const openWithdrawModal = (item: SalesItem) => {
    selectedItem.value = item
    showWithdrawModal.value = true
  }
  
  const confirmWithdraw = () => {
    // Simulate API call
    setTimeout(() => {
      showWithdrawModal.value = false
      showToast('Success', `Withdrawal of ₦${formatNumber(selectedItem.value?.sales || 0)} processed successfully`, 'success')
      fetchSalesData()
    }, 500)
  }
  
  const showToast = (title: string, message: string, type: 'success' | 'error') => {
    if (toast.value.timeout) {
      clearTimeout(toast.value.timeout)
    }
    
    toast.value = {
      show: true,
      title,
      message,
      type,
      timeout: setTimeout(() => {
        toast.value.show = false
      }, 3000) as unknown as NodeJS.Timeout
    }
  }
  
  const initCharts = () => {
    // Monthly Analysis Chart
    if (monthlyChartRef.value) {
      const ctx = monthlyChartRef.value.getContext('2d')
      if (ctx) {
        if (monthlyChart.value) {
          monthlyChart.value.destroy()
        }
        
        monthlyChart.value = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'March', 'May', 'July', 'September', 'November'],
            datasets: [{
              label: 'Total Orders',
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(74, 222, 128, 0.2)',
              borderColor: 'rgba(74, 222, 128, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 1.0,
                ticks: {
                  stepSize: 0.5
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        })
      }
    }
  
    // Location Analysis Chart
    if (locationChartRef.value) {
      const ctx = locationChartRef.value.getContext('2d')
      if (ctx) {
        if (locationChart.value) {
          locationChart.value.destroy()
        }
        
        locationChart.value = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['No Data'],
            datasets: [{
              data: [1],
              backgroundColor: ['rgba(229, 231, 235, 0.5)'],
              borderColor: ['rgba(229, 231, 235, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }
        })
      }
    }
  }
  
  // Lifecycle hooks
  onMounted(async () => {
    const statsData = await fetchStats()
    stats.value = statsData
    
    await fetchSalesData()
    
    // Initialize charts with a slight delay to ensure DOM is ready
    setTimeout(() => {
      initCharts()
    }, 100)
  })
  
  // Watch for tab changes to reinitialize charts
  watch(activeTab, (newTab) => {
    if (newTab === 'overview') {
      // Re-initialize charts when switching to overview tab
      setTimeout(() => {
        initCharts()
      }, 100)
    }
  })
  </script>
  
  <script lang="ts">
  // Composables
  export function useStats() {
    // Mock API calls
    const fetchStats = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        totalOrders: 0,
        todaysOrders: 0
      }
    }
    
    const fetchSales = async (params: { page: number, perPage: number, search: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock empty data
      return {
        sales: {
          totalSales: 0,
          items: []
        },
        pagination: {
          currentPage: params.page,
          perPage: params.perPage,
          total: 0,
          lastPage: 1,
          from: 0,
          to: 0
        }
      }
    }
    
    return {
      fetchStats,
      fetchSales
    }
  }
  
  export function useDebounceFn(fn: Function, delay: number) {
    let timeout: NodeJS.Timeout | null = null
    
    return function(...args: any[]) {
      if (timeout) {
        clearTimeout(timeout)
      }
      
      timeout = setTimeout(() => {
        fn(...args)
        timeout = null
      }, delay)
    }
  }

  definePageMeta({
    layout: 'dashboard'
  })
  </script>