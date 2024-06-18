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

        <div v-if="editingIndex !== null"
            class="my-4 p-4 border border-gray-500 rounded-lg space-x-6 space-y-3 shadow-md">
            <div class="flex justify-between items-center pl-6">
                <p class="text-sm text-gray-700 font-semibold">Character count should not exceed 380 characters and 12
                    lines.</p>
                <p
                    :class="`text-sm text-gray-700 font-semibold ${editingText.length > 380 ? 'text-red-600' : editingText.length === 380 ? 'text-green-700' : ''}`">
                    {{ editingText.length }}/380</p>
            </div>
            <div class="flex space-x-6">
                <div class="w-9/12">
                    <textarea v-model="editingText" rows="5" cols="10"
                        :class="`w-full p-2 border h-60 rounded leading-relaxed outline-none text-xl resize-none mb-2 ${editingText.length > 700 ? 'border-2 border-red-500' : ''}`"></textarea>
                    <div class="flex justify-end space-x-2">
                        <button @click="saveEditing"
                            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                        <button @click="cancelEditing"
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
                    </div>
                </div>
                <div :style="{ backgroundColor: color }"
                    :class="`w-3/12 overflow-y-auto rounded-md ${!color.length ? 'border border-gray-600' : ''}`">
                    <p :style="previewStyles" class="text-preview"
                        :class="`leading-relaxed p-3 ${!color.length ? 'text-gray-700' : 'text-white'}`">{{ editingText
                        }}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 lg:grid-cols-12 gap-2">
            <div v-for="(slide, index) in slides" :key="index"
                :class="[slide.color, 'relative p-4 rounded border border-gray-200 shadow cursor-pointer w-24 h-24', { 'border-2 border-green-500 overflow-y-auto': index === editingIndex }]"
                @click="startEditing(index)">
                <div class="pt-3">
                    <p class="flex-1 text-[10px] text-gray-800 mt-2 leading-snug">{{ slide.text.slice(0, 30) + '...' }}
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <button @click.stop="removeSlide(index)" type="button"
                        class="absolute top-1 left-1 text-red-500 hover:text-red-700 flex justify-center items-center bg-white rounded-full shadow h-5 w-5 p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                            stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <p class="font-semibold text-sm text-gray-800 absolute top-1 right-1">{{ index + 1 }}</p>
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
    const newSlides = splitTextIntoSlides(textInput.value);
    textInput.value = '';
    emit('content', newSlides);
};

const props = defineProps({
    color: {
        type: String,
        default: ''
    },
    selectedFont: {
        type: String,
        default: 'Lato'
    },
    selectedTextAlignment: {
        type: String,
        default: 'center'
    }
})

const previewStyles = {
  fontFamily: props.selectedFont,
  textAlign: props.selectedTextAlignment // Ensure this is a valid CSS value
}

</script>

<style scoped>
.text-preview {
    font-size: 24px;
    margin-top: 10px;
}
</style>