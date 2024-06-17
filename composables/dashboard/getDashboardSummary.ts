import { dashboardApiFactory } from "@/apiFactory/dashboard";

export const useFetchDashboardSummary = () => {
  const dashboardSummary = ref({}) as Record<string, any>;
  const loading = ref(false);
  const fetchDashboardSummary = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getDashboardSummary();
      if(typeof response !== 'undefined'){
        dashboardSummary.value = response.data;
      }
    } catch (error: any) {
      // useNuxtApp().$toast.error(error.message, {
      //   autoClose: 5000,
      //   dangerouslyHTMLString: true,
      // });
      // return error;
    } finally {
      loading.value = false;
    }
  };

  return { fetchDashboardSummary, dashboardSummary, loading };
};
