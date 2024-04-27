import { userApiFactory } from "@/apiFactory/users";

export const useDeactivateUser = () => {
  const userId = useRoute().params.id;
  const payload = ref({
    status: "",
  });
  const loading = ref(false);
  const deactivateUser = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.deactivateUser(userId, payload);
      return response
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

  return { deactivateUser, payload, loading };
};
