<template>
  <div class="relative min-h-screen font-sans bg-neutral-50 overflow-x-hidden">
    <!-- Full Screen Loader -->
    <Transition name="fade-fast">
      <div v-if="isPageLoading" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50">
        <div class="relative w-24 h-24 md:w-32 md:h-32">
          <!-- Animated plate -->
          <div class="absolute inset-0 rounded-full bg-white shadow-lg animate-pulse"></div>
        
          <!-- Animated food icons -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="relative">
              <!-- Burger icon -->
              <div class="absolute -top-10 -left-8 animate-float-staggered" style="animation-delay: 0s;">
                <UtensilsIcon class="h-6 w-6 text-amber-500" />
              </div>
            
              <!-- Pizza icon -->
              <div class="absolute -top-6 left-6 animate-float-staggered" style="animation-delay: 0.5s;">
                <CakeIcon class="h-6 w-6 text-rose-500" />
              </div>
            
              <!-- Drink icon -->
              <div class="absolute top-4 -left-10 animate-float-staggered" style="animation-delay: 1s;">
                <CoffeeIcon class="h-6 w-6 text-amber-700" />
              </div>
            
              <!-- Salad icon -->
              <div class="absolute top-6 left-4 animate-float-staggered" style="animation-delay: 1.5s;">
                <SaladIcon class="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        
          <!-- Circular spinner -->
          <svg class="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="url(#gradient)" 
              stroke-width="3" 
              stroke-linecap="round"
              stroke-dasharray="70 30"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#e11d48" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      
        <h2 class="mt-8 text-2xl font-bold text-gray-800 animate-pulse">
          {{ vendor?.restaurantName || 'Loading Menu' }}
        </h2>
        <p class="mt-2 text-gray-600">Preparing delicious options for you...</p>
      
        <!-- Loading progress bar -->
        <div class="w-64 h-1.5 mt-6 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full animate-progress"
          ></div>
        </div>
      </div>
    </Transition>

    <!-- Store Closed Overlay -->
    <Transition name="fade">
      <div 
        v-if="!vendor?.isStoreOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
        @click.self="handleClosedStoreClick"
      >
        <div 
          class="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-700 animate-float"
        >
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-4 animate-pulse">
              <LockIcon class="h-10 w-10 text-rose-500" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Sorry, We're Closed</h2>
            <p class="text-gray-600 mb-6">
              {{ vendor?.restaurantName }} is currently closed. Our working hours are:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 w-full">
              <div 
                v-for="(hours, index) in vendor?.workingHours" 
                :key="index"
                class="flex justify-between px-3 py-2 rounded-lg"
                :class="isToday(hours.day) ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'"
              >
                <span class="font-medium" :class="isToday(hours.day) ? 'text-amber-700' : 'text-gray-700'">
                  {{ hours.day.substring(0, 3) }}
                </span>
                <span :class="isToday(hours.day) ? 'text-amber-700' : 'text-gray-600'">
                  {{ hours.openingTime }} - {{ hours.closingTime }}
                </span>
              </div>
            </div>
            <button 
              @click="redirectToHome"
              class="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Layout with Fixed Cart -->
    <div class="flex flex-col lg:flex-row">
      <!-- Main Content Area -->
      <div class="w-full lg:w-2/3 xl:w-3/4">
        <!-- Hero Section with Parallax -->
        <div class="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div 
            ref="parallaxBg" 
            class="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-rose-900/90 z-10"
          >
            <div 
              class="absolute inset-0 bg-cover bg-center"
              :style="{ 
                backgroundImage: `url(${vendor?.displayImage || '@/assets/img/meal.jpg'})`,
                opacity: '0.4',
                transform: `translateY(${scrollY * 0.4}px)`
              }"
            ></div>
            <div class="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
          </div>

          <!-- Restaurant Name with Animation -->
          <div class="relative z-20 h-full flex flex-col justify-center px-6 md:px-12">
            <div class="max-w-7xl mx-auto w-full">
              <h1 
                class="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight"
                :class="{'animate-pulse': vendor?.isStoreOpen}"
              >
                <span class="inline-block transform transition-all duration-700 hover:scale-105 origin-left">
                  {{ vendor?.restaurantName }}
                </span>
              </h1>
              
              <div class="flex items-center space-x-4 mt-4">
                <div 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="vendor?.isStoreOpen ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'"
                >
                  <span class="flex items-center">
                    <span 
                      class="w-2 h-2 rounded-full mr-2 animate-pulse"
                      :class="vendor?.isStoreOpen ? 'bg-green-500' : 'bg-rose-500'"
                    ></span>
                    {{ vendor?.isStoreOpen ? 'Open Now' : 'Closed' }}
                  </span>
                </div>
                
                <div class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  {{ vendor?.category }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Curved Divider -->
          <div class="absolute bottom-0 left-0 right-0 h-16 z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 w-full h-full">
              <path fill="#ffffff" fill-opacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-30 -mt-10 pb-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Restaurant Info Card -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
              <div class="p-6 md:p-8">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <!-- Restaurant Details -->
                  <div class="space-y-4">
                    <div class="flex items-start space-x-4">
                      <div class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold">
                        {{ vendor?.restaurantName?.charAt(0).toUpperCase() }}
                      </div>
                      
                      <div>
                        <h2 class="text-2xl font-bold text-gray-800">{{ vendor?.restaurantName }}</h2>
                        <div class="flex items-center mt-1">
                          <MapPinIcon class="h-4 w-4 text-gray-500 mr-1" />
                          <p class="text-gray-600 text-sm">{{ vendor?.locationName }}</p>
                        </div>
                        <div class="flex items-center mt-1">
                          <PhoneIcon class="h-4 w-4 text-gray-500 mr-1" />
                          <p class="text-gray-600 text-sm">{{ vendor?.phoneNumber }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Rating Stars -->
                    <div class="flex items-center">
                      <div class="flex">
                        <StarIcon 
                          v-for="i in 5" 
                          :key="i"
                          class="h-5 w-5" 
                          :class="getAverageRating() >= i ? 'text-amber-400 fill-current' : 'text-gray-300'"
                        />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">
                        {{ getAverageRating().toFixed(1) }} ({{ reviews?.length || 0 }} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="flex flex-wrap gap-3">
                    <button 
                      @click="showVendorReviewsModal = true"
                      class="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                    >
                      <StarIcon class="h-4 w-4 mr-2" />
                      <span>Reviews</span>
                    </button>
                    
                    <button 
                      @click="showReviewModal = true"
                      class="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                    >
                      <PencilIcon class="h-4 w-4 mr-2" />
                      <span>Write Review</span>
                    </button>
                  </div>
                </div>
                
                <!-- Working Hours Accordion -->
                <div class="mt-6 border-t border-gray-100 pt-6">
                  <div 
                    @click="showHours = !showHours" 
                    class="flex items-center justify-between cursor-pointer"
                  >
                    <h3 class="text-lg font-medium text-gray-800 flex items-center">
                      <ClockIcon class="h-5 w-5 mr-2 text-amber-500" />
                      Working Hours
                    </h3>
                    <ChevronDownIcon 
                      class="h-5 w-5 text-gray-500 transition-transform duration-300"
                      :class="{ 'transform rotate-180': showHours }"
                    />
                  </div>
                  
                  <Transition name="expand">
                    <div v-if="showHours" class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div 
                        v-for="(hours, index) in vendor?.workingHours" 
                        :key="index"
                        class="flex justify-between px-4 py-2 rounded-lg"
                        :class="isToday(hours.day) ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'"
                      >
                        <span class="font-medium" :class="isToday(hours.day) ? 'text-amber-700' : 'text-gray-700'">
                          {{ hours.day }}
                        </span>
                        <span :class="isToday(hours.day) ? 'text-amber-700' : 'text-gray-600'">
                          {{ hours.openingTime }} - {{ hours.closingTime }}
                        </span>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            
            <!-- Menu Section -->
            <div class="mt-10">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                  <UtensilsIcon class="h-6 w-6 mr-2 text-amber-500" />
                  Our Menu
                </h2>
                
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search menu..."
                    class="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                  />
                  <SearchIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  />
                </div>
              </div>
              
              <!-- Loading State -->
              <div v-if="fetchingMenu" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
              
              <!-- Menu Items Grid -->
              <div 
                v-else-if="filteredMeals.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div 
                  v-for="(meal, index) in filteredMeals" 
                  :key="meal._id"
                  class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  :class="{'animate-fade-in': true}"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <div class="flex h-full">
                    <div class="w-1/3 relative overflow-hidden group">
                      <img 
                        :src="meal.image" 
                        :alt="meal.name"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div class="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h3 class="font-bold text-gray-800 text-lg">{{ meal.name }}</h3>
                        <p class="text-amber-600 font-bold mt-1">₦{{ formatPrice(meal.price) }}</p>
                      </div>
                      
                      <!-- Quantity Controls -->
                      <div class="self-end mt-4 flex items-center">
                        <template v-if="getMealQuantityInActivePack(meal._id) > 0">
                          <button
                            @click="decrementMealInActivePack(meal)"
                            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-l-md flex items-center justify-center transition-colors"
                          >
                            <MinusIcon class="h-4 w-4" />
                          </button>
                          <span class="w-8 text-center text-sm bg-gray-100 py-1.5">
                            {{ getMealQuantityInActivePack(meal._id) }}
                          </span>
                          <button
                            @click="incrementMealInActivePack(meal)"
                            class="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-r-md flex items-center justify-center transition-colors"
                          >
                            <PlusIcon class="h-4 w-4" />
                          </button>
                        </template>
                        <button
                          v-else
                          @click="addMealToActivePack(meal)"
                          class="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                        >
                          <PlusIcon class="h-4 w-4 mr-1" />
                          Add to Pack
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div 
                v-else-if="!fetchingMenu"
                class="bg-white rounded-xl shadow-md p-8 text-center"
              >
                <SearchXIcon class="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p class="text-gray-600">No meals found matching your search.</p>
                <button
                  @click="searchQuery = ''"
                  class="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fixed Cart Section -->
      <div class="lg:w-1/3 xl:w-1/4">
        <div class="lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:w-1/3 xl:w-1/4 lg:overflow-y-auto bg-white lg:shadow-xl lg:border-l border-gray-100 z-30">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 flex items-center">
                <ShoppingBagIcon class="h-5 w-5 mr-2 text-rose-500" />
                <span class="relative">
                  Your Orders
                  <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-rose-400 rounded-full"></span>
                </span>
                <span
                  v-if="cart.totalItems.value > 0"
                  class="ml-2 px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-full animate-pulse"
                >
                  {{ cart.totalItems.value }}
                </span>
              </h2>
              <div class="flex flex-col space-y-3">
                <button
                  @click="addNewPack"
                  class="px-2 py-1 bg-gray-100 hover:bg-gray-200 border text-gray-700 rounded-md text-sm flex items-center transition-all duration-300 transform hover:scale-105"
                  :class="{ 'relative': true }"
                  :disabled="cart.packs.value.length >= packLimit"
                  :title="cart.packs.value.length >= packLimit ? `Maximum ${packLimit} packs allowed` : 'Add a new pack'"
                >
                  <PlusIcon class="h-4 w-4 mr-1" /> Add Pack
                  <span v-if="isNewPackActive" class="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
                <button
                  @click="openDuplicatePackModal"
                  class="px-2 py-1 bg-green-50 hover:bg-green-100 border text-green-700 rounded-md text-sm flex items-center transition-all duration-300 transform hover:scale-105"
                  :class="{ 'relative': true }"
                  :disabled="cart.packs.value.length >= packLimit"
                  :title="cart.packs.value.length >= packLimit ? `Maximum ${packLimit} packs allowed` : 'Duplicate a pack'"
                >
                  <CopyIcon class="h-4 w-4 mr-1" /> Duplicate
                  <span v-if="isDuplicatedPackActive" class="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
              </div>
            </div>
            
            <!-- Pack Limit Warning -->
            <div v-if="cart.packs.value.length >= packLimit" class="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-start">
              <AlertCircleIcon class="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>This vendor has a limit of {{ packLimit }} packs per order.</span>
            </div>
            
            <!-- Loading State -->
            <div
              v-if="cart.loading.value"
              class="flex justify-center items-center py-8"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"
              ></div>
            </div>
            
            <!-- Empty Cart -->
            <div
              v-else-if="cart.totalItems.value === 0"
              class="text-center py-8"
            >
              <ShoppingCartIcon
                class="h-12 w-12 mx-auto text-gray-300 mb-3 animate-bounce-slow"
              />
              <p class="text-gray-500 mb-4">Your cart is empty</p>
              <p class="text-sm text-gray-400">
                Add items from the menu to get started
              </p>
            </div>
            
            <!-- Cart Items -->
            <div
              v-else
              class="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div
                v-for="(pack, index) in cart.packs.value"
                :key="pack.id"
                class="border rounded-md p-3 transition-colors animate-fade-in"
                :class="[
                  index === activePackIndex ? 'border-rose-300 bg-rose-50' : 'border-gray-100',
                  { 'hover:border-rose-200': true }
                ]"
              >
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div
                      :class="
                        pack.items.length > 0 ? 'bg-rose-500' : 'bg-gray-300'
                      "
                      class="w-2 h-2 rounded-full mr-2"
                    ></div>
                    <h3 class="font-medium text-gray-800 flex items-center">
                      Pack {{ index + 1 }}
                      <span class="text-gray-500 text-sm ml-1"
                        >( {{ pack.items.length }} items )</span
                      >
                      <span 
                        v-if="index === activePackIndex" 
                        class="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full"
                      >
                        Active
                      </span>
                    </h3>
                  </div>
                  <div class="flex space-x-1">
                    <button
                      @click="setActivePackIndex(index)"
                      class="text-xs px-2 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-md transition-colors transform hover:scale-105"
                      v-if="index !== activePackIndex"
                    >
                      <CheckIcon class="h-3 w-3 inline-block" /> Select
                    </button>
                    <button
                      v-if="cart.packs.value.length > 1"
                      @click="removePack(index)"
                      class="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors transform hover:scale-105"
                    >
                      <TrashIcon class="h-3 w-3 inline-block" /> Remove
                    </button>
                  </div>
                </div>

                <div v-if="pack.items.length > 0" class="mt-3 space-y-3">
                  <div
                    v-for="(item, itemIndex) in pack.items"
                    :key="`${pack.id}-${itemIndex}`"
                    class="flex justify-between items-center bg-white p-2 rounded-md hover:bg-gray-50 transition-all duration-300 border border-gray-100"
                  >
                    <div class="flex items-center rounded-lg">
                      <div
                        class="w-8 h-8 rounded-md overflow-hidden bg-gray-200"
                      >
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="w-full rounded-md h-full object-cover"
                        />
                      </div>
                      <div class="ml-2">
                        <p class="text-sm font-medium text-gray-800">
                          {{ item.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          ₦{{ formatPrice(item.price) }} × {{ item.quantity }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <button
                        @click="decrementItemQuantity(index, itemIndex)"
                        class="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-l-md flex items-center justify-center transition-colors"
                      >
                        <MinusIcon class="h-3 w-3" />
                      </button>
                      <span class="w-8 text-center text-sm">{{
                        item.quantity
                      }}</span>
                      <button
                        @click="incrementItemQuantity(index, itemIndex)"
                        class="w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-r-md flex items-center justify-center transition-colors"
                      >
                        <PlusIcon class="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="pack.note"
                    class="text-xs italic text-gray-500 bg-gray-50 p-2 rounded-md"
                  >
                    <span class="font-medium">Note:</span> {{ pack.note }}
                  </div>

                  <button
                    @click="openPackNoteModal(index)"
                    class="text-xs text-rose-500 hover:text-rose-700 transition-colors flex items-center transform hover:translate-x-1"
                  >
                    <PencilIcon class="h-3 w-3 mr-1" />
                    {{ pack.note ? "Edit" : "Add" }} note
                  </button>
                </div>

                <div v-else class="mt-3 text-center py-3 bg-gray-50 rounded-md">
                  <p class="text-sm text-gray-400">This pack is empty</p>
                </div>
              </div>
            </div>
            
            <!-- Cart Summary -->
            <div v-if="cart.totalItems.value > 0" class="mt-6 border-t space-y-3 border-gray-100 pt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subtotal:</span>
                <span class="font-medium">₦{{ formatPrice(cart.subtotal.value) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>Service Charge:</span>
                <span class="font-medium">₦{{ formatPrice(serviceCharge) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>Pack Fee (₦{{ packFee }} × {{ cart.packs.value.length }}):</span>
                <span class="font-medium">₦{{ formatPrice(packFee * cart.packs.value.length) }}</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-gray-800 mt-2 pt-2 border-t border-dashed border-gray-200">
                <span>Total:</span>
                <span>₦{{ formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
            
            <!-- Cart Actions -->
            <div class="flex gap-3 mt-4">
              <button
                @click="confirmEmptyCart"
                class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-all duration-300 flex items-center justify-center transform hover:scale-98"
                :disabled="cart.totalItems.value === 0"
                :class="{
                  'opacity-50 cursor-not-allowed': cart.totalItems.value === 0,
                }"
              >
                <TrashIcon class="h-4 w-4 mr-2" />
                Empty Cart
              </button>
              <button
                @click="proceedToCheckout"
                :disabled="cart.totalItems.value === 0"
                :class="{
                  'opacity-50 cursor-not-allowed': cart.totalItems.value === 0,
                  'hover:from-amber-600 hover:to-rose-600 hover:shadow-lg transform hover:-translate-y-0.5': cart.totalItems.value > 0,
                }"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-md shadow-md transition-all duration-300 flex items-center justify-center"
              >
                <ShoppingCartIcon class="h-4 w-4 mr-2" />
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Duplicate Pack Modal -->
    <Teleport to="body">
      <div
        v-if="showDuplicatePackModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        @click="closeDuplicatePackModal"
      >
        <div
          class="bg-white rounded-md shadow-xl w-full max-w-md animate-fade-in-up"
          @click.stop
        >
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CopyIcon class="h-5 w-5 mr-2 text-green-500" />
              Duplicate Pack
            </h2>

            <div class="mb-6">
              <label class="block text-gray-700 mb-2 font-medium"
                >Select Pack to Duplicate:</label
              >
              <div class="relative">
                <select
                  v-model="packToDuplicateIndex"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  <option
                    v-for="(pack, index) in cart.packs.value"
                    :key="pack.id"
                    :value="index"
                  >
                    Pack {{ index + 1 }} ({{ pack.items.length }} items)
                  </option>
                </select>
                <ChevronDownIcon
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div v-if="cart.packs.value.length >= packLimit" class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-start">
              <AlertCircleIcon class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p class="font-medium mb-1">Pack limit reached</p>
                <p>This vendor has a maximum limit of {{ packLimit }} packs per order. Please remove a pack before duplicating.</p>
              </div>
            </div>

            <div class="flex justify-end gap-3">
              <button
                @click="closeDuplicatePackModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                @click="duplicateSelectedPack"
                class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                :disabled="cart.packs.value.length >= packLimit"
                :class="{'opacity-50 cursor-not-allowed': cart.packs.value.length >= packLimit}"
              >
                Duplicate Pack
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Pack Note Modal -->
    <Teleport to="body">
      <div
        v-if="showPackNoteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        @click="closePackNoteModal"
      >
        <div
          class="bg-white rounded-md shadow-xl w-full max-w-md animate-fade-in-up"
          @click.stop
        >
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ClipboardEditIcon class="h-5 text-sm w-5 mr-2 text-blue-500" />
              Add Note to Pack
            </h2>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm mb-2 font-medium"
                >Special Instructions:</label
              >
              <textarea
                v-model="packNote"
                rows="3"
                placeholder="E.g., Make it spicy, serve hot, etc."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div class="flex justify-end gap-3">
              <button
                @click="closePackNoteModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                @click="savePackNote"
                class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Review Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showReviewModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          @click="closeReviewModal"
        >
          <div
            class="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in-up"
            @click.stop
          >
            <div class="relative p-6">
              <!-- Close button -->
              <button 
                @click="closeReviewModal" 
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon class="h-5 w-5" />
              </button>
              
              <!-- Header with animation -->
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4 animate-bounce-slow">
                  <StarIcon class="h-8 w-8 text-yellow-500" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800">
                  Share Your Experience
                </h2>
                <p class="text-gray-600 mt-1">Let others know what you think about {{ vendor?.restaurantName }}</p>
              </div>

              <!-- Review form -->
              <form @submit.prevent="submitReview" class="space-y-5">
                <!-- Customer Name -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">
                    Your Name <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    v-model="customerName"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <!-- Rating -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">
                    Rating <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center">
                    <div class="flex space-x-1">
                      <button 
                        v-for="star in 5" 
                        :key="star"
                        type="button"
                        @click="reviewRating = star"
                        @mouseenter="hoverRating = star"
                        @mouseleave="hoverRating = 0"
                        class="focus:outline-none transition-transform hover:scale-110 p-1"
                      >
                        <StarIcon 
                          class="h-8 w-8" 
                          :class="(hoverRating >= star || (!hoverRating && reviewRating >= star)) ? 'text-yellow-400 fill-current animate-pulse-once' : 'text-gray-300'"
                        />
                      </button>
                    </div>
                    <span class="ml-3 text-gray-700 font-medium">
                      {{ getRatingText(hoverRating || reviewRating) }}
                    </span>
                  </div>
                </div>

                <!-- Review Message -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">
                    Your Review <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="reviewText"
                    rows="4"
                    placeholder="Share your experience with this restaurant..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    :class="{ 'border-red-300': reviewError }"
                  ></textarea>
                  <p v-if="reviewError" class="mt-1 text-sm text-red-500 animate-shake">
                    {{ reviewError }}
                  </p>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                  <button
                    type="submit"
                    class="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                    :disabled="creatingReview"
                  >
                    <span v-if="creatingReview" class="flex items-center">
                      <span class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving Review...
                    </span>
                    <span v-else class="flex items-center">
                      <SendIcon class="h-5 w-5 mr-2" />
                      Submit Review
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Vendor Reviews Modal -->
    <Teleport to="body">
      <Transition name="slide-fade">
        <div
          v-if="showVendorReviewsModal"
          class="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-y-auto"
        >
          <div class="min-h-screen flex items-center justify-center p-4">
            <div
              class="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-scale-up"
              @click.stop
            >
              <!-- Header -->
              <div class="bg-gradient-to-r from-amber-500 to-rose-500 p-6 relative">
                <button 
                  @click="showVendorReviewsModal = false"
                  class="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
                >
                  <XIcon class="h-6 w-6" />
                </button>
                <h2 class="text-2xl font-bold text-white flex items-center">
                  <MessageCircleIcon class="h-6 w-6 mr-2" />
                  Customer Reviews
                </h2>
                <p class="text-white/80 mt-1">See what others are saying about {{ vendor?.restaurantName }}</p>
                
                <!-- Rating summary -->
                <div class="mt-4 flex flex-wrap items-center gap-4">
                  <div class="bg-white/20 rounded-lg px-4 py-3 flex items-center">
                    <div class="text-3xl font-bold text-white">{{ getAverageRating().toFixed(1) }}</div>
                    <div class="ml-2">
                      <div class="flex">
                        <StarIcon 
                          v-for="i in 5" 
                          :key="i"
                          class="h-4 w-4" 
                          :class="getAverageRating() >= i ? 'text-yellow-300 fill-current' : 'text-white/30'"
                        />
                      </div>
                      <div class="text-xs text-white mt-1">{{ reviews?.length || 0 }} reviews</div>
                    </div>
                  </div>
                  
                  <!-- Rating distribution -->
                  <div class="flex-1 max-w-xs">
                    <div v-for="i in 5" :key="i" class="flex items-center mb-1">
                      <span class="text-xs text-white w-6">{{ 6-i }}</span>
                      <div class="flex-1 mx-2 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-yellow-300 rounded-full"
                          :style="{ width: `${getRatingPercentage(6-i)}%` }"
                        ></div>
                      </div>
                      <span class="text-xs text-white w-8">{{ getRatingCount(6-i) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Reviews list -->
              <div class="p-6">
                <!-- Filter options -->
                <div class="mb-6 flex flex-wrap gap-2">
                  <button 
                    @click="filterRating = 0"
                    class="px-3 py-1 rounded-full text-sm transition-all"
                    :class="filterRating === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    All Reviews
                  </button>
                  <button 
                    v-for="i in 5" 
                    :key="i"
                    @click="filterRating = i"
                    class="px-3 py-1 rounded-full text-sm transition-all flex items-center"
                    :class="filterRating === i ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    {{ i }} <StarIcon class="h-3 w-3 ml-1" :class="filterRating === i ? 'text-yellow-500 fill-current' : ''" />
                  </button>
                </div>
                
                <div v-if="fetchingReviews" class="flex justify-center items-center py-12">
                  <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
                
                <div v-else-if="!filteredReviews || filteredReviews.length === 0" class="text-center py-12">
                  <MessageCircleIcon class="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 class="text-xl font-medium text-gray-700">
                    {{ reviews && reviews.length > 0 ? 'No reviews match your filter' : 'No Reviews Yet' }}
                  </h3>
                  <p class="text-gray-500 mt-2">
                    {{ reviews && reviews.length > 0 ? 'Try selecting a different rating filter' : 'Be the first to leave a review!' }}
                  </p>
                  <button
                    @click="openNewReviewFromModal"
                    class="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <StarIcon class="h-5 w-5 inline-block mr-2" />
                    Write a Review
                  </button>
                </div>
                
                <div v-else class="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div 
                    v-for="(review, index) in filteredReviews" 
                    :key="review._id"
                    class="border border-gray-100 rounded-lg p-4 hover:border-amber-200 transition-all duration-300 animate-fade-in"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold">
                          {{ review.customerName?.charAt(0) || 'A' }}
                        </div>
                        <div class="ml-3">
                          <h4 class="font-medium text-gray-800">{{ review.customerName || 'Anonymous' }}</h4>
                          <div class="flex items-center mt-1">
                            <div class="flex">
                              <StarIcon 
                                v-for="star in 5" 
                                :key="star"
                                class="h-4 w-4" 
                                :class="star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                              />
                            </div>
                            <span class="text-xs text-gray-500 ml-2">
                              {{ formatDate(review.createdAt) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mt-3 text-gray-700">
                      {{ review.message }}
                    </div>
                    
                    <div v-if="review.vendorReply" class="mt-3 bg-gray-50 p-3 rounded-md border-l-4 border-amber-400">
                      <p class="text-xs font-medium text-amber-700 mb-1">Response from vendor:</p>
                      <p class="text-sm text-gray-700">{{ review.vendorReply }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Confirm Empty Cart Modal -->
    <Teleport to="body">
      <div
        v-if="showConfirmEmptyCartModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        @click="showConfirmEmptyCartModal = false"
      >
        <div
          class="bg-white rounded-md shadow-xl w-full max-w-md animate-fade-in-up"
          @click.stop
        >
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              Empty Your Cart?
            </h2>
            <p class="text-gray-600 mb-6">
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </p>

            <div class="flex justify-end gap-3">
              <button
                @click="showConfirmEmptyCartModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                @click="emptyCart"
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-300"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCart } from "~/composables/useCart";
import { useToast } from "~/composables/useToast";
import { useFetchVendor } from "~/composables/modules/vendor/useFetchVendor";
import { useFetchVendorBySlug } from '@/composables/modules/vendor/useFetchVendorBySlug';
import { useFetchVendorById } from "@/composables/modules/vendor/useFetchVendorById";
import { useFetchVendorMenu } from "@/composables/modules/menu/useFetchVendorMenu";
import { useCreateReview } from "@/composables/modules/reviews/useCreateReviews";
import { useFetchVendorsReviews } from "@/composables/modules/reviews/useFetchReviews";
import { useCustomToast } from "@/composables/core/useCustomToast";
import {
StarIcon,
MapPinIcon,
PhoneIcon,
ClockIcon,
ChevronDownIcon,
UtensilsIcon,
SearchIcon,
SearchXIcon,
ShoppingBagIcon,
ShoppingCartIcon,
PlusIcon,
MinusIcon,
TrashIcon,
XIcon,
MessageCircleIcon,
PencilIcon,
SendIcon,
LockIcon,
CopyIcon,
AlertCircleIcon,
CheckIcon,
ClipboardEditIcon,
CoffeeIcon,
CakeIcon,
SaladIcon
} from "lucide-vue-next";

// Router
const router = useRouter();
const route = useRoute();

// Composables
const cart = useCart();
const { showToast } = useCustomToast();
const { vendor, loading } = useFetchVendorBySlug();
const { menus, loading: fetchingMenu, fetchVendorMenu } = useFetchVendorMenu();
const { reviews, loading: fetchingReviews, fetchVendorReviews } = useFetchVendorsReviews();
const { createReview, loading: creatingReview } = useCreateReview();

// UI State
const searchQuery = ref("");
const showHours = ref(false);
const showReviewModal = ref(false);
const showVendorReviewsModal = ref(false);
const showConfirmEmptyCartModal = ref(false);
const showDuplicatePackModal = ref(false);
const showPackNoteModal = ref(false);
const scrollY = ref(0);
const activePackIndex = ref(0);
const isNewPackActive = ref(false);
const isDuplicatedPackActive = ref(false);
const packFee = ref(0);
const packLimit = ref(10);
const packToDuplicateIndex = ref(0);
const packNoteIndex = ref(0);
const packNote = ref("");
const reviewRating = ref(5);
const reviewText = ref("");
const customerName = ref("");
const reviewError = ref("");
const hoverRating = ref(0);
const filterRating = ref(0);
const serviceCharge = ref(30);

// Page loading state
const isPageLoading = ref(true);

// Computed properties
const filteredMeals = computed(() => {
if (!menus.value || menus.value.length === 0) return [];

if (!searchQuery.value)
  return menus.value.filter((meal) => !meal.isDeleted && meal.isEnabled);

const query = searchQuery.value.toLowerCase();
return menus.value.filter(
  (meal) =>
    !meal.isDeleted &&
    meal.isEnabled &&
    meal.name.toLowerCase().includes(query)
);
});

const filteredReviews = computed(() => {
const reviewsToUse = reviews?.value || vendor?.value?.reviews || [];
if (filterRating.value === 0) return reviewsToUse;
return reviewsToUse.filter(review => review.rating === filterRating.value);
});

// Methods
const formatPrice = (price: number): string => {
return price.toLocaleString();
};

const formatDate = (dateString?: string): string => {
if (!dateString) return "";
const date = new Date(dateString);
return new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
}).format(date);
};

const isToday = (day: string): boolean => {
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[new Date().getDay()];
return day === today;
};

// Calculate total including pack fees
const calculateTotal = (): number => {
const subtotal = cart.subtotal.value;
const packFees = packFee.value * cart.packs.value.length;

return subtotal + packFees + serviceCharge.value;
};

// Get average rating from all reviews
const getAverageRating = (): number => {
if (!reviews?.value || reviews.value.length === 0) return 0;

const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
return sum / reviews.value.length;
};

// Get count of reviews with specific rating
const getRatingCount = (rating: number): number => {
if (!reviews?.value) return 0;
return reviews.value.filter(review => review.rating === rating).length;
};

// Get percentage of reviews with specific rating
const getRatingPercentage = (rating: number): number => {
if (!reviews?.value || reviews.value.length === 0) return 0;
return (getRatingCount(rating) / reviews.value.length) * 100;
};

// Get text description for rating
const getRatingText = (rating: number): string => {
switch (rating) {
  case 1: return "Poor";
  case 2: return "Fair";
  case 3: return "Good";
  case 4: return "Very Good";
  case 5: return "Excellent";
  default: return "";
}
};

// Cart methods
const getMealQuantityInActivePack = (mealId: string): number => {
// Ensure there's at least one pack
if (cart.packs.value.length === 0) {
  return 0;
}

// Find the meal in the active pack
const activePack = cart.packs.value[activePackIndex.value];
const mealItem = activePack.items.find(item => item.mealId === mealId);

return mealItem ? mealItem.quantity : 0;
};

const addMealToActivePack = (meal: any): void => {
// Ensure there's at least one pack
if (cart.packs.value.length === 0) {
  cart.addNewPack();
  activePackIndex.value = 0;
}

// Add to the active pack
const success = cart.addItemToPack(
  activePackIndex.value,
  {
    mealId: meal._id,
    name: meal.name,
    price: meal.price,
    image: meal.image,
  },
  1 // Default quantity is 1
);

if (success) {
  showToast({
    title: "Success",
    message: `Added ${meal.name} to Pack ${activePackIndex.value + 1}`,
    toastType: "success",
    duration: 3000,
  });
} else {
  showToast({
    title: "Error",
    message: "Failed to add item to pack",
    toastType: "error",
    duration: 3000,
  });
}
};

const incrementMealInActivePack = (meal: any): void => {
// Find the meal in the active pack
if (cart.packs.value.length === 0) {
  addMealToActivePack(meal);
  return;
}

const activePack = cart.packs.value[activePackIndex.value];
const itemIndex = activePack.items.findIndex(item => item.mealId === meal._id);

if (itemIndex !== -1) {
  cart.incrementItemQuantity(activePackIndex.value, itemIndex);
} else {
  addMealToActivePack(meal);
}
};

const decrementMealInActivePack = (meal: any): void => {
// Find the meal in the active pack
if (cart.packs.value.length === 0) {
  return;
}

const activePack = cart.packs.value[activePackIndex.value];
const itemIndex = activePack.items.findIndex(item => item.mealId === meal._id);

if (itemIndex !== -1) {
  cart.decrementItemQuantity(activePackIndex.value, itemIndex);
}
};

const setActivePackIndex = (index: number): void => {
activePackIndex.value = index;
isNewPackActive.value = false;
isDuplicatedPackActive.value = false;

showToast({
  title: "Pack Selected",
  message: `Pack ${index + 1} is now active`,
  toastType: "success",
  duration: 2000,
});
};

const addNewPack = () => {
// Check if we've reached the pack limit
if (cart.packs.value.length >= packLimit) {
  showToast({
    title: "Pack Limit Reached",
    message: `This vendor has a maximum limit of ${packLimit} packs per order`,
    toastType: "warning",
    duration: 3000,
  });
  return;
}

const success = cart.addNewPack();
if (success) {
  // Set the new pack as active
  activePackIndex.value = cart.packs.value.length - 1;
  isNewPackActive.value = true;
  isDuplicatedPackActive.value = false;
  
  showToast({
    title: "Success",
    message: "New pack added and set as active",
    toastType: "success",
    duration: 3000,
  });
}
};

const openDuplicatePackModal = () => {
if (cart.packs.value.length === 0) {
  showToast({
    title: "Warning",
    message: "No packs to duplicate",
    toastType: "warning",
    duration: 3000,
  });
  return;
}

// Check if we've reached the pack limit
if (cart.packs.value.length >= packLimit) {
  showToast({
    title: "Pack Limit Reached",
    message: `This vendor has a maximum limit of ${packLimit} packs per order`,
    toastType: "warning",
    duration: 3000,
  });
  showDuplicatePackModal.value = true;
  return;
}

if (cart.packs.value.length === 1) {
  // If there's only one pack, duplicate it directly
  duplicatePack(0);
  return;
}

packToDuplicateIndex.value = activePackIndex.value; // Default to active pack
showDuplicatePackModal.value = true;
};

const closeDuplicatePackModal = () => {
showDuplicatePackModal.value = false;
};

const duplicateSelectedPack = () => {
// Check if we've reached the pack limit
if (cart.packs.value.length >= packLimit) {
  showToast({
    title: "Pack Limit Reached",
    message: `This vendor has a maximum limit of ${packLimit} packs per order`,
    toastType: "warning",
    duration: 3000,
  });
  return;
}

duplicatePack(packToDuplicateIndex.value);
closeDuplicatePackModal();
};

const duplicatePack = (index: number) => {
// Check if we've reached the pack limit
if (cart.packs.value.length >= packLimit) {
  showToast({
    title: "Pack Limit Reached",
    message: `This vendor has a maximum limit of ${packLimit} packs per order`,
    toastType: "warning",
    duration: 3000,
  });
  return;
}

if (cart.packs.value.length > 0) {
  const success = cart.duplicatePack(index);
  if (success) {
    // Set the duplicated pack as active
    activePackIndex.value = cart.packs.value.length - 1;
    isDuplicatedPackActive.value = true;
    isNewPackActive.value = false;
    
    showToast({
      title: "Success",
      message: `Pack ${index + 1} duplicated and set as active`,
      toastType: "success",
      duration: 3000,
    });
  }
}
};

const removePack = (index: number) => {
// If removing the active pack, set active to the first pack
if (index === activePackIndex.value) {
  activePackIndex.value = 0;
} 
// If removing a pack before the active pack, adjust the active index
else if (index < activePackIndex.value) {
  activePackIndex.value--;
}

const success = cart.removePack(index);
if (success) {
  showToast({
    title: "Success",
    message: `Pack removed`,
    toastType: "success",
    duration: 3000,
  });
}
};

const incrementItemQuantity = (packIndex: number, itemIndex: number) => {
cart.incrementItemQuantity(packIndex, itemIndex);
};

const decrementItemQuantity = (packIndex: number, itemIndex: number) => {
cart.decrementItemQuantity(packIndex, itemIndex);
};

const openPackNoteModal = (index: number) => {
packNoteIndex.value = index;
packNote.value = cart.packs.value[index].note;
showPackNoteModal.value = true;
};

const closePackNoteModal = () => {
showPackNoteModal.value = false;
};

const savePackNote = () => {
const success = cart.updatePackNote(packNoteIndex.value, packNote.value);
if (success) {
  showToast({
    title: "Success",
    message: "Note saved successfully",
    toastType: "success",
    duration: 3000,
  });
  closePackNoteModal();
}
};

const confirmEmptyCart = () => {
if (cart.totalItems.value > 0) {
  showConfirmEmptyCartModal.value = true;
}
};

const emptyCart = () => {
const success = cart.clearCart();
if (success) {
  showToast({
    title: "Success",
    message: "Cart emptied successfully",
    toastType: "info",
    duration: 3000,
  });
  showConfirmEmptyCartModal.value = false;
  activePackIndex.value = 0;
  isNewPackActive.value = false;
  isDuplicatedPackActive.value = false;
}
};

const proceedToCheckout = () => {
if (cart.totalItems.value > 0) {
  // Navigate to checkout page
  router.push(`/${route.params.id}/checkout`);
} else {
  showToast({
    title: "Warning",
    message: "Your cart is empty",
    toastType: "warning",
    duration: 3000,
  });
}
};

const closeReviewModal = () => {
showReviewModal.value = false;
reviewRating.value = 5;
reviewText.value = "";
customerName.value = "";
reviewError.value = "";
hoverRating.value = 0;
};

const openNewReviewFromModal = () => {
showVendorReviewsModal.value = false;
setTimeout(() => {
  showReviewModal.value = true;
}, 300);
};

const submitReview = async () => {
// Reset error
reviewError.value = "";

// Validate review text
if (!reviewText.value.trim()) {
  reviewError.value = "Please enter your review";
  return;
}

try {
  const payloadObj = {
    rating: reviewRating.value,
    message: reviewText.value.trim(),
    customerName: customerName.value.trim() || undefined
  }
  // Call the createReview method from the composable
  await createReview(payloadObj, vendor.value?._id);

  showToast({
    title: "Review Submitted",
    message: "Thank you for sharing your experience!",
    toastType: "success",
    duration: 3000,
  });
  
  // Refresh reviews list
  await fetchVendorReviews(vendor.value?._id);
  
  closeReviewModal();
} catch (error) {
  console.error("Error submitting review:", error);
  showToast({
    title: "Error",
    message: "Failed to submit review. Please try again.",
    toastType: "error",
    duration: 3000,
  });
}
};

const handleClosedStoreClick = () => {
// Do nothing, prevent closing the overlay when clicking on it
};

const redirectToHome = () => {
router.push('/');
};

// Initialize pack settings from vendor object
const initializePackSettings = () => {
if (vendor.value && vendor.value.packSettings) {
  // Set pack fee from vendor's packSettings
  packFee.value = vendor.value.packSettings.price || 0;
  
  // Set pack limit from vendor's packSettings
  packLimit.value = vendor.value.packSettings.limit || 10;
}
};

// Lifecycle
onMounted(() => {
// Initialize cart from localStorage
cart.initCart();

// If cart is empty, create the first pack
if (cart.packs.value.length === 0) {
  cart.addNewPack();
}

// Setup scroll listener for parallax effect
window.addEventListener('scroll', () => {
  scrollY.value = window.scrollY;
});

// Initialize pack settings from vendor object
initializePackSettings();

// Simulate loading time for the loader to be visible
setTimeout(() => {
  isPageLoading.value = false;
}, 2000);
});

// Watch for changes in the vendor object to update pack settings
watch(
() => vendor.value,
(newVendor) => {
  if (newVendor) {
    initializePackSettings();
    
    // Fetch vendor menu and reviews
    fetchVendorMenu(newVendor._id);
    fetchVendorReviews(newVendor._id);
  }
},
{ immediate: true, deep: true }
);

// Watch for changes in the route params
watch(
() => route.params.id,
(newVendorId) => {
  if (newVendorId) {
    // Fetch vendor reviews when vendor ID changes
    fetchVendorReviews(newVendorId as string);
  }
},
{ immediate: true }
);

// Watch for changes in the active pack index
watch(
() => activePackIndex.value,
() => {
  // Reset the flags when active pack changes
  isNewPackActive.value = false;
  isDuplicatedPackActive.value = false;
}
);

// Watch for vendor reviews modal opening to fetch fresh reviews
watch(
() => showVendorReviewsModal.value,
(isOpen) => {
  if (isOpen && vendor.value) {
    fetchVendorReviews(vendor.value._id);
  }
}
);

// Watch for store open/closed status
watch(
() => vendor.value?.isStoreOpen,
(isOpen) => {
  if (isOpen === false) {
    // Store is closed, show the overlay
    document.body.style.overflow = 'hidden';
  } else {
    // Store is open, allow scrolling
    document.body.style.overflow = '';
  }
},
{ immediate: true }
);

// Watch for loading states to update page loader
watch(
[() => loading.value, () => fetchingMenu.value, () => cart.loading.value],
([isVendorLoading, isMenuLoading, isCartLoading]) => {
  // Hide loader when all data is loaded
  if (!isVendorLoading && !isMenuLoading && !isCartLoading) {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      isPageLoading.value = false;
    }, 500);
  }
}
);
</script>

<style scoped>
/* Animations */
.animate-float {
animation: float 6s ease-in-out infinite;
}

.animate-float-staggered {
animation: float 3s ease-in-out infinite;
}

.animate-bounce-slow {
animation: bounce 3s ease-in-out infinite;
}

.animate-fade-in {
animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-up {
animation: fadeInUp 0.3s ease-out;
}

.animate-scale-up {
animation: scaleUp 0.4s ease-out forwards;
}

.animate-pulse-once {
animation: pulseOnce 0.3s ease-out;
}

.animate-shake {
animation: shake 0.5s ease-in-out;
}

.animate-spin-slow {
animation: spin 8s linear infinite;
}

.animate-progress {
animation: progress 2s ease-in-out infinite;
}

@keyframes float {
0%, 100% {
  transform: translateY(0);
}
50% {
  transform: translateY(-15px);
}
}

@keyframes bounce {
0%, 100% {
  transform: translateY(0);
}
50% {
  transform: translateY(-15px);
}
}

@keyframes fadeIn {
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}

@keyframes fadeInUp {
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}

@keyframes scaleUp {
from {
  transform: scale(0.95);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}
}

@keyframes pulseOnce {
0% {
  transform: scale(1);
}
50% {
  transform: scale(1.2);
}
100% {
  transform: scale(1);
}
}

@keyframes shake {
0%, 100% { transform: translateX(0); }
10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes spin {
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
}

@keyframes progress {
0% {
  width: 0%;
}
50% {
  width: 70%;
}
100% {
  width: 100%;
}
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
transition: opacity 0.3s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
transition: all 0.3s ease-out;
max-height: 300px;
overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
max-height: 0;
opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
transition: opacity 0.3s, transform 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
opacity: 0;
transform: translateY(-20px);
}

.slide-fade-enter-active {
transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
transform: translateY(20px);
opacity: 0;
}

/* Custom scrollbar */
.custom-scrollbar {
scrollbar-width: thin;
scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
background-color: rgba(156, 163, 175, 0.5);
border-radius: 20px;
}

.transform.hover\:scale-98:hover {
transform: scale(0.98);
}
</style>