import { userApiFactory } from "@/apiFactory/users";

export const useFetchFollowers = () => {
  const followersList = ref([]);
  const userId = useRoute().params.id
  const loading = ref(false);
  const fetchFollowers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserFollowers(userId);
      followersList.value = response.data.result || [];
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

  return { fetchFollowers, followersList, loading };
};
