import { axiosInstance } from "./axios.config";

export const walletApiFactory = {
    getUserWallet(id: string){
        return axiosInstance.get(`/wallets/${id}/user`)
    },
    getUserWalletTransactions(metadata: { page: number; perPage: number }, queryObj: {sortBy: string, orderBy: string}, id: string){
        return axiosInstance.get(`/wallets/transactions?perPage=${metadata.perPage}&page=${metadata.page}&accountId=${id}&sort=${queryObj.sortBy}:${queryObj.orderBy}`)
    },
    getWalletSummary(metaObj: any) {
        return axiosInstance.get(`/wallets/summary?range=${metaObj.range}&startDate=${metaObj.startDate}&endDate=${metaObj.endDate}`);
      },
}
