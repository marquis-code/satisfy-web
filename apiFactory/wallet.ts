import { axiosInstance } from "./axios.config";

export const walletApiFactory = {
    getUserWallet(id: string) {
        return axiosInstance.get(`/wallets/${id}/user`)
    },
    getUserWalletTransactions(metadata: { page: number; perPage: number }, queryObj: { sortBy: string, orderBy: string }, id: string, searchQuery: any) {
        let endpoint = `/wallets/transactions?perPage=${metadata.perPage}&page=${metadata.page}&accountId=${id}&sort=${queryObj.sortBy}:${queryObj.orderBy}`;
        if (searchQuery && searchQuery.trim() !== "") {
            endpoint += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }
        return axiosInstance.get(endpoint)
    },
    getWalletSummary(metaObj: any) {
        return axiosInstance.get(`/wallets/summary?range=${metaObj.range}&startDate=${metaObj.startDate}&endDate=${metaObj.endDate}`);
    },
    getWalletTransactionsChart(metaObj: any){
        return axiosInstance.get(`/wallets/transactions/plot?showAll=${metaObj.showAll}&startDate=${metaObj.startDate}&endDate=${metaObj.endDate}&datePart=${metaObj.datePart}&dataType=${metaObj.dataType}&financeType=${metaObj.financeType}`)
    }
}
