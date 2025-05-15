<template>
    <Modal 
      :model-value="modelValue" 
      @update:model-value="$emit('update:modelValue', $event)"
      title="Order Details"
      :show-default-footer="false"
    >
      <div v-if="order" class="space-y-6">
        <!-- Order ID and Status -->
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-sm text-gray-500 dark:text-gray-400">Order ID</h3>
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ order.id }}</p>
          </div>
          <div>
            <span 
              class="px-3 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': order.status === 'Completed',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': order.status === 'Processing',
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': order.status === 'Pending',
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': order.status === 'Cancelled'
              }"
            >
              {{ order.status }}
            </span>
          </div>
        </div>
        
        <!-- Order Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm text-gray-500 dark:text-gray-400">Date</h3>
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ order.date }}</p>
          </div>
          <div>
            <h3 class="text-sm text-gray-500 dark:text-gray-400">Time</h3>
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ order.time }}</p>
          </div>
          <div>
            <h3 class="text-sm text-gray-500 dark:text-gray-400">Customer</h3>
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ order.customer.name }}</p>
          </div>
          <div>
            <h3 class="text-sm text-gray-500 dark:text-gray-400">Phone</h3>
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ order.customer.phone }}</p>
          </div>
        </div>
        
        <!-- Delivery Info -->
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-start">
            <MapPin class="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <div>
              <h3 class="font-medium text-gray-800 dark:text-gray-200">Delivery Information</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">{{ order.delivery.address }}</p>
              <div class="flex items-center mt-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">Delivery Fee:</span>
                <span class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">₦{{ order.delivery.fee }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Items -->
        <div>
          <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">Order Items</h3>
          <div class="space-y-3">
            <div 
              v-for="(item, index) in order.items" 
              :key="index"
              class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center">
                <img :src="item.image" alt="Item" class="h-10 w-10 rounded-md object-cover mr-3" />
                <div>
                  <p class="font-medium text-gray-800 dark:text-gray-200">{{ item.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">₦{{ item.price }} x {{ item.quantity }}</p>
                </div>
              </div>
              <p class="font-medium text-gray-800 dark:text-gray-200">₦{{ item.price * item.quantity }}</p>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">₦{{ order.summary.subtotal }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600 dark:text-gray-400">Delivery Fee</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">₦{{ order.summary.deliveryFee }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600 dark:text-gray-400">Service Charge</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">₦{{ order.summary.serviceCharge }}</span>
          </div>
          <div class="flex justify-between font-medium text-lg mt-4">
            <span class="text-gray-800 dark:text-gray-200">Total</span>
            <span class="text-gray-800 dark:text-gray-200">₦{{ order.summary.total }}</span>
          </div>
        </div>
        
        <!-- Payment Info -->
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-start">
            <CreditCard class="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <div>
              <h3 class="font-medium text-gray-800 dark:text-gray-200">Payment Information</h3>
              <div class="flex items-center mt-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">Payment Method:</span>
                <span class="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">{{ order.payment.method }}</span>
              </div>
              <div class="flex items-center mt-1">
                <span class="text-sm text-gray-500 dark:text-gray-400">Payment Status:</span>
                <span 
                  class="ml-2 text-xs px-2 py-0.5 rounded-full"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': order.payment.status === 'Paid',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': order.payment.status === 'Pending',
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': order.payment.status === 'Failed'
                  }"
                >
                  {{ order.payment.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            v-if="order.status === 'Pending'"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Reject Order
          </button>
          <button 
            v-if="order.status === 'Pending'"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Accept Order
          </button>
          <button 
            v-if="order.status === 'Processing'"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Mark as Delivered
          </button>
          <button 
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { MapPin, CreditCard } from 'lucide-vue-next'
  
  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      default: null
    }
  })
  
  defineEmits(['update:modelValue', 'accept', 'reject', 'deliver'])
  </script>