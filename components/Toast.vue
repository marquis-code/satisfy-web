<template>
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed bottom-0 right-0 mb-4 mr-4 bg-red-500 w-full  shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="icon" class="h-6 w-6" :class="iconClass" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ message }}</p>
              <p v-if="description" class="mt-1 text-sm text-gray-500">{{ description }}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button @click="$emit('update:modelValue', false)" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <span class="sr-only">Close</span>
                <X class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-vue-next'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success',
      validator: (value: string) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    }
  })
  
  defineEmits(['update:modelValue'])
  
  const icon = computed(() => {
    switch (props.type) {
      case 'success': return CheckCircle
      case 'error': return XCircle
      case 'warning': return AlertCircle
      case 'info': return AlertCircle
      default: return CheckCircle
    }
  })
  
  const iconClass = computed(() => {
    switch (props.type) {
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      case 'info': return 'text-blue-400'
      default: return 'text-green-400'
    }
  })
  </script>