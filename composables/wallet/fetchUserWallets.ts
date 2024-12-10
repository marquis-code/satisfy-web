import { walletApiFactory } from "@/apiFactory/wallet"

export const useFetchUserWallet = () => {
    const loading = ref(false)
    const wallets = ref([])
    const id = useRoute().params.id;
    const fetchUserWallet = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getUserWallet(id);
            wallets.value = response.data.result;
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
    return {loading, wallets, fetchUserWallet}
}