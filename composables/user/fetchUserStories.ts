import { storyApiFactory } from "@/apiFactory/story";

export const useFetchUserStories = () => {
  const userStoriesList = ref([]) as any;
  const queryObj = ref({
    sortBy: 'createdAt',
    orderBy: 'desc'
  }) as any
  const route = useRoute();
  const loading = ref(false);
  const fetchUserStories = async (userId?: string) => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getStoryByUserId(route.params.id || userId, queryObj.value);
      userStoriesList.value = response?.data?.result ?? [];
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

  return { fetchUserStories, userStoriesList, loading };
};
