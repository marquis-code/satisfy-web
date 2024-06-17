// composables/useTextSplitter.ts
import { ref } from 'vue';

export const useTextSplitter = () => {
  const slides = ref<{ text: string; color: string }[]>([]);
  const editingIndex = ref<number | null>(null);
  const editingText = ref<string>('');

  const colors = [
    'bg-red-200', 'bg-pink-200', 'bg-purple-200', 'bg-indigo-200',
    'bg-blue-200', 'bg-teal-200', 'bg-green-200', 'bg-yellow-200',
    'bg-orange-200', 'bg-gray-200'
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const splitTextIntoSlides = (text: string) => {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += 700) {
      chunks.push(words.slice(i, i + 700).join(' '));
    }
    const newSlides = chunks.map(chunk => ({ text: chunk, color: getRandomColor() }));
    slides.value = [...slides.value, ...newSlides].slice(0, 25);
  };

  const removeSlide = (index: number) => {
    slides.value.splice(index, 1);
  };

  const startEditing = (index: number) => {
    editingIndex.value = index;
    editingText.value = slides.value[index].text;
  };

  const saveEditing = () => {
    if (editingIndex.value !== null) {
      slides.value[editingIndex.value].text = editingText.value;
      editingIndex.value = null;
      editingText.value = '';
    }
  };

  const cancelEditing = () => {
    editingIndex.value = null;
    editingText.value = '';
  };

  return { slides, splitTextIntoSlides, removeSlide, editingIndex, editingText, startEditing, saveEditing, cancelEditing };
};
