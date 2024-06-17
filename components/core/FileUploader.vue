<template>
  <div class="">
    <label>
      <img v-if="!textChunks.length" src="@/assets/icons/txt-file.svg" alt=""
        class="h-16 w-16 p-3 rounded-full cursor-pointer bg-gray-100" />
      <input type="file" @change="onFileChange" class="mb-4 hidden" />
    </label>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <svg class="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-1.656-2.291H0c.597 2.34 2.253 4.297 4.344 5.522L6 17.291zM12 20a8 8 0 100-16v4a4 4 0 110 8v4z">
        </path>
      </svg>
    </div>

    <div v-else>
      <div v-if="editingIndex !== null" class="mb-4 p-4 rounded shadow-md">
        <textarea v-model="editingText"
          class="w-full border-gray-200 outline-none text-sm ring-0 leading-snug p-3 h-32 border rounded resize-none mb-2"></textarea>
        <div class="flex justify-end space-x-2">
          <button @click="saveEditing"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
          <button @click="cancelEditing"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
        </div>
      </div>

      <div class="space-y-2 grid grid-cols-4 lg:grid-cols-12 gap-2">
        <div v-for="(chunk, chunkIndex) in textChunks" :key="chunkIndex" @click="startEditing(chunkIndex)"
          :class="[chunk.color, 'relative p-3 rounded shadow-md flex items-center justify-center cursor-pointer', { 'border-2 border-green-500': chunkIndex === editingIndex }]"
          class="w-24 h-24">
          <div class="flex flex-col items-center justify-center space-y-2">
            <div class="pt-3">
              <p class="flex-1 text-[10px] text-gray-800 mt-1 leading-snug">{{ chunk.text.slice(0, 30) + '...' }}</p>
            </div>
            <div>
              <button @click.stop="removeChunk(chunkIndex)" type="button"
                class="absolute top-1 left-1 text-red-500 hover:text-red-700 flex justify-center items-center bg-white rounded-full shadow h-6 w-6 p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div class="absolute top-1 right-1">
                <p class="pb-4 text-sm font-semibold">{{ chunkIndex + 1 }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFileUploader } from '@/composables/core/useFileUploader';

const { textChunks, handleFileUpload, removeChunk, editingIndex, editingText, startEditing, saveEditing, cancelEditing, isLoading } = useFileUploader();
const emit = defineEmits(['content'])
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    handleFileUpload(file)
      .then(() => {
        emit('content', textChunks.value);
      })
      .catch(error => {
        console.error('Error processing file', error);
      });
  }
};
</script>