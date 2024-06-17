<!-- <template>
    <div class="p-4">
        <div>
            <textarea v-model="textInput" class="w-full h-40 p-3 border rounded-lg outline-none mb-4"
                placeholder="Enter your text here..."></textarea>
            <div class="flex justify-end items-end">
                <button @click="splitText" type="button"
                    class="border rounded-full shadow bg-white p-2 flex items-center gap-x-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
                        stroke="#4a4a4a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    insert into stori slides
                </button>
            </div>
        </div>

        <div v-if="editingIndex !== null" class="mb-4 p-4 border border-gray-500 rounded-lg shadow-md">
            <textarea v-model="editingText" class="w-full h-24 p-2 border rounded resize-none mb-2"></textarea>
            <div class="flex justify-end space-x-2">
                <button @click="saveEditing"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                <button @click="cancelEditing"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>

        <div v-if="editingIndex === null" class="space-y-2 grid grid-cols-4 lg:grid-cols-12 gap-2">
            <div v-for="(slide, index) in slides" :key="index"
                :class="[slide.color, 'relative p-4 rounded shadow-md cursor-pointer w-24 h-24', { 'border-2 border-green-500': index === editingIndex }]"
                @click="startEditing(index)">
                <div class="pt-3">
                    <p class="flex-1 text-[10px] text-gray-800 mt-2 leading-snug">{{ slide.text.slice(0, 30) + '...' }}
                    </p>
                </div>
                <button @click.stop="removeSlide(index)" type="button"
                    class="absolute top-1 left-1 text-red-500 hover:text-red-700 flex justify-center items-center bg-white rounded-full shadow h-6 w-6 p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="absolute top-1 right-1">
                    <p class="pb-4 text-sm font-semibold">{{ index + 1 }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTextSplitter } from '@/composables/core/useTextSplitter';

const { slides, splitTextIntoSlides, removeSlide, editingIndex, editingText, startEditing, saveEditing, cancelEditing } = useTextSplitter();

const textInput = ref<string>('');
const emit = defineEmits(['content'])
const splitText = () => {
    splitTextIntoSlides(textInput.value);
    emit('content', slides.value);
    textInput.value = ''; // Clear the input field after splitting
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style> -->

<template>
    <div class="">
        <textarea v-model="textInput" class="w-full h-40 p-2 border rounded mb-4"
            placeholder="Enter your text here..."></textarea>
            <div class="flex justify-end items-end">
                <button @click="splitText" type="button"
                    class="border rounded-full shadow bg-white p-2 flex items-center gap-x-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
                        stroke="#4a4a4a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    insert into stori slides
                </button>
            </div>

        <div v-if="editingIndex === null" class="space-y-2 grid grid-cols-4 lg:grid-cols-12 gap-2">
            <div v-for="(slide, index) in slides" :key="index"
                :class="[slide.color, 'relative p-4 rounded shadow-md cursor-pointer w-24 h-24', { 'border-2 border-green-500': index === editingIndex }]"
                @click="startEditing(index)">
                <div class="pt-3">
                    <p class="flex-1 text-[10px] text-gray-800 mt-2 leading-snug">{{ slide.text.slice(0, 30) + '...' }}
                    </p>
                </div>
                <button @click.stop="removeSlide(index)" type="button"
                    class="absolute top-1 left-1 text-red-500 hover:text-red-700 flex justify-center items-center bg-white rounded-full shadow h-6 w-6 p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <div v-else class="mb-4 p-4 border border-gray-500 rounded-lg shadow-md">
            <textarea v-model="editingText" class="w-full h-24 p-2 border rounded resize-none mb-2"></textarea>
            <div class="flex justify-end space-x-2">
                <button @click="saveEditing"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                <button @click="cancelEditing"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTextSplitter } from '@/composables/core/useTextSplitter';

const { slides, splitTextIntoSlides, removeSlide, editingIndex, editingText, startEditing, saveEditing, cancelEditing } = useTextSplitter();

const textInput = ref<string>('');

const splitText = () => {
    splitTextIntoSlides(textInput.value);
    textInput.value = ''; // Clear the input field after splitting
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>