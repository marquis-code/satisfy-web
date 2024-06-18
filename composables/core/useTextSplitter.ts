import { ref } from 'vue';
export const useTextSplitter = () => {
  const slides = ref<{ text: string; color?: string }[]>([]);
  const editingIndex = ref<number | null>(null);
  const editingText = ref<string>('');

  const splitTextIntoSlides = (text: string) => {
    const trimmedText = text.trim().replace(/\s+/g, ' ');
    const chunks = [];
    for (let i = 0; i < trimmedText.length; i += 380) {
      chunks.push(trimmedText.slice(i, i + 380));
    }
    const newSlides = chunks.map(chunk => ({ text: chunk }));
    slides.value = [...slides.value, ...newSlides].slice(0, 25);
    return newSlides; // Return the newly created slides
  };

  const removeSlide = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Slide.",
      cancelButtonText: "Nah, Just kidding",
    }).then((result) => {
      if (result.value) {
        slides.value.splice(index, 1);
      } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
      }
    });
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
