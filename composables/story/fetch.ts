import { storyApiFactory } from "@/apiFactory/story";

export const useFetchStories = () => {
  const storiesList = ref([]) as any;
  const loading = ref(false);
  const fetchStories = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getAllStories();
      console.log(response.data, "here");
      storiesList.value = response?.data || [];
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

  return { fetchStories, storiesList, loading };
};
