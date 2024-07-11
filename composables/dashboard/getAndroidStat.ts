import { dashboardApiFactory } from "@/apiFactory/dashboard";

export const useFetchAndroidStat = () => {
  const statObj = ref([]);
  const loading = ref(false);
  const fetchAndroidStat = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getAndroidStat();
      statObj.value = response.data;
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

  onMounted(() => {
    fetchAndroidStat()
  })

  return { fetchAndroidStat, statObj, loading };
};
