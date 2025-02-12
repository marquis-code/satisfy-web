import { walletApiFactory } from "@/apiFactory/wallet"

export const useFetchCurrencies = () => {
    const loading = ref(false)
    const currencies = ref([])
    const fetchCurrencies = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getCurrencies();
            currencies.value = response.data;
        } catch (error: any) {
            useNuxtApp().$toast.error(error.message || 'Something went wrong while fetching currencies.', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }
    return {loading, currencies, fetchCurrencies}
}