<template>
  <div class="max-w-7xl mx-auto">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Delivery's Dashboard</h1>
      <div class="bg-orange-100 rounded-full px-4 py-2 flex items-center space-x-4">
        <label class="flex items-center">
          <input
            type="radio"
            name="tracking-mode"
            :checked="trackingMode === 'manual'"
            @change="setTrackingMode('manual')"
            class="mr-2 h-5 w-5 text-blue-600"
          />
          <span>Manual</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            name="tracking-mode"
            :checked="trackingMode === 'automatic'"
            @change="setTrackingMode('automatic')"
            class="mr-2 h-5 w-5 text-blue-600"
          />
          <span>Automatic</span>
        </label>
      </div>
    </header>

    <Transition name="fade" mode="out-in">
      <div v-if="trackingMode === 'manual'" key="manual" class="bg-orange-100 p-4 rounded-lg mb-6 text-orange-800">
        <p>You are currently running on a manual tracking mode which requires that your you merge an order with a rider when the payment is confirmed.</p>
      </div>
      <div v-else key="automatic" class="bg-orange-100 p-4 rounded-lg mb-6 text-orange-800">
        <p>You are currently running on an automatic tracking which requires that your delivery process needs to be completed within {{ deliveryTime }} Minutes.</p>
      </div>
    </Transition>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg text-gray-600">Pending Delivery</h3>
          <p class="text-4xl font-semibold">{{ pendingDeliveries }}</p>
        </div>
        <div class="bg-orange-500 p-3 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg text-gray-600">Completed Delivery</h3>
          <p class="text-4xl font-semibold">{{ completedDeliveries }}</p>
        </div>
        <div class="bg-orange-500 p-3 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        <Transition name="slide" mode="out-in">
          <div v-if="trackingMode === 'manual'" key="riders" class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Available Riders</h2>
              <button @click="showAddRiderModal = true" class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                Add Rider
              </button>
            </div>

            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="py-3 text-left text-sm font-semibold text-gray-500">#</th>
                  <th class="py-3 text-left text-sm font-semibold text-gray-500">Rider Name</th>
                  <th class="py-3 text-left text-sm font-semibold text-gray-500">Count</th>
                  <th class="py-3 text-left text-sm font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="riders.length === 0">
                  <td colspan="4" class="py-4 text-sm text-gray-500">No data available in table</td>
                </tr>
                <tr v-for="rider in riders" :key="rider.id" class="text-sm">
                  <td class="py-3">{{ rider.id }}</td>
                  <td class="py-3">{{ rider.name }}</td>
                  <td class="py-3">{{ rider.count }}</td>
                  <td class="py-3">
                    <button class="text-blue-500 hover:text-blue-700">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>Showing {{ riders.length > 0 ? '1' : '0' }} to {{ riders.length }} of {{ riders.length }} entries</p>
              <div class="flex space-x-2">
                <button class="px-3 py-1 border rounded-md hover:bg-gray-100">Previous</button>
                <button class="px-3 py-1 border rounded-md hover:bg-gray-100">Next</button>
              </div>
            </div>
            <button @click="showClearModal = true" class="mt-4 w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
              Clear Rider's Record
            </button>
            <div class="mt-10">
              <p class="text-gray-600">Total Delivery : {{ riders.reduce((acc, rider) => acc + rider.count, 0) }}</p>
              <p class="text-gray-600 mt-2">Total Amount : NGN {{ totalAmount.toLocaleString() }}</p>
            </div>
          </div>
          <div v-else key="delivery-time" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Delivery Time</h2>
            <p class="text-gray-600 mb-4">Time taken for delivery process to be completed after payment confirmation.</p>
            <div class="flex items-center">
              <input 
                v-model="deliveryTime" 
                type="number" 
                class="border rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button 
                @click="updateDeliveryTime" 
                class="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </Transition>
      </div>
      
      <div class="md:col-span-2">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Deliveries</h2>
            <Transition name="fade" mode="out-in">
              <button 
                v-if="trackingMode === 'manual'"
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Merge Orders
              </button>
            </Transition>
          </div>

          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">#</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Delivery Address</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Rider Name</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Status</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Delivery Price</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Request Time</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Pick Up Time</th>
                <th class="py-3 text-left text-sm font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="deliveries.length === 0">
                <td colspan="8" class="py-4 text-sm text-gray-500">No data available in table</td>
              </tr>
              <tr v-for="delivery in deliveries" :key="delivery.id" class="text-sm">
                <td class="py-3">{{ delivery.id }}</td>
                <td class="py-3">{{ delivery.address }}</td>
                <td class="py-3">{{ delivery.riderName }}</td>
                <td class="py-3">
                  <span 
                    :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-yellow-100 text-yellow-800': delivery.status === 'Pending',
                      'bg-green-100 text-green-800': delivery.status === 'Completed',
                      'bg-blue-100 text-blue-800': delivery.status === 'In Transit'
                    }"
                  >
                    {{ delivery.status }}
                  </span>
                </td>
                <td class="py-3">{{ delivery.price }}</td>
                <td class="py-3">{{ delivery.requestTime }}</td>
                <td class="py-3">{{ delivery.pickupTime }}</td>
                <td class="py-3">
                  <button class="text-blue-500 hover:text-blue-700">View</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
            <p>Showing {{ deliveries.length > 0 ? '1' : '0' }} to {{ deliveries.length }} of {{ deliveries.length }} entries</p>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border rounded-md hover:bg-gray-100">Previous</button>
              <button class="px-3 py-1 border rounded-md hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Rider Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddRiderModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-black bg-opacity-50" @click="showAddRiderModal = false"></div>
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10 relative">
            <button @click="showAddRiderModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-2xl font-semibold text-center mb-6">Add Rider</h2>
            <form @submit.prevent="addRider">
              <div class="mb-4">
                <label class="block text-gray-600 mb-2">Rider's Name</label>
                <input 
                  v-model="newRider.name" 
                  type="text" 
                  placeholder="Name of rider"
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-600 mb-2">Rider's Number</label>
                <input 
                  v-model="newRider.phone" 
                  type="text" 
                  placeholder="Rider's phone number"
                  class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div class="flex justify-center space-x-4">
                <button 
                  type="button"
                  @click="showAddRiderModal = false"
                  class="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  class="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Clear Riders Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showClearModal" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-black bg-opacity-50" @click="showClearModal = false"></div>
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10 relative">
            <div class="flex flex-col items-center text-center">
              <div class="bg-orange-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 class="text-2xl font-semibold mb-2">Are you sure you want to clear the rider's record</h2>
              <p class="text-gray-600 mb-6">Clearing will result to lost of all riders records!</p>
              <div class="flex space-x-4 w-full">
                <button 
                  @click="clearRidersRecord"
                  class="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Yes!
                </button>
                <button 
                  @click="showClearModal = false"
                  class="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type TrackingMode = 'manual' | 'automatic';
type Rider = {
  id: number;
  name: string;
  count: number;
};
type Delivery = {
  id: number;
  address: string;
  riderName: string;
  status: string;
  price: number;
  requestTime: string;
  pickupTime: string;
};

const { $dummyRiders, $dummyDeliveries } = useNuxtApp();

const trackingMode = ref<TrackingMode>('manual');
const deliveryTime = ref(30);
const pendingDeliveries = ref(0);
const completedDeliveries = ref(0);
const riders = ref<Rider[]>([]);
const deliveries = ref<Delivery[]>([]);
const totalAmount = ref(0);
const showAddRiderModal = ref(false);
const showClearModal = ref(false);
const newRider = ref({
  name: '',
  phone: '',
});

onMounted(() => {
  // Initialize with dummy data or empty arrays
  riders.value = $dummyRiders || [];
  deliveries.value = $dummyDeliveries || [];
  
  // Calculate stats
  pendingDeliveries.value = deliveries.value.filter(d => d.status === 'Pending').length;
  completedDeliveries.value = deliveries.value.filter(d => d.status === 'Completed').length;
  totalAmount.value = deliveries.value.reduce((acc, del) => acc + del.price, 0);
});

const setTrackingMode = (mode: TrackingMode) => {
  trackingMode.value = mode;
};

const updateDeliveryTime = () => {
  // In a real app, you would send this update to your backend
  alert(`Delivery time updated to ${deliveryTime.value} minutes`);
};

const addRider = () => {
  const newId = riders.value.length > 0 ? Math.max(...riders.value.map(r => r.id)) + 1 : 1;
  
  riders.value.push({
    id: newId,
    name: newRider.value.name,
    count: 0
  });
  
  // Reset form
  newRider.value = {
    name: '',
    phone: ''
  };
  
  showAddRiderModal.value = false;
};

const clearRidersRecord = () => {
  riders.value = [];
  showClearModal.value = false;
  
  // In a real app, you would send this to your backend
  alert('All rider records have been cleared');
};
</script>