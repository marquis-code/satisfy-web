import { walletApiFactory } from "@/apiFactory/wallet"

export const useFetchWalletTransactionsChart = () => {
    const loading = ref(false)
    const walletTransactionsChart = ref({}) as Record<string, any>;
    const metaObj = ref({
        startDate: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        showAll: false,
        datePart: 'day',
        dataType: 'amount',
        financeType : 'payout'
    });
    const fetchWalletTransactionsChart = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getWalletTransactionsChart(metaObj.value);
            if (response && response.data) {
                walletTransactionsChart.value = response.data;
                console.log('walll', walletTransactionsChart.value)
            }
        } catch (error: any) {
            useNuxtApp().$toast.error(error.message || 'Something went wrong while fetching wallet TransactionsChart.', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }

    // const setFilterData = (data: any) => {
    //     metaObj.value.startDate = data.startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10);
    //     metaObj.value.endDate = data.endDate || new Date().toISOString().substr(0, 10);
    //     metaObj.value.showAll = data.showAll || false;
    //     metaObj.value.datePart = data.datePart || 'day' ,
    //     metaObj.value.dateType = data.dateType || 'amount',
    //     metaObj.value.financeType  = data.financeType || 'payout'
    // };

    // watch([metaObj.value.startDate, metaObj.value.endDate, metaObj.value.showAll, metaObj.value.datePart, metaObj.value.dateType, metaObj.value.financeType], () => {
    //     fetchWalletTransactionsChart();
    // });
    return { loading, walletTransactionsChart, fetchWalletTransactionsChart, metaObj }
}