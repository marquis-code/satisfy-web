import { filesApiFactory } from "@/apiFactory/files";

export const useUploadImageFile = () => {
  const uploadResponse = ref({}) as any;
  const loading = ref(false);
  const uploadImageFile = async (payload: any) => {
    loading.value = true;
    try {
      const response = await filesApiFactory.uploadFile(payload);
      uploadResponse.value = response.data;
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

  return { uploadImageFile, uploadResponse, loading };
};
