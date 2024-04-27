import { filesApiFactory } from "@/apiFactory/files";

export const useFetchFilesList = () => {
  const filesList = ref([]);
  const loading = ref(false);
  const fetchFilesList = async () => {
    loading.value = true;
    try {
      const response = await filesApiFactory.getFilesList();
      filesList.value = response.data;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { fetchFilesList, filesList, loading };
};
