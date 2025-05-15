<template>
  <div class="delivery-container">
    <h1 class="text-xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
      <span class="relative group">
        Delivery & Pack Settings
        <span class="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-3 h-6 w-6 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    </h1>
    
    <transition name="fade" mode="out-in">
      <template #default>
        <!-- Loading state -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
          <div class="loader"></div>
          <p class="text-gray-600 dark:text-gray-300 mt-4">Loading settings...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-6 animate-appear">
          <p class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>{{ error }}</span>
          </p>
          <button 
            @click="fetchData"
            class="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline transition-colors"
          >
            Try Again
          </button>
        </div>
        
        <!-- Main content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Pack Settings Section -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-800 dark:text-white">Pack Settings</h2>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Configure your packaging options</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="group">
                <label for="packPrice" class="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-all group-focus-within:text-orange-500">
                  Pack Price (₦)
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 dark:text-gray-400">₦</span>
                  </div>
                  <input 
                    id="packPrice"
                    v-model.number="tempPackSettings.price"
                    type="number"
                    class="w-full pl-8 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none transition-all"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  <div 
                    v-if="tempPackSettings.price !== vendorPackSettings.price" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 animate-pulse"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M19 12l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Set the price for each packaging unit
                </p>
              </div>
              
              <div class="group">
                <label for="packLimit" class="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-all group-focus-within:text-orange-500">
                  Pack Limit
                </label>
                <div class="relative">
                  <input 
                    id="packLimit"
                    v-model.number="tempPackSettings.limit"
                    type="number"
                    class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none transition-all"
                    placeholder="10"
                    min="1"
                    max="15"
                  />
                  <div 
                    v-if="tempPackSettings.limit !== vendorPackSettings.limit" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 animate-pulse"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M19 12l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Maximum number of packs per order (1-15)
                </p>
              </div>
              
              <div class="pt-4">
                <button 
                  @click="updatePackSettings"
                  class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  :disabled="isUpdatingSettings || !hasPackSettingsChanged"
                >
                  <span v-if="isUpdatingSettings" class="inline-block mr-2">
                    <div class="spinner-sm"></div>
                  </span>
                  <span v-else class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                  </span>
                  <span>{{ isUpdatingSettings ? 'Updating...' : 'Save Pack Settings' }}</span>
                </button>
              </div>
              
              <!-- Current Settings Card -->
              <div class="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Current Settings
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Pack Price</div>
                    <div class="text-lg font-bold text-gray-800 dark:text-white">₦{{ vendorPackSettings.price }}</div>
                  </div>
                  <div class="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Pack Limit</div>
                    <div class="text-lg font-bold text-gray-800 dark:text-white">{{ vendorPackSettings.limit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Delivery Locations Section -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-800 dark:text-white">Delivery Locations</h2>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Manage your delivery areas and prices</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                <h3 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Add New Location</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div class="md:col-span-3 group">
                    <label for="locationName" class="block text-gray-600 dark:text-gray-400 text-sm mb-2 transition-all group-focus-within:text-orange-500">
                      Location Name
                    </label>
                    <input 
                      id="locationName"
                      v-model="newLocation.name"
                      type="text"
                      class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none transition-all"
                      placeholder="e.g Harmony Estate"
                    />
                  </div>
                  
                  <div class="md:col-span-1 group">
                    <label for="deliveryPrice" class="block text-gray-600 dark:text-gray-400 text-sm mb-2 transition-all group-focus-within:text-orange-500">
                      Price (₦)
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400">₦</span>
                      </div>
                      <input 
                        id="deliveryPrice"
                        v-model.number="newLocation.price"
                        type="number"
                        class="w-full pl-8 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none transition-all"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  @click="addLocation"
                  class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  :disabled="isAddingLocation || !canAddLocation"
                >
                  <span v-if="isAddingLocation" class="inline-block mr-2">
                    <div class="spinner-sm"></div>
                  </span>
                  <span v-else class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                  <span>{{ isAddingLocation ? 'Adding...' : 'Add Location' }}</span>
                </button>
              </div>
              
              <!-- Locations Table -->
              <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="overflow-x-auto">
                  <transition-group name="list" tag="table" class="w-full min-w-full">
                    <thead key="header" class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Location Name</th>
                        <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Price</th>
                        <th class="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody key="body">
                      <tr 
                        v-for="(location, index) in vendorObj?.deliveryLocation" 
                        :key="location._id || index"
                        class="border-b border-gray-200 dark:border-gray-700 text-sm transition-all hover:bg-orange-50 dark:hover:bg-orange-900/10"
                      >
                        <td class="py-4 px-4 text-gray-800 dark:text-gray-200">
                          <input 
                            v-if="editingIndex === index"
                            v-model="editingLocation.name"
                            class="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none rounded-lg p-2 w-full transition-all"
                          />
                          <span v-else>{{ location.name }}</span>
                        </td>
                        <td class="py-4 px-4 text-gray-800 dark:text-gray-200">
                          <input 
                            v-if="editingIndex === index"
                            v-model.number="editingLocation.deliveryFee"
                            type="number"
                            step="0.01"
                            min="0"
                            class="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:outline-none rounded-lg p-2 w-full transition-all"
                          />
                          <span v-else class="font-medium">₦{{ location?.deliveryFee?.toFixed(2) }}</span>
                        </td>
                        <td class="py-4 px-4 flex justify-end gap-2">
                          <template v-if="editingIndex === index">
                            <button 
                              @click="saveEdit"
                              class="p-2 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20"
                              :disabled="isUpdatingLocation"
                            >
                              <span v-if="isUpdatingLocation">
                                <div class="spinner-xs"></div>
                              </span>
                              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                              </svg>
                            </button>
                            <button 
                              @click="cancelEdit"
                              class="p-2 text-red-500 hover:text-red-600 cursor-pointer transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                              :disabled="isUpdatingLocation"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </template>
                          <template v-else>
                            <button 
                              @click="startEdit(index)"
                              class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            
                            <button 
                              @click="confirmLocation(index)"
                              class="p-2 rounded-full transition-colors hover:bg-green-50 dark:hover:bg-green-900/20"
                              :class="{ 
                                'text-gray-400 dark:text-gray-600 cursor-not-allowed': location.confirmed, 
                                'text-green-500 hover:text-green-600 cursor-pointer': !location.confirmed 
                              }"
                              :disabled="location.confirmed || isConfirming === index"
                            >
                              <span v-if="isConfirming === index">
                                <div class="spinner-xs"></div>
                              </span>
                              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            
                            <button 
                              @click="removeLocation(index)"
                              class="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                              :disabled="isDeleting === index"
                            >
                              <span v-if="isDeleting === index">
                                <div class="spinner-xs"></div>
                              </span>
                              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </transition-group>
                </div>
                
                <!-- Empty state -->
                <div 
                  v-if="!vendorObj?.deliveryLocation || vendorObj.deliveryLocation.length === 0" 
                  class="py-12 text-center text-gray-500 dark:text-gray-400 animate-appear border-dashed border-2 border-gray-200 dark:border-gray-700 rounded-md m-4"
                >
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p class="text-lg font-medium mb-2">No locations added yet</p>
                    <p class="text-sm max-w-md mx-auto">
                      Add your first delivery location using the form above to start accepting orders from different areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </div>

  <!-- Toast Notifications -->
  <Teleport to="body">
    <transition name="toast">
      <div 
        v-if="toast.show" 
        class="fixed bottom-4 right-4 z-50 max-w-md transform transition-all duration-500 flex"
      >
        <div 
          class="flex items-center p-4 rounded-lg shadow-lg text-white"
          :class="{
            'bg-gradient-to-r from-green-500 to-green-600': toast.type === 'success',
            'bg-gradient-to-r from-red-500 to-red-600': toast.type === 'error',
            'bg-gradient-to-r from-blue-500 to-blue-600': toast.type === 'info'
          }"
        >
          <div class="mr-3">
            <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div>
            <p class="font-medium">{{ toast.message }}</p>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useUpdatePackPrice } from "~/composables/modules/vendor/useUpdatePackPrice"
import { useCreateDeliveryLocation } from '@/composables/modules/delivery/useCreateDeliveryLocation'
import { useUpdateDeliveryLocation } from '@/composables/modules/delivery/useUpdateDeliveryLocation'
import { useDeleteDeliveryLocation } from '@/composables/modules/delivery/useDeleteDeliveryLocation'
import { useFetchVendor } from "@/composables/modules/vendor/useFetchVendor"

import type { DeliveryLocation } from '~/types'

// States
const loading = ref(true)
const error = ref<string | null>(null)
const isAddingLocation = ref(false)
const isUpdatingLocation = ref(false)
const isUpdatingSettings = ref(false)
const isConfirming = ref<number | null>(null)
const isDeleting = ref<number | null>(null)

// Composables
const { createDeliveryLocation, loading: createLoading } = useCreateDeliveryLocation()
const { updateDeliveryLocation, loading: updateLoading } = useUpdateDeliveryLocation()
const { deleteDeliveryLocation, loading: deleteLoading } = useDeleteDeliveryLocation()
const { updatePackPrice, result, loading: updating } = useUpdatePackPrice()
const { vendor: vendorObj, fetchVendor, loading: fetchingVendor } = useFetchVendor()

// Toast notification state
const toast = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'info',
  timeout: null as NodeJS.Timeout | null
})

// Pack settings from vendor object
const vendorPackSettings = reactive({
  price: 0,
  limit: 0
})

// Temporary form state for pack settings
const tempPackSettings = reactive({
  price: 0,
  limit: 0
})

// Computed property to check if pack settings have changed
const hasPackSettingsChanged = computed(() => {
  return tempPackSettings.price !== vendorPackSettings.price || 
         tempPackSettings.limit !== vendorPackSettings.limit
})

// Loading state
const isLoading = computed(() => {
  return loading.value || fetchingVendor.value
})

// New location form
const newLocation = reactive<DeliveryLocation>({
  name: '',
  price: 0,
  confirmed: false
})

// Editing state
const editingIndex = ref<number | null>(null)
const editingLocation = reactive<DeliveryLocation>({ 
  name: '', 
  deliveryFee: 0,
  confirmed: false 
})

// Validate new location form
const canAddLocation = computed(() => {
  return newLocation.name.trim() !== '' && newLocation.price >= 0
})

// Initialize pack settings from vendor object
function initializePackSettings() {
  if (vendorObj.value && vendorObj.value.packSettings) {
    vendorPackSettings.price = vendorObj.value.packSettings.price || 0
    vendorPackSettings.limit = vendorObj.value.packSettings.limit || 0
    
    // Also update the form values
    tempPackSettings.price = vendorPackSettings.price
    tempPackSettings.limit = vendorPackSettings.limit
    
    console.log('Initialized pack settings:', vendorPackSettings)
  }
}

// Fetch all data
const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Fetch vendor data
    await fetchVendor()
    
    // Initialize pack settings from vendor object
    initializePackSettings()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

// Update pack settings
const updatePackSettings = async () => {
  if (isUpdatingSettings.value) return
  
  isUpdatingSettings.value = true
  try {
    await updatePackPrice({
      price: tempPackSettings.price,
      limit: tempPackSettings.limit
    })
    
    // Refresh vendor data to get updated pack settings
    await fetchVendor()
    
    // Re-initialize pack settings with fresh data
    initializePackSettings()
    
    // Show success notification
    showToast('Pack settings updated successfully!', 'success')
  } catch (err) {
    showToast('Failed to update pack settings', 'error')
    console.error('Error updating pack settings:', err)
  } finally {
    isUpdatingSettings.value = false
  }
}

// Add new location
const addLocation = async () => {
  if (isAddingLocation.value || !canAddLocation.value) return
  
  isAddingLocation.value = true
  try {
    const result = await createDeliveryLocation({
      name: newLocation.name.trim(),
      deliveryFee: newLocation.price,
    })
    
    // Refresh vendor data to get updated locations
    await fetchVendor()
    
    // Reset form on success
    resetLocationForm()
    showToast('Location added successfully!', 'success')
  } catch (err) {
    showToast('Failed to add location', 'error')
    console.error('Error adding location:', err)
  } finally {
    isAddingLocation.value = false
  }
}

// Start editing a location
const startEdit = (index: number) => {
  editingIndex.value = index
  const location = vendorObj.value?.deliveryLocation[index]
  if (location) {
    editingLocation.name = location.name
    editingLocation.deliveryFee = location.deliveryFee
    editingLocation.confirmed = location.confirmed || false
  }
}

// Save edited location
const saveEdit = async () => {
  if (isUpdatingLocation.value || editingIndex.value === null) return
  
  isUpdatingLocation.value = true
  try {
    const index = editingIndex.value
    const location = vendorObj.value?.deliveryLocation[index]
    
    if (location) {
      const result = await updateDeliveryLocation(location._id, {
        name: editingLocation.name.trim(),
        deliveryFee: editingLocation.deliveryFee,
      })
      
      // Refresh vendor data to get updated locations
      await fetchVendor()
      
      // Reset editing state
      editingIndex.value = null
      showToast('Location updated successfully!', 'success')
    }
  } catch (err) {
    showToast('Failed to update location', 'error')
    console.error('Error updating location:', err)
  } finally {
    isUpdatingLocation.value = false
  }
}

// Cancel editing
const cancelEdit = () => {
  editingIndex.value = null
}

// Confirm a location
const confirmLocation = async (index: number) => {
  const location = vendorObj.value?.deliveryLocation[index]
  if (!location || location.confirmed) return
  
  isConfirming.value = index
  try {
    const result = await updateDeliveryLocation(location._id, {
      name: location.name,
      deliveryFee: location.deliveryFee,
      confirmed: true
    })
    
    // Refresh vendor data to get updated locations
    await fetchVendor()
    
    showToast('Location confirmed successfully!', 'success')
  } catch (err) {
    showToast('Failed to confirm location', 'error')
    console.error('Error confirming location:', err)
  } finally {
    isConfirming.value = null
  }
}

// Remove a location
const removeLocation = async (index: number) => {
  const location = vendorObj.value?.deliveryLocation[index]
  if (!location) return
  
  isDeleting.value = index
  try {
    await deleteDeliveryLocation(location._id)
    
    // Refresh vendor data to get updated locations
    await fetchVendor()
    
    showToast('Location deleted successfully!', 'success')
  } catch (err) {
    showToast('Failed to delete location', 'error')
    console.error('Error deleting location:', err)
  } finally {
    isDeleting.value = null
  }
}

// Reset location form
const resetLocationForm = () => {
  newLocation.name = ''
  newLocation.price = 0
}

// Show toast notification
const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  // Clear any existing timeout
  if (toast.timeout) {
    clearTimeout(toast.timeout)
  }
  
  // Set toast properties
  toast.message = message
  toast.type = type
  toast.show = true
  
  // Auto-hide after 3 seconds
  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 3000)
}

// Watch for changes in the vendor object
watch(() => vendorObj.value, (newVendor) => {
  if (newVendor) {
    console.log('Vendor object updated:', newVendor)
    initializePackSettings()
  }
}, { immediate: true, deep: true })

// Initialize on component mount
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* Loaders */
.loader {
  border: 3px solid rgba(238, 119, 73, 0.1);
  border-radius: 50%;
  border-top: 3px solid #ee7749;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.spinner-sm {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #ffffff;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

.spinner-xs {
  border: 2px solid rgba(238, 119, 73, 0.1);
  border-radius: 50%;
  border-top: 2px solid #ee7749;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.animate-appear {
  animation: appear 0.5s ease-out;
}

@keyframes appear {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Toast animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>