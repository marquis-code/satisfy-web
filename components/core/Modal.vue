<template>
    <div v-if="isOpen" @click="closeModal"  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div @click.stop class="p-4 rounded-md max-w-full sm:max-w-[90%] md:max-w-[50%] lg:max-w-[30%] w-full h-[60%] overflow-y-scroll custom-scrollbar">
            <!-- Modal Header -->
            <slot name="header"></slot>

            <!-- Modal Content -->
            <slot />

            <!-- Modal Footer -->
            <slot name="footer"></slot>
            
            <!-- Close Button (optional) -->
            <button @click="closeModal" class="absolute top-2 right-2 text-white">X</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Props for controlling the modal's visibility
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

// Emit event to close the modal
const emit = defineEmits(['close']);

// Close modal function
const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
/* Add responsive styling */
@media (max-width: 640px) {
    .max-w-full {
        max-width: 90%;
    }
}

  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
  .custom-scrollbar {
    scrollbar-width: thin; 
    scrollbar-color: #cccccc #f1f1f1; 
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px; 
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #cccccc;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cccccc; 
    border-radius: 4px; 
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #cccccc; 
  }
  </style>
