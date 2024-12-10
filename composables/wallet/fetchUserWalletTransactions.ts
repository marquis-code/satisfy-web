import { walletApiFactory } from "@/apiFactory/wallet"

export const useFetchUserWalletTransactions = () => {
    const loading = ref(false)
    const walletTransactions = ref([])
    const id = useRoute().params.id;
    const queryObj = ref({
        sortBy: "createdAt",
        orderBy: "desc",
    }) as any;

    const pagination = ref({
        page: 1,
        perPage: 15,
        total: 0,
        pages: 0,
    });
    const fetchUserWalletTransactions = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getUserWalletTransactions(pagination.value, queryObj.value, id);
            walletTransactions.value = response.data.result;
            console.log(walletTransactions.value)
        } catch (error: any) {
            useNuxtApp().$toast.error(error.message || 'Something went wrong while fetching wallet.', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }
    // watch(() => pagination.value.page, () => {
    //     fetchUserWalletTransactions();
    //     }
    // );
    return { loading, walletTransactions, fetchUserWalletTransactions, pagination }
}