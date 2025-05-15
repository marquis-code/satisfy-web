<template>
    <Modal 
      :model-value="modelValue" 
      @update:model-value="$emit('update:modelValue', $event)"
      :title="category.id ? 'Edit Category' : 'Add Category'"
      :show-default-footer="false"
    >
      <form @submit.prevent="saveCategory" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
          <input 
            type="text" 
            v-model="category.name"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter category name"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
          <textarea 
            v-model="category.description"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter category description"
            rows="3"
          ></textarea>
        </div>
        
        <div class="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            type="button"
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors transform hover:scale-105 duration-200"
          >
            {{ category.id ? 'Update' : 'Add' }} Category
          </button>
        </div>
      </form>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    editCategory: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'save'])
  
  const category = ref({
    id: '',
    name: '',
    description: '',
    menuCount: 0
  })
  
  // Watch for changes in editCategory prop
  watch(() => props.editCategory, (newValue) => {
    if (newValue) {
      category.value = { ...newValue }
    } else {
      resetForm()
    }
  }, { immediate: true })
  
  const resetForm = () => {
    category.value = {
      id: '',
      name: '',
      description: '',
      menuCount: 0
    }
  }
  
  const saveCategory = () => {
    emit('save', { ...category.value })
    emit('update:modelValue', false)
    resetForm()
  }
  </script>