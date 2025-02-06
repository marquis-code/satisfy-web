import { walletApiFactory } from "@/apiFactory/wallet"


function debounce(fn: Function, delay: number) {
    let timeoutId: number | undefined;
    return function (...args: any) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}


export const useFetchUserWalletTransactions = () => {
    const loading = ref(false)
    const walletTransactions = ref([])
    const id = useRoute().params.id;
    const queryObj = ref({
        sortBy: "createdAt",
        orderBy: "desc",
    }) as any;
    const searchQuery = ref<string>("");

    const pagination = ref({
        page: 1,
        perPage: 15,
        total: 0,
        pages: 0,
    });
    const fetchUserWalletTransactions = async () => {
        loading.value = true;
        try {
            const response = await walletApiFactory.getUserWalletTransactions(pagination.value, queryObj.value, id || '', searchQuery.value,);
            walletTransactions.value = response.data.result;
            pagination.value = response.data.metadata;
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
    watch(
        () => pagination.value.page,
        () => {
            fetchUserWalletTransactions();
        }
    );
    const debouncedFetchUserWalletTransactions = debounce(fetchUserWalletTransactions, 300);

    watch(searchQuery, (newQuery) => {
        setPaginationObj(1); 
        debouncedFetchUserWalletTransactions();
    });
    const setPaginationObj = (val: any) => {
        pagination.value.page = val;
    };

    return { loading, walletTransactions, fetchUserWalletTransactions, pagination, queryObj, searchQuery}
}