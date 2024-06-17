export const useFileUploader = () => {
  const textChunks = ref<{ text: string; color: string }[]>([]);
  const editingIndex = ref<number | null>(null);
  const editingText = ref<string>("");
  const isLoading = ref<boolean>(false);

  const handleFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadstart = () => {
        isLoading.value = true;
      };

      reader.onload = (event) => {
        const text = event.target?.result as string;
        processText(text);
        isLoading.value = false;
        resolve();
      };

      reader.onerror = () => {
        isLoading.value = false;
        reject(new Error("File reading failed"));
      };

      reader.readAsText(file);
    });
  };

  const processText = (text: string) => {
    const chunks: { text: string; color: string }[] = [];
    for (let i = 0; i < text.length; i += 700) {
      if (chunks.length >= 25) break; // Stop processing after 25 chunks
      chunks.push({ text: text.slice(i, i + 700), color: getRandomColor() });
    }
    textChunks.value = chunks;
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-200",
      "bg-pink-200",
      "bg-purple-200",
      "bg-indigo-200",
      "bg-blue-200",
      "bg-teal-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-orange-200",
      "bg-gray-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const removeChunk = (index: number) => {
    textChunks.value.splice(index, 1);
  };

  const startEditing = (index: number) => {
    editingIndex.value = index;
    editingText.value = textChunks.value[index].text;
  };

  const saveEditing = () => {
    if (editingIndex.value !== null) {
      textChunks.value[editingIndex.value].text = editingText.value;
      editingIndex.value = null;
      editingText.value = "";
    }
  };

  const cancelEditing = () => {
    editingIndex.value = null;
    editingText.value = "";
  };

  return {
    textChunks,
    handleFileUpload,
    removeChunk,
    editingIndex,
    editingText,
    startEditing,
    saveEditing,
    cancelEditing,
    isLoading,
  };
};
