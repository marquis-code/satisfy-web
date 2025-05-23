<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Total Orders ({{ totalOrders }})</h1>
      
      <!-- Date filters and sort -->
      <div class="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-col">
            <label class="text-gray-600 mb-1">From:</label>
            <div class="relative">
              <input 
                v-model="dateRange.from" 
                type="text" 
                placeholder="mm/dd/yyyy" 
                class="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
                @focus="showFromDatepicker = true"
              />
              <button @click="showFromDatepicker = true" class="absolute right-2 top-2">
                <CalendarIcon class="h-5 w-5 text-gray-500" />
              </button>
              <Datepicker 
                v-if="showFromDatepicker" 
                v-model="dateRange.from" 
                @close="showFromDatepicker = false"
                class="absolute z-10 mt-1"
              />
            </div>
          </div>
          
          <div class="flex flex-col">
            <label class="text-gray-600 mb-1">To:</label>
            <div class="relative">
              <input 
                v-model="dateRange.to" 
                type="text" 
                placeholder="mm/dd/yyyy" 
                class="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
                @focus="showToDatepicker = true"
              />
              <button @click="showToDatepicker = true" class="absolute right-2 top-2">
                <CalendarIcon class="h-5 w-5 text-gray-500" />
              </button>
              <Datepicker 
                v-if="showToDatepicker" 
                v-model="dateRange.to" 
                @close="showToDatepicker = false"
                class="absolute z-10 mt-1"
              />
            </div>
          </div>
        </div>
        
        <div class="flex flex-col">
          <label class="text-gray-600 mb-1">Click to sort:</label>
          <button 
            @click="sortOrders" 
            class="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Sort
          </button>
        </div>
      </div>
      
      <!-- Table controls -->
      <div class="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div class="flex items-center gap-2">
          <span class="text-gray-600">Show</span>
          <select 
            v-model="perPage" 
            class="border border-gray-300 rounded px-3 py-2 w-16"
            @change="loadOrders"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span class="text-gray-600">entries</span>
        </div>
        
        <div class="flex items-center">
          <label class="text-gray-600 mr-2">Search:</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            @input="debounceSearch"
          />
        </div>
      </div>
      
      <!-- Orders table -->
      <div class="overflow-x-auto bg-white rounded-md shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₦{{ formatPrice(order.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.dateAdded) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button 
                    @click="viewOrder(order)" 
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded transition-colors duration-200"
                  >
                    View
                  </button>
                  <button 
                    @click="openStatusModal(order)" 
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition-colors duration-200"
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-600">
          Showing {{ paginationInfo.from }} to {{ paginationInfo.to }} of {{ totalOrders }} entries
        </div>
        <div class="flex space-x-1">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            v-for="page in displayedPages" 
            :key="page" 
            @click="changePage(page)"
            :class="[
              'px-3 py-1 rounded border',
              currentPage === page 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      
      <!-- Status Update Modal -->
      <Teleport to="body">
        <div v-if="showStatusModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-md shadow-lg p-6 w-full max-w-md transform transition-all duration-300 ease-in-out" 
               :class="{ 'scale-100 opacity-100': showStatusModal, 'scale-95 opacity-0': !showStatusModal }">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Update Order Status</h3>
              <button @click="showStatusModal = false" class="text-gray-400 hover:text-gray-500">
                <XIcon class="h-5 w-5" />
              </button>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Order ID: {{ selectedOrder?.id }}</p>
              <p class="text-sm text-gray-600 mb-4">Customer: {{ selectedOrder?.customer }}</p>
              
              <div class="flex items-center justify-center">
                <div class="relative inline-block w-16 h-8 mr-2">
                  <input 
                    type="checkbox" 
                    id="toggle" 
                    v-model="orderStatus" 
                    class="sr-only"
                  />
                  <label 
                    for="toggle" 
                    class="block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
                  >
                    <span 
                      class="block h-8 w-8 rounded-full bg-white transform transition-transform duration-300 ease-in-out"
                      :class="orderStatus ? 'translate-x-8 bg-green-500' : 'translate-x-0 bg-red-500'"
                    ></span>
                  </label>
                </div>
                <span class="text-sm font-medium" :class="orderStatus ? 'text-green-600' : 'text-red-600'">
                  {{ orderStatus ? 'Accepted' : 'Rejected' }}
                </span>
              </div>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                @click="showStatusModal = false" 
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                @click="updateOrderStatus" 
                class="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { CalendarIcon, XIcon } from 'lucide-vue-next'
  
  interface Order {
    id: string
    customer: string
    total: number
    dateAdded: string
    location: string
    status: 'accepted' | 'rejected' | 'pending'
  }
  
  interface DateRange {
    from: string
    to: string
  }
  
  interface PaginationInfo {
    from: number
    to: number
  }
  
  // Router
  const router = useRouter()
  
  // State
  const orders = ref<Order[]>([])
  const allOrders = ref<Order[]>([])
  const totalOrders = ref(0)
  const currentPage = ref(1)
  const perPage = ref(50)
  const searchQuery = ref('')
  const dateRange = ref<DateRange>({
    from: '',
    to: ''
  })
  const showFromDatepicker = ref(false)
  const showToDatepicker = ref(false)
  const showStatusModal = ref(false)
  const selectedOrder = ref<Order | null>(null)
  const orderStatus = ref(false)
  
  // Computed
  const totalPages = computed(() => Math.ceil(totalOrders.value / perPage.value))
  
  const displayedPages = computed(() => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages.value <= maxVisiblePages) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
      let endPage = startPage + maxVisiblePages - 1
      
      if (endPage > totalPages.value) {
        endPage = totalPages.value
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }
    
    return pages
  })
  
  const paginationInfo = computed<PaginationInfo>(() => {
    const from = (currentPage.value - 1) * perPage.value + 1
    const to = Math.min(from + perPage.value - 1, totalOrders.value)
    return { from, to }
  })
  
  // Methods
  const loadOrders = async () => {
    try {
      // In a real app, this would be an API call with pagination params
      // For demo purposes, we'll use mock data
      const mockOrders: Order[] = [
        { id: 'CT-CTS-MGX0MBGoil', customer: 'Bukaz', total: 4210.00, dateAdded: '2025-04-04', location: 'Oluwo', status: 'pending' },
        { id: 'CT-CTS-7M4CKpmg7u', customer: 'Bonnie', total: 2810.00, dateAdded: '2025-04-04', location: 'Isolu', status: 'accepted' },
        { id: 'CT-CTS-V1FACTGc2X', customer: 'Mariam', total: 2210.00, dateAdded: '2025-04-04', location: 'Harmony', status: 'pending' },
        { id: 'CT-CTS-7M4CKzNLeC', customer: 'Bonnie', total: 2810.00, dateAdded: '2025-04-04', location: 'Isolu', status: 'rejected' },
        { id: 'CT-CTS-04AICYdneh', customer: 'ABASS', total: 3710.00, dateAdded: '2025-04-04', location: 'School, FUNAAB', status: 'pending' },
        { id: 'CT-CTS-DNXGOQ2DNi', customer: 'Ola', total: 3510.00, dateAdded: '2025-04-04', location: 'Oluwo', status: 'accepted' },
        { id: 'CT-CTS-MJ70XnM7gn', customer: 'Lukman', total: 10110.00, dateAdded: '2025-04-04', location: 'Harmony', status: 'pending' },
      ]
      
      // Add more mock data to demonstrate pagination
      for (let i = 0; i < 20; i++) {
        mockOrders.push({
          id: `CT-CTS-${Math.random().toString(36).substring(2, 10)}`,
          customer: ['John', 'Mary', 'David', 'Sarah', 'Michael'][Math.floor(Math.random() * 5)],
          total: Math.floor(Math.random() * 10000) + 1000,
          dateAdded: '2025-04-04',
          location: ['Oluwo', 'Isolu', 'Harmony', 'School, FUNAAB'][Math.floor(Math.random() * 4)],
          status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'accepted' | 'rejected'
        })
      }
      
      allOrders.value = mockOrders
      totalOrders.value = mockOrders.length
      
      // Apply filters and pagination
      applyFilters()
    } catch (error) {
      console.error('Failed to load orders:', error)
    }
  }
  
  const applyFilters = () => {
    let filteredOrders = [...allOrders.value]
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filteredOrders = filteredOrders.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.location.toLowerCase().includes(query)
      )
    }
    
    // Apply date filters
    if (dateRange.value.from) {
      const fromDate = new Date(dateRange.value.from)
      filteredOrders = filteredOrders.filter(order => new Date(order.dateAdded) >= fromDate)
    }
    
    if (dateRange.value.to) {
      const toDate = new Date(dateRange.value.to)
      filteredOrders = filteredOrders.filter(order => new Date(order.dateAdded) <= toDate)
    }
    
    // Update total count
    totalOrders.value = filteredOrders.length
    
    // Apply pagination
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    orders.value = filteredOrders.slice(start, end)
  }
  
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
    applyFilters()
  }
  
  const debounceSearch = (() => {
    let timeout: NodeJS.Timeout | null = null
    return () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        currentPage.value = 1
        applyFilters()
      }, 300)
    }
  })()
  
  const sortOrders = () => {
    allOrders.value.sort((a, b) => a.customer.localeCompare(b.customer))
    applyFilters()
  }
  
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
  
  const viewOrder = (order: Order) => {
    router.push(`/dashboard/order/${order.id}`)
  }
  
  const openStatusModal = (order: Order) => {
    selectedOrder.value = order
    orderStatus.value = order.status === 'accepted'
    showStatusModal.value = true
  }
  
  const updateOrderStatus = async () => {
    if (!selectedOrder.value) return
    
    try {
      // In a real app, this would be an API call
      console.log(`Updating order ${selectedOrder.value.id} status to ${orderStatus.value ? 'accepted' : 'rejected'}`)
      
      // Update the order in our local state
      const orderIndex = allOrders.value.findIndex(o => o.id === selectedOrder.value?.id)
      if (orderIndex !== -1) {
        allOrders.value[orderIndex].status = orderStatus.value ? 'accepted' : 'rejected'
        
        // Also update in the current page if present
        const pageOrderIndex = orders.value.findIndex(o => o.id === selectedOrder.value?.id)
        if (pageOrderIndex !== -1) {
          orders.value[pageOrderIndex].status = orderStatus.value ? 'accepted' : 'rejected'
        }
      }
      
      // Close the modal
      showStatusModal.value = false
      
      // Show success notification (in a real app)
    } catch (error) {
      console.error('Failed to update order status:', error)
      // Show error notification (in a real app)
    }
  }
  
  // Watchers
  watch([perPage, dateRange], () => {
    currentPage.value = 1
    applyFilters()
  }, { deep: true })
  
  // Lifecycle
  onMounted(() => {
    loadOrders()
  })

  definePageMeta({
    layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  /* Animation for modal */
  .scale-95 {
    transform: scale(0.95);
  }
  .scale-100 {
    transform: scale(1);
  }
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 1;
  }
  
  /* Custom toggle switch styling */
  input[type="checkbox"] + label {
    position: relative;
  }
  
  input[type="checkbox"] + label span {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
  }
  
  input[type="checkbox"]:checked + label span {
    transform: translateX(100%);
  }
  </style>