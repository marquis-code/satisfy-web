import { userApiFactory } from "@/apiFactory/users";

export const useFetchUsers = () => {
  const usersList = ref([]);
  const loading = ref(false);
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getTopUsers();
      usersList.value = response.data;
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

  return { fetchUsers, usersList, loading };
};
