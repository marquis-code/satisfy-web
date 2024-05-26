import { userApiFactory } from "@/apiFactory/users";

export const useFetchFollowings = () => {
  const followingsList = ref([]);
  const userId = useRoute().params.id
  const loading = ref(false);
  const fetchFollowings = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserFollowing(userId);
      followingsList.value = response.data.result || [];
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

  return { fetchFollowings, followingsList, loading };
};
