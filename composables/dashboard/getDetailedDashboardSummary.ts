import { dashboardApiFactory } from "@/apiFactory/dashboard";
import { ref, watch } from "vue";

export const useFetchDetailedDashboardSummary = () => {
  const detailedDashboardSummary = ref({}) as Record<string, any>;
  const metaObj = ref({
    // range: 'last_7_days',  
    range: 'today',  
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    showAll: true,
  });
  const loading = ref(false);

  const fetchDetailedDashboardSummary = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getDashboardDetailedSummary(metaObj.value);
      if (response && response.data) {
        detailedDashboardSummary.value = response.data;

      }
    } catch (error) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  const setFilterData = (data: any) => {
    metaObj.value.range = data.range || 'last_7_days'; 
    metaObj.value.startDate = data.startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10);
    metaObj.value.endDate = data.endDate || new Date().toISOString().substr(0, 10);
    metaObj.value.showAll = data.showAll || false;
  };

  watch([metaObj.value.range, metaObj.value.startDate, metaObj.value.endDate, metaObj.value.showAll], () => {
    fetchDetailedDashboardSummary();
  });

  return {
    fetchDetailedDashboardSummary,
    detailedDashboardSummary,
    loading,
    metaObj,
    setFilterData,
  };
};
