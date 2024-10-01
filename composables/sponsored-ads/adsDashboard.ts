import { adsApiFactory } from "@/apiFactory/ads";
import { ref } from "vue";

export const useGetAdsDashboardTotal = () => {
    const adsDashboardTotals = ref({ views: 0, impressions: 0, clicks: 0 });
    const metaObj = ref({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        showAll: true,
    });
    const loading = ref(false);

    const getAdsDahboardTotals = async () => {
        loading.value = true;
        try {
            const response = await adsApiFactory.$_fetch_dashboard_totals(metaObj.value);
            if (response && response.data) {
                adsDashboardTotals.value = response.data;
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

    }

    return { getAdsDahboardTotals, adsDashboardTotals, metaObj, loading };
}
