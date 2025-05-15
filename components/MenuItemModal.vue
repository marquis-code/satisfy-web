<template>
    <Modal 
      :model-value="modelValue" 
      @update:model-value="$emit('update:modelValue', $event)"
      :title="menuItem.id ? 'Edit Menu Item' : 'Add Menu Item'"
      :show-default-footer="false"
    >
      <form @submit.prevent="saveMenuItem" class="space-y-4">
        <div class="flex justify-center mb-4">
          <div class="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img 
              v-if="imagePreview" 
              :src="imagePreview" 
              alt="Menu Item" 
              class="w-full h-full object-cover"
            />
            <div v-else class="flex items-center justify-center h-full text-gray-400">
              <ImageIcon class="h-12 w-12" />
            </div>
            
            <input 
              type="file" 
              ref="fileInput" 
              accept="image/*" 
              class="hidden" 
              @change="handleImageChange"
            />
            
            <button 
              type="button"
              @click="$refs.fileInput.click()"
              class="absolute bottom-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload class="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name</label>
          <input 
            type="text" 
            v-model="menuItem.name"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter item name"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₦)</label>
          <input 
            type="number" 
            v-model="menuItem.price"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter price"
            min="0"
            step="50"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select 
            v-model="menuItem.category"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
          <textarea 
            v-model="menuItem.description"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter item description"
            rows="3"
          ></textarea>
        </div>
        
        <div class="flex items-center">
          <label class="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="menuItem.available"
              class="sr-only"
            />
            <div class="relative w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300" :class="{ 'bg-orange-500': menuItem.available }">
              <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300" :class="{ 'transform translate-x-5': menuItem.available }"></div>
            </div>
            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Available</span>
          </label>
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
            {{ menuItem.id ? 'Update' : 'Add' }} Item
          </button>
        </div>
      </form>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Image as ImageIcon, Upload } from 'lucide-vue-next'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    editMenuItem: {
      type: Object,
      default: null
    },
    categories: {
      type: Array,
      default: () => []
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'save'])
  const fileInput = ref(null)
  const imagePreview = ref('')
  
  const menuItem = ref({
    id: '',
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    available: true
  })
  
  // Watch for changes in editMenuItem prop
  watch(() => props.editMenuItem, (newValue) => {
    if (newValue) {
      menuItem.value = { ...newValue }
      imagePreview.value = newValue.image
    } else {
      resetForm()
    }
  }, { immediate: true })
  
  const resetForm = () => {
    menuItem.value = {
      id: '',
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      available: true
    }
    imagePreview.value = ''
  }
  
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
        menuItem.value.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const saveMenuItem = () => {
    emit('save', { ...menuItem.value })
    emit('update:modelValue', false)
    resetForm()
  }
  </script>