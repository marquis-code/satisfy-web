<template>
    <div class="min-h-screen  transition-all duration-500">
      <!-- Header with theme toggle -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Order Analytics</span>
        </h1>
        <button @click="toggleDarkMode" class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
          <Sun v-if="isDarkMode" class="h-5 w-5 text-amber-500" />
          <Moon v-else class="h-5 w-5 text-indigo-600" />
        </button>
      </div>
  
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative p-6">
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md">
                <Package2 class="h-6 w-6" />
              </div>
              <div class="text-gray-300 dark:text-gray-600 transform group-hover:scale-110 transition-transform duration-500">
                <Coffee class="h-20 w-20 opacity-20" />
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-baseline">
                <h1 class="text-4xl font-bold text-gray-800 dark:text-white" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 300 } }">
                  {{ totalOrders }}
                </h1>
                <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  +12.5%
                </span>
              </div>
              <p class="text-gray-500 dark:text-gray-400 mt-1">Total Orders</p>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
  
        <div 
          class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative p-6">
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <LayoutGrid class="h-6 w-6" />
              </div>
              <div class="text-gray-300 dark:text-gray-600 transform group-hover:scale-110 transition-transform duration-500">
                <BarChart class="h-20 w-20 opacity-20" />
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-baseline">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400 } }">
                  {{ todaysOrders }}
                </h1>
                <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  Today
                </span>
              </div>
              <p class="text-gray-500 dark:text-gray-400 mt-1">Today's Orders</p>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
  
        <div 
          class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative p-6">
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
                <DollarSign class="h-6 w-6" />
              </div>
              <div class="text-gray-300 dark:text-gray-600 transform group-hover:scale-110 transition-transform duration-500">
                <TrendingUp class="h-20 w-20 opacity-20" />
              </div>
            </div>
            <div class="mt-4">
              <p class="text-gray-500 dark:text-gray-400">Total Sales</p>
              <div class="flex items-baseline">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 500 } }">
                  ₦{{ formatNumber(totalSales) }}
                </h1>
              </div>
              <button 
                @click="showExportConfirmation = true"
                class="mt-4 relative overflow-hidden group/btn px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span class="relative z-10 flex items-center">
                  <FileDown class="h-4 w-4 mr-2" />
                  Download Excel
                </span>
                <span class="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
  
        <div 
          class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative p-6">
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md">
                <Users class="h-6 w-6" />
              </div>
              <div class="text-gray-300 dark:text-gray-600 transform group-hover:scale-110 transition-transform duration-500">
                <UserCheck class="h-20 w-20 opacity-20" />
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-baseline">
                <h1 class="text-4xl font-bold text-gray-800 dark:text-white" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 600 } }">
                  {{ customerCount }}
                </h1>
                <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                  +5.2%
                </span>
              </div>
              <p class="text-gray-500 dark:text-gray-400 mt-1">Active Customers</p>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
  
      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Monthly Analysis Chart -->
        <div 
          class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 500 } }"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <CalendarDays class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Monthly Analysis
              </h2>
              <div class="flex space-x-2">
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                  <RefreshCw class="h-4 w-4" />
                </button>
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                  <Download class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-md p-4 overflow-hidden">
              <canvas ref="monthlyChart" height="300"></canvas>
            </div>
          </div>
        </div>
  
        <!-- Location Analysis Chart -->
        <div 
          class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 600 } }"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <MapPin class="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
                Location Analysis
              </h2>
              <div class="flex space-x-2">
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200">
                  <RefreshCw class="h-4 w-4" />
                </button>
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200">
                  <Download class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-md p-4 overflow-hidden">
              <canvas ref="locationChart" height="300"></canvas>
            </div>
          </div>
        </div>
  
        <!-- Product Category Chart -->
        <div 
          class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 700 } }"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <ShoppingBag class="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                Product Categories
              </h2>
              <div class="flex space-x-2">
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                  <RefreshCw class="h-4 w-4" />
                </button>
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                  <Download class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-md p-4 overflow-hidden">
              <canvas ref="categoryChart" height="300"></canvas>
            </div>
          </div>
        </div>
  
        <!-- Revenue Trend Chart -->
        <div 
          class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 800 } }"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <TrendingUp class="h-5 w-5 mr-2 text-rose-600 dark:text-rose-400" />
                Revenue Trend
              </h2>
              <div class="flex space-x-2">
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200">
                  <RefreshCw class="h-4 w-4" />
                </button>
                <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200">
                  <Download class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-900/10 dark:to-pink-900/10 rounded-md p-4 overflow-hidden">
              <canvas ref="revenueChart" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Sales Table -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 900 } }"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <ShoppingCart class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Sales Overview
            </h2>
            <div class="flex space-x-2">
              <button 
                @click="showExportConfirmation = true"
                class="flex items-center px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors duration-200"
              >
                <FileDown class="h-4 w-4 mr-1" />
                Export
              </button>
              <button class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <RefreshCw class="h-4 w-4" />
              </button>
            </div>
          </div>
  
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Show</label>
              <select 
                v-model="pageSize" 
                class="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                @change="updatePagination"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span class="text-sm text-gray-600 dark:text-gray-400">entries</span>
            </div>
            
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search products..."
                class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                @input="updatePagination"
              />
              <Search class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
  
          <div class="overflow-x-auto rounded-md border border-gray-100 dark:border-gray-700">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Count
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Unit Price(₦)
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales(₦)
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-if="paginatedData.length === 0">
                  <td colspan="6" class="px-6 py-8 text-center">
                    <div class="flex flex-col items-center">
                      <FileQuestion class="h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
                      <p class="text-gray-500 dark:text-gray-400">No data available in table</p>
                    </div>
                  </td>
                </tr>
                <tr 
                  v-for="(item, index) in paginatedData" 
                  :key="item.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 1000 + (index * 50) } }"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {{ item.id }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center mr-3">
                        <ShoppingBag class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.count }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-700 dark:text-gray-300">₦{{ formatNumber(item.unitPrice) }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">₦{{ formatNumber(item.sales) }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      @click="editItem(item)"
                      class="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    >
                      <Edit class="h-3.5 w-3.5 mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="flex flex-col md:flex-row justify-between items-center mt-6">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }} entries
            </div>
            <div class="flex space-x-2">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-lg border flex items-center transition-all duration-200',
                  currentPage === 1 
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400'
                ]"
              >
                <ChevronLeft class="h-4 w-4 mr-1" />
                Previous
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage >= totalPages"
                :class="[
                  'px-4 py-2 rounded-lg border flex items-center transition-all duration-200',
                  currentPage >= totalPages 
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400'
                ]"
              >
                <ChevronRight class="h-4 w-4 mr-1" />
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="showEditModal" 
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            @click="showEditModal = false"
          >
            <div 
              class="bg-white dark:bg-gray-800 rounded-md shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700"
              @click.stop
            >
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <Edit class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Edit Product
                </h2>
                <button 
                  @click="showEditModal = false"
                  class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <X class="h-5 w-5" />
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product ID</label>
                  <div class="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                    {{ editingItem.id }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    v-model="editingItem.name" 
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Count</label>
                  <input 
                    type="number" 
                    v-model="editingItem.count" 
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Price (₦)</label>
                  <input 
                    type="number" 
                    v-model="editingItem.unitPrice" 
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Sales (₦)</label>
                  <div class="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                    ₦{{ formatNumber(editingItem.count * editingItem.unitPrice) }}
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-3 mt-6">
                <button 
                  @click="showEditModal = false"
                  class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  @click="saveEdit"
                  class="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
  
      <!-- Export Confirmation Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="showExportConfirmation" 
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            @click="showExportConfirmation = false"
          >
            <div 
              class="bg-white dark:bg-gray-800 rounded-md shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700"
              @click.stop
            >
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FileDown class="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                  Export Confirmation
                </h2>
                <button 
                  @click="showExportConfirmation = false"
                  class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <X class="h-5 w-5" />
                </button>
              </div>
              <div class="mb-6">
                <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30 mb-4">
                  <div class="flex">
                    <Info class="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                    <p class="text-sm text-amber-800 dark:text-amber-300">
                      You are about to export all sales data to Excel format. This file will contain all product information and sales figures.
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Select export options:</p>
                <div class="mt-3 space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" checked class="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Include product details</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" checked class="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Include sales data</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" checked class="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Format as Excel spreadsheet</span>
                  </label>
                </div>
              </div>
              <div class="flex justify-end space-x-3">
                <button 
                  @click="showExportConfirmation = false"
                  class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  @click="exportToExcel"
                  class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-colors duration-200 flex items-center"
                >
                  <FileDown class="h-4 w-4 mr-1.5" />
                  Confirm Export
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import { 
    Package2, 
    LayoutGrid, 
    Coffee, 
    BarChart, 
    Edit,
    DollarSign,
    TrendingUp,
    Users,
    UserCheck,
    CalendarDays,
    MapPin,
    ShoppingBag,
    ShoppingCart,
    RefreshCw,
    Download,
    FileDown,
    Search,
    ChevronLeft,
    ChevronRight,
    X,
    Info,
    FileQuestion,
    Sun,
    Moon
  } from 'lucide-vue-next'
  import Chart from 'chart.js/auto'
  import { CategoryScale } from 'chart.js'
  Chart.register(CategoryScale)
  
  // Define types
  interface Product {
    id: string;
    name: string;
    count: number;
    unitPrice: number;
    sales: number;
    category?: string;
  }
  
  // Stats data
  const totalOrders = ref(0)
  const todaysOrders = ref(0)
  const totalSales = ref(0)
  const customerCount = ref(0)
  
  // Dark mode
  const isDarkMode = ref(false)
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Update charts with new theme
    updateChartsTheme()
  }
  
  // Chart references
  const monthlyChart = ref<HTMLCanvasElement | null>(null)
  const locationChart = ref<HTMLCanvasElement | null>(null)
  const categoryChart = ref<HTMLCanvasElement | null>(null)
  const revenueChart = ref<HTMLCanvasElement | null>(null)
  let monthlyChartInstance: Chart | null = null
  let locationChartInstance: Chart | null = null
  let categoryChartInstance: Chart | null = null
  let revenueChartInstance: Chart | null = null
  
  // Table data
  const products = ref<Product[]>([])
  const searchQuery = ref('')
  const currentPage = ref(1)
  const pageSize = ref(50)
  const startIndex = computed(() => (currentPage.value - 1) * Number(pageSize.value))
  const endIndex = computed(() => startIndex.value + Number(pageSize.value))
  
  // Modals
  const showEditModal = ref(false)
  const showExportConfirmation = ref(false)
  const editingItem = ref<Product>({
    id: '',
    name: '',
    count: 0,
    unitPrice: 0,
    sales: 0
  })
  
  // Filtered and paginated data
  const filteredData = computed(() => {
    if (!searchQuery.value) return products.value
    
    const query = searchQuery.value.toLowerCase()
    return products.value.filter(item => 
      item.id.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query)
    )
  })
  
  const paginatedData = computed(() => {
    return filteredData.value.slice(startIndex.value, endIndex.value)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / Number(pageSize.value))
  })
  
  // Generate dummy data
  const generateDummyData = () => {
    const productNames = [
      'Premium Coffee Beans', 'Organic Tea Set', 'Ceramic Mug', 
      'French Press', 'Coffee Grinder', 'Espresso Machine',
      'Tea Infuser', 'Coffee Filters', 'Milk Frother', 'Coffee Syrup',
      'Specialty Chocolate', 'Flavored Syrups', 'Reusable Cups',
      'Cold Brew Kit', 'Pour Over Set', 'Barista Tools'
    ]
    
    const categories = ['Beverages', 'Equipment', 'Accessories', 'Consumables', 'Gift Sets']
    
    const dummyProducts: Product[] = []
    
    for (let i = 1; i <= 100; i++) {
      const count = Math.floor(Math.random() * 50) + 1
      const unitPrice = Math.floor(Math.random() * 10000) + 500
      const sales = count * unitPrice
      
      dummyProducts.push({
        id: `PRD${String(i).padStart(3, '0')}`,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        count,
        unitPrice,
        sales,
        category: categories[Math.floor(Math.random() * categories.length)]
      })
    }
    
    products.value = dummyProducts
    
    // Calculate totals
    totalOrders.value = dummyProducts.reduce((sum, product) => sum + product.count, 0)
    todaysOrders.value = Math.floor(Math.random() * 50)
    totalSales.value = dummyProducts.reduce((sum, product) => sum + product.sales, 0)
    customerCount.value = Math.floor(Math.random() * 500) + 100
  }
  
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  // Pagination methods
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const updatePagination = () => {
    currentPage.value = 1
  }
  
  // Edit methods
  const editItem = (item: Product) => {
    editingItem.value = { ...item }
    showEditModal.value = true
  }
  
  const saveEdit = () => {
    const index = products.value.findIndex(item => item.id === editingItem.value.id)
    if (index !== -1) {
      // Update sales based on new count and unit price
      editingItem.value.sales = editingItem.value.count * editingItem.value.unitPrice
      products.value[index] = { ...editingItem.value }
      
      // Recalculate totals
      totalOrders.value = products.value.reduce((sum, product) => sum + product.count, 0)
      totalSales.value = products.value.reduce((sum, product) => sum + product.sales, 0)
      
      // Update charts
      updateCharts()
    }
    showEditModal.value = false
  }
  
  // Export to Excel
  const exportToExcel = () => {
    showExportConfirmation.value = false
    
    // In a real application, you would implement actual Excel export
    // For this demo, we'll simulate it with a timeout and animation
    const notification = document.createElement('div')
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 animate-slide-up'
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      Data exported successfully!
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.classList.add('animate-slide-down')
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 3000)
  }
  
  // Initialize monthly chart
  const initMonthlyChart = () => {
    if (!monthlyChart.value) return
    
    const ctx = monthlyChart.value.getContext('2d')
    if (!ctx) return
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    const data = months.map(() => Math.floor(Math.random() * 100) + 20)
    
    if (monthlyChartInstance) {
      monthlyChartInstance.destroy()
    }
    
    const textColor = isDarkMode.value ? '#e5e7eb' : '#374151'
    const gridColor = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    
    monthlyChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Total Orders',
          data: data,
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          borderRadius: 6,
          maxBarThickness: 40
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor
            }
          },
          x: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor
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
  
  // Initialize location chart
  const initLocationChart = () => {
    if (!locationChart.value) return
    
    const ctx = locationChart.value.getContext('2d')
    if (!ctx) return
    
    const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu']
    const data = locations.map(() => Math.floor(Math.random() * 100) + 10)
    
    if (locationChartInstance) {
      locationChartInstance.destroy()
    }
    
    const textColor = isDarkMode.value ? '#e5e7eb' : '#374151'
    
    locationChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: locations,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(14, 165, 233, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(168, 85, 247, 0.7)',
            'rgba(217, 70, 239, 0.7)'
          ],
          borderColor: [
            'rgba(14, 165, 233, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(99, 102, 241, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(217, 70, 239, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: textColor,
              padding: 20,
              font: {
                size: 12
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: 'easeOutQuart'
        },
        cutout: '65%'
      }
    })
  }
  
  // Initialize category chart
  const initCategoryChart = () => {
    if (!categoryChart.value) return
    
    const ctx = categoryChart.value.getContext('2d')
    if (!ctx) return
    
    // Group products by category
    const categories = [...new Set(products.value.map(p => p.category))]
    const categoryCounts = categories.map(category => {
      return products.value.filter(p => p.category === category).length
    })
    
    if (categoryChartInstance) {
      categoryChartInstance.destroy()
    }
    
    const textColor = isDarkMode.value ? '#e5e7eb' : '#374151'
    
    categoryChartInstance = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: categories,
        datasets: [{
          data: categoryCounts,
          backgroundColor: [
            'rgba(245, 158, 11, 0.7)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(217, 119, 6, 0.7)'
          ],
          borderColor: [
            'rgba(245, 158, 11, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(217, 119, 6, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: textColor
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        },
        scales: {
          r: {
            ticks: {
              color: textColor
            },
            grid: {
              color: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    })
  }
  
  // Initialize revenue chart
  const initRevenueChart = () => {
    if (!revenueChart.value) return
    
    const ctx = revenueChart.value.getContext('2d')
    if (!ctx) return
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    const actualData = months.map(() => Math.floor(Math.random() * 500000) + 100000)
    const targetData = months.map(() => Math.floor(Math.random() * 600000) + 200000)
    
    if (revenueChartInstance) {
      revenueChartInstance.destroy()
    }
    
    const textColor = isDarkMode.value ? '#e5e7eb' : '#374151'
    const gridColor = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    
    revenueChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Actual Revenue',
            data: actualData,
            borderColor: 'rgba(244, 63, 94, 1)',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(244, 63, 94, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Target Revenue',
            data: targetData,
            borderColor: 'rgba(251, 113, 133, 0.8)',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: 'rgba(251, 113, 133, 0.8)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor,
              callback: function(value) {
                return '₦' + (Number(value) / 1000) + 'k';
              }
            }
          },
          x: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor
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
  
  // Update charts when data changes
  const updateCharts = () => {
    initMonthlyChart()
    initLocationChart()
    initCategoryChart()
    initRevenueChart()
  }
  
  // Update charts when theme changes
  const updateChartsTheme = () => {
    updateCharts()
  }
  
  // Watch for changes in search or page size
  watch([searchQuery, pageSize], () => {
    currentPage.value = 1
  })
  
  // Initialize on component mount
  onMounted(() => {
    generateDummyData()
    
    // Use setTimeout to ensure the DOM is fully rendered
    setTimeout(() => {
      initMonthlyChart()
      initLocationChart()
      initCategoryChart()
      initRevenueChart()
    }, 100)
    
    // Animate the counters
    const animateCounter = (element: Ref<number>, target: number, duration: number = 2000) => {
      const startTime = Date.now()
      const startValue = 0
      
      const updateCounter = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        
        if (elapsed < duration) {
          const progress = elapsed / duration
          // Use easeOutExpo for smoother animation
          const easeProgress = 1 - Math.pow(2, -10 * progress)
          element.value = Math.floor(startValue + easeProgress * target)
          requestAnimationFrame(updateCounter)
        } else {
          element.value = target
        }
      }
      
      updateCounter()
    }
    
    animateCounter(totalOrders, totalOrders.value)
    animateCounter(todaysOrders, todaysOrders.value)
    animateCounter(totalSales, totalSales.value, 2500)
    animateCounter(customerCount, customerCount.value, 2200)
  })

  definePageMeta({
    layout: 'dashboard'
  })
  </script>
  
  <style>
  /* Custom animations */
  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slide-down {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100%); opacity: 0; }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out forwards;
  }
  
  .animate-slide-down {
    animation: slide-down 0.3s ease-in forwards;
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 102,241,0.5);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.8);
  }
  
  /* Transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Focus styles */
  *:focus-visible {
    outline: 2px solid rgba(99, 102, 241, 0.6);
    outline-offset: 2px;
  }
  
  /* Dark mode transitions */
  .dark {
    color-scheme: dark;
  }
  
  /* Card hover effects */
  .card-hover-effect {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card-hover-effect:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  </style>