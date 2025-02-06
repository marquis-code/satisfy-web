import { walletApiFactory } from "@/apiFactory/wallet"

export const useFetchWalletSummary = () => {
    const loading = ref(false)
    const walletSummary = ref({}) as Record<string, any>;
    const metaObj = ref({
        range: 'today',
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        showAll: true,
    });
    const fetchWalletSummary = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getWalletSummary(metaObj.value);
            if (response && response.data) {
                walletSummary.value = response.data;
            }
        } catch (error: any) {
            useNuxtApp().$toast.error(error.message || 'Something went wrong while fetching wallet summary.', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }

    const setFilterData = (data: any) => {
        metaObj.value.range = data.range || 'last_7_days';
        metaObj.value.startDate = data.startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10);
        metaObj.value.endDate = data.endDate || new Date().toISOString().substr(0, 10);
        metaObj.value.showAll = data.showAll || false;
    };

    watch([metaObj.value.range, metaObj.value.startDate, metaObj.value.endDate, metaObj.value.showAll], () => {
        fetchWalletSummary();
    });
    return { loading, walletSummary, fetchWalletSummary, setFilterData, metaObj }
}