<template>
    <div class="min-h-screen ">
      <!-- Header with animated gradient -->
      <div class="relative overflow-hidden rounded-md bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-6 mb-8 shadow-lg">
        <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div class="relative z-10">
          <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">
            <span class="inline-block animate-slideInFromLeft">Transactions</span>
          </h1>
          <p class="text-white/80 max-w-xl animate-fadeIn">
            Track and manage all your financial activities in one place
          </p>
        </div>
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
      
      <!-- Wallet Card with 3D hover effect -->
      <div 
        class="bg-white rounded-md shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
        :class="{'animate-pulse': isWithdrawing}"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-orange-100/40 to-pink-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500 mb-1 animate-fadeIn">Your Balance</span>
              <h2 class="text-3xl font-bold text-gray-800 flex items-center group-hover:scale-105 transition-transform duration-300 origin-left">
                <span class="text-orange-500 mr-2">NGN</span>
                <span class="tabular-nums">{{ walletBalance?.toFixed(2) || '0.00' }}</span>
                <span 
                  v-if="balanceChange" 
                  :class="[
                    'ml-2 text-sm transition-all duration-500 animate-fadeInSlideUp',
                    balanceChange > 0 ? 'text-green-500' : 'text-red-500'
                  ]"
                >
                  {{ balanceChange > 0 ? '+' : '' }}{{ balanceChange.toFixed(2) }}
                </span>
              </h2>
            </div>
            <button 
              @click="showWithdrawModal = true"
              class="mt-4 sm:mt-0 relative overflow-hidden group/btn bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center">
                <span class="mr-2">Withdraw</span>
                <ArrowUpRight class="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </span>
            </button>
          </div>
        </div>
        
        <!-- Animated card decoration -->
        <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-xl transform transition-all duration-700 group-hover:scale-150 group-hover:bg-orange-500/20"></div>
        <div class="absolute -top-8 -left-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl transform transition-all duration-700 group-hover:scale-150 group-hover:bg-pink-500/20"></div>
      </div>
      
      <!-- Transactions Panel -->
      <div class="bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <!-- Controls Bar -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div class="flex flex-col md:flex-row justify-between gap-4">
            <!-- Entries Selector with Custom Styling -->
            <div class="flex items-center">
              <span class="mr-2 text-gray-600">Show</span>
              <div class="relative">
                <select 
                  v-model="pageSize" 
                  class="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 cursor-pointer"
                >
                  <option v-for="size in [10, 25, 50, 100]" :key="size" :value="size">{{ size }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none h-4 w-4" />
              </div>
              <span class="ml-2 text-gray-600">entries</span>
            </div>
            
            <!-- Search with Animation -->
            <div class="relative flex items-center flex-1 md:max-w-xs">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search transactions..."
                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300"
              />
              <button 
                v-if="searchQuery" 
                @click="searchQuery = ''" 
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Table with Animations -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th v-for="column in columns" :key="column" 
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  @click="sortBy(column)"
                >
                  <div class="flex items-center">
                    {{ column }}
                    <ChevronUp v-if="sortColumn === column && sortDirection === 'asc'" class="ml-1 h-4 w-4" />
                    <ChevronDown v-if="sortColumn === column && sortDirection === 'desc'" class="ml-1 h-4 w-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="isLoading" v-for="i in 3" :key="`skeleton-${i}`" class="animate-pulse">
                <td v-for="(column, index) in columns" :key="`skeleton-col-${index}`" class="px-6 py-4 whitespace-nowrap">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
              </tr>
              <tr v-else-if="filteredTransactions.length === 0">
                <td :colspan="columns.length" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-500 animate-fadeIn">
                    <InboxIcon class="h-12 w-12 mb-4 text-gray-300" />
                    <p class="text-lg font-medium">No data available</p>
                    <p class="text-sm mt-1">No transactions found in your account</p>
                  </div>
                </td>
              </tr>
              <TransitionGroup 
                name="list" 
                tag="template"
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-x-4"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 translate-y-4"
              >
                <tr 
                  v-for="(transaction, index) in paginatedTransactions" 
                  :key="transaction.id"
                  class="hover:bg-orange-50/50 transition-colors duration-200"
                  :style="{ animationDelay: `${index * 50}ms` }"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ transaction.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ transaction.details }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'">
                    {{ transaction.amount }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ transaction.before }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ transaction.after }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div class="flex flex-col">
                      <span>{{ formatDate(transaction.dateTime) }}</span>
                      <span class="text-xs text-gray-500">{{ formatTime(transaction.dateTime) }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="{
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium': true,
                        'bg-green-100 text-green-800': transaction.status === 'Completed',
                        'bg-yellow-100 text-yellow-800': transaction.status === 'Pending',
                        'bg-red-100 text-red-800': transaction.status === 'Failed'
                      }"
                    >
                      <span 
                        :class="{
                          'w-2 h-2 mr-1.5 rounded-full': true,
                          'bg-green-400': transaction.status === 'Completed',
                          'bg-yellow-400': transaction.status === 'Pending',
                          'bg-red-400': transaction.status === 'Failed'
                        }"
                      ></span>
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button 
                      v-if="transaction.action" 
                      @click="handleAction(transaction)"
                      class="inline-flex items-center text-orange-500 hover:text-orange-700 transition-colors duration-200 group"
                    >
                      <span>{{ transaction.action }}</span>
                      <ArrowRight class="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination with Animations -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-sm text-gray-700">
              <span v-if="filteredTransactions.length > 0">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredTransactions.length }}</span> entries
              </span>
              <span v-else>Showing 0 to 0 of 0 entries</span>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                      bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft class="h-4 w-4 mr-1" />
                Previous
              </button>
              <div class="flex">
                <button 
                  v-for="page in visiblePageNumbers" 
                  :key="page" 
                  @click="currentPage = page"
                  :class="[
                    'inline-flex items-center justify-center w-10 h-10 border text-sm font-medium transition-all duration-200',
                    currentPage === page 
                      ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button 
                @click="currentPage++" 
                :disabled="currentPage >= totalPages"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                      bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <ChevronRight class="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Withdraw Modal with Advanced Animation -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showWithdrawModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay -->
            <div 
              class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" 
              aria-hidden="true" 
              @click="showWithdrawModal = false"
            ></div>
            
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <!-- Modal panel -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform scale-95 opacity-0 translate-y-8"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 translate-y-8"
            >
              <div class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4 flex items-center">
                  <div class="bg-white/20 p-2 rounded-lg mr-3">
                    <CreditCard class="h-6 w-6 text-white" />
                  </div>
                  <h3 class="text-xl font-bold text-white" id="modal-title">
                    Withdraw Funds
                  </h3>
                </div>
                
                <div class="bg-white px-6 pt-5 pb-6">
                  <div class="space-y-4">
                    <p class="text-gray-600">
                      Enter the amount you would like to withdraw from your wallet.
                    </p>
                    
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-gray-500">Available Balance</span>
                        <span class="font-medium">NGN {{ walletBalance?.toFixed(2) || '0.00' }}</span>
                      </div>
                      <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="text-gray-500 sm:text-lg">NGN</span>
                        </div>
                        <input 
                          type="number" 
                          id="amount" 
                          v-model="withdrawAmount" 
                          class="block w-full pl-14 pr-12 py-3 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-lg font-medium"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          :max="walletBalance || 0"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button 
                            @click="withdrawAmount = walletBalance"
                            type="button" 
                            class="text-orange-500 hover:text-orange-700 text-sm font-medium"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                      
                      <!-- Amount Slider -->
                      <div class="mt-4">
                        <input 
                          type="range" 
                          v-model.number="withdrawAmount" 
                          :max="walletBalance || 0" 
                          min="0" 
                          step="0.01"
                          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>{{ (walletBalance || 0) / 2 }}</span>
                          <span>{{ walletBalance || 0 }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-100 flex items-start">
                      <AlertCircle class="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 class="font-medium text-orange-800">Important</h4>
                        <p class="text-sm text-orange-700 mt-1">
                          Withdrawals are processed within 24 hours. This action cannot be undone once confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
                  <button 
                    type="button" 
                    @click="confirmWithdraw"
                    :disabled="!withdrawAmount || withdrawAmount <= 0 || withdrawAmount > (walletBalance || 0)"
                    class="w-full sm:w-auto flex-1 sm:flex-none inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-base font-medium text-white hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span v-if="isWithdrawing" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                    <span v-else>Confirm Withdrawal</span>
                  </button>
                  <button 
                    type="button" 
                    @click="showWithdrawModal = false"
                    class="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
      
      <!-- Toast Notifications -->
      <div class="fixed top-0 right-0 p-6 w-full max-w-sm z-50 flex flex-col items-end space-y-4 pointer-events-none">
        <TransitionGroup
          enter-active-class="transform transition duration-300 ease-out"
          enter-from-class="translate-y-8 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transform transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-2 opacity-0"
        >
          <div 
            v-for="toast in toasts" 
            :key="toast.id"
            :class="[
              'w-full shadow-lg bg-white rounded-lg pointer-events-auto ring-1 overflow-hidden',
              toast.type === 'success' ? 'ring-green-500' : 'ring-red-500'
            ]"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <CheckCircle v-if="toast.type === 'success'" class="h-6 w-6 text-green-400" />
                  <XCircle v-else class="h-6 w-6 text-red-400" />
                </div>
                <div class="ml-3 w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ toast.title }}</p>
                  <p v-if="toast.message" class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button 
                    @click="removeToast(toast.id)" 
                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <span class="sr-only">Close</span>
                    <X class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <!-- Progress bar -->
            <div 
              class="h-1 bg-gradient-to-r from-green-500 to-green-300" 
              :class="{ 'from-red-500 to-red-300': toast.type === 'error' }"
              :style="{ width: `${toast.progress}%` }"
            ></div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
  import { 
    AlertCircle, 
    CheckCircle, 
    X, 
    XCircle, 
    ChevronDown, 
    ChevronUp, 
    ChevronLeft, 
    ChevronRight, 
    Search, 
    ArrowRight, 
    ArrowUpRight,
    CreditCard,
    Inbox as InboxIcon
  } from 'lucide-vue-next'
  
  // Types
  interface Transaction {
    id: number
    title: string
    details: string
    amount: string
    before: string
    after: string
    dateTime: string
    status: 'Completed' | 'Pending' | 'Failed'
    action?: string
  }
  
  interface Toast {
    id: number
    type: 'success' | 'error'
    title: string
    message?: string
    progress: number
    timer: number
  }
  
  // State
  const walletBalance = ref<number>(1250.75) // Starting with a non-zero balance for demo
  const balanceChange = ref<number>(0)
  const transactions = ref<Transaction[]>([])
  const currentPage = ref(1)
  const pageSize = ref(50)
  const searchQuery = ref('')
  const showWithdrawModal = ref(false)
  const withdrawAmount = ref<number | null>(null)
  const toasts = ref<Toast[]>([])
  const isLoading = ref(true)
  const isWithdrawing = ref(false)
  const sortColumn = ref('')
  const sortDirection = ref<'asc' | 'desc'>('asc')
  
  // Columns
  const columns = [
    'TITLE',
    'DETAILS',
    'AMOUNT',
    'BEFORE',
    'AFTER',
    'DATE & TIME',
    'STATUS',
    'ACTION'
  ]
  
  // Sample data for demo
  const generateSampleTransactions = () => {
    const statuses = ['Completed', 'Pending', 'Failed'] as const
    const types = ['Deposit', 'Withdrawal', 'Transfer', 'Payment']
    const result: Transaction[] = []
    
    for (let i = 1; i <= 15; i++) {
      const isDeposit = Math.random() > 0.5
      const amount = (Math.random() * 1000).toFixed(2)
      const before = (Math.random() * 2000).toFixed(2)
      const after = isDeposit 
        ? (parseFloat(before) + parseFloat(amount)).toFixed(2)
        : (parseFloat(before) - parseFloat(amount)).toFixed(2)
      
      const type = types[Math.floor(Math.random() * types.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      
      // Create a random date within the last 30 days
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))
      
      result.push({
        id: i,
        title: `${type} #${10000 + i}`,
        details: `${type} transaction`,
        amount: isDeposit ? `+${amount}` : `-${amount}`,
        before: `NGN ${before}`,
        after: `NGN ${after}`,
        dateTime: date.toISOString(),
        status,
        action: status === 'Pending' ? 'Cancel' : undefined
      })
    }
    
    return result
  }
  
  // Composable for transactions
  const useTransactions = () => {
    const fetchTransactions = async () => {
      isLoading.value = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // For demo purposes, we'll generate sample data
        transactions.value = generateSampleTransactions()
      } catch (error) {
        console.error('Error fetching transactions:', error)
        addToast({
          type: 'error',
          title: 'Failed to load transactions',
          message: 'Please try again later'
        })
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      fetchTransactions
    }
  }
  
  const { fetchTransactions } = useTransactions()
  
  // Computed properties
  const filteredTransactions = computed(() => {
    if (!searchQuery.value) return sortedTransactions.value
    
    const query = searchQuery.value.toLowerCase()
    return sortedTransactions.value.filter(transaction => 
      transaction.title.toLowerCase().includes(query) ||
      transaction.details.toLowerCase().includes(query) ||
      transaction.amount.toLowerCase().includes(query) ||
      transaction.status.toLowerCase().includes(query)
    )
  })
  
  const sortedTransactions = computed(() => {
    if (!sortColumn.value) return transactions.value
    
    return [...transactions.value].sort((a, b) => {
      let valueA = a[sortColumn.value.toLowerCase() as keyof Transaction]
      let valueB = b[sortColumn.value.toLowerCase() as keyof Transaction]
      
      // Handle numeric values
      if (sortColumn.value === 'AMOUNT') {
        valueA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ''))
        valueB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ''))
      }
      
      if (valueA < valueB) return sortDirection.value === 'asc' ? -1 : 1
      if (valueA > valueB) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  })
  
  const totalPages = computed(() => 
    Math.max(1, Math.ceil(filteredTransactions.value.length / pageSize.value))
  )
  
  const startIndex = computed(() => 
    (currentPage.value - 1) * pageSize.value
  )
  
  const endIndex = computed(() => 
    Math.min(startIndex.value + pageSize.value, filteredTransactions.value.length)
  )
  
  const paginatedTransactions = computed(() => 
    filteredTransactions.value.slice(startIndex.value, endIndex.value)
  )
  
  const visiblePageNumbers = computed(() => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages.value <= maxVisiblePages) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage.value - 1)
      let end = Math.min(totalPages.value - 1, start + maxVisiblePages - 3)
      
      // Adjust start if end is maxed out
      start = Math.max(2, end - (maxVisiblePages - 3))
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }
      
      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis if needed
      if (end < totalPages.value - 1) {
        pages.push('...')
      }
      
      // Always show last page
      pages.push(totalPages.value)
    }
    
    return pages
  })
  
  // Methods
  const sortBy = (column: string) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.value = column
      sortDirection.value = 'asc'
    }
  }
  
  const handleAction = (transaction: Transaction) => {
    // Handle action based on transaction
    addToast({
      type: 'success',
      title: 'Action performed',
      message: `${transaction.action} for ${transaction.title}`
    })
  }
  
  const confirmWithdraw = async () => {
    if (!withdrawAmount.value || withdrawAmount.value <= 0) {
      addToast({
        type: 'error',
        title: 'Invalid amount',
        message: 'Please enter a valid amount'
      })
      return
    }
    
    if (withdrawAmount.value > walletBalance.value) {
      addToast({
        type: 'error',
        title: 'Insufficient balance',
        message: 'You do not have enough funds'
      })
      return
    }
    
    // Process withdrawal with animation
    isWithdrawing.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store the amount for animation
      balanceChange.value = -withdrawAmount.value
      
      // Process withdrawal
      walletBalance.value -= withdrawAmount.value
      
      // Add a new transaction
      const newTransaction = {
        id: transactions.value.length + 1,
        title: `Withdrawal #${10000 + transactions.value.length + 1}`,
        details: 'Withdrawal transaction',
        amount: `-${withdrawAmount.value.toFixed(2)}`,
        before: `NGN ${(walletBalance.value + withdrawAmount.value).toFixed(2)}`,
        after: `NGN ${walletBalance.value.toFixed(2)}`,
        dateTime: new Date().toISOString(),
        status: 'Completed' as const
      }
      
      transactions.value = [newTransaction, ...transactions.value]
      
      // Close modal and show success message
      showWithdrawModal.value = false
      withdrawAmount.value = null
      
      addToast({
        type: 'success',
        title: 'Withdrawal successful!',
        message: `NGN ${withdrawAmount.value.toFixed(2)} has been withdrawn from your account`
      })
      
      // Reset balance change after animation
      setTimeout(() => {
        balanceChange.value = 0
      }, 3000)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Withdrawal failed',
        message: 'Please try again later'
      })
    } finally {
      isWithdrawing.value = false
    }
  }
  
  // Toast management
  const addToast = ({ type, title, message }: { type: 'success' | 'error', title: string, message?: string }) => {
    const id = Date.now()
    const toast: Toast = {
      id,
      type,
      title,
      message,
      progress: 100,
      timer: 0
    }
    
    toasts.value.push(toast)
    
    // Start progress timer
    const duration = 5000 // 5 seconds
    const interval = 100 // Update every 100ms
    const step = 100 / (duration / interval)
    
    toast.timer = window.setInterval(() => {
      const toastIndex = toasts.value.findIndex(t => t.id === id)
      if (toastIndex !== -1) {
        toasts.value[toastIndex].progress -= step
        
        if (toasts.value[toastIndex].progress <= 0) {
          removeToast(id)
        }
      }
    }, interval)
    
    // Auto remove after duration
    setTimeout(() => removeToast(id), duration)
  }
  
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index !== -1) {
      clearInterval(toasts.value[index].timer)
      toasts.value.splice(index, 1)
    }
  }
  
  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }
  
  // Reset to page 1 when search query changes
  watch(searchQuery, () => {
    currentPage.value = 1
  })
  
  // Fetch transactions on component mount
  onMounted(() => {
    fetchTransactions()
    
    // // Welcome toast
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Welcome to your dashboard',
        message: 'Your transactions are now loaded'
      })
    }, 1000)
  })
  
  // Clean up timers
  onUnmounted(() => {
    toasts.value.forEach(toast => {
      clearInterval(toast.timer)
    })
  })

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes fadeInSlideUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slideInFromLeft {
    animation: slideInFromLeft 0.5s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-fadeInSlideUp {
    animation: fadeInSlideUp 0.5s ease-out forwards;
  }
  
  /* Transition group animations */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #e2e2e2;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #d1d1d1;
  }
  </style>