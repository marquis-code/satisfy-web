<template>
    <div class="relative w-full" ref="dropdownRef">
      <button @click="toggleDropdown" class="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left cursor-pointer flex justify-between items-center">
        <span>{{ selectedOption.label }}</span>
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
  
      <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
        <ul class="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          <li v-for="(option, index) in items" :key="index" @click="selectOption(option)" 
            :class="['cursor-pointer select-none relative py-2 pl-10 pr-4', option.code === selectedOption.code ? 'text-indigo-600 font-semibold' : 'text-gray-900']">
            <span :class="['block truncate', option.code === selectedOption.code ? 'font-semibold' : 'font-normal']">
              {{ option.label }}
            </span>
            <span v-if="option.code === selectedOption.code" class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
  
  interface DropdownItem {
    label: string;
    code: string;
  }
  
  const props = defineProps({
    items: {
      type: Array as () => DropdownItem[],
      required: true,
    },
    initialSelected: {
      type: Object as () => DropdownItem,
      default: () => ({ label: '', code: '' }),
    },
  });
  
  const emit = defineEmits(['update:selected']);
  
  const selectedOption = ref<DropdownItem>(props.initialSelected || props.items[0]);
  const isOpen = ref(false);
  const dropdownRef = ref<HTMLElement | null>(null);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectOption = (option: DropdownItem) => {
    selectedOption.value = option;
    isOpen.value = false;
    emit('update:selected', option);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  