<template>
    <button v-if="walletTransactions.length <= 0 && !loading" type="button"
        class="relative block w-full rounded-lg border-2 mt-10 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
        </svg>
        <span class="mt-2 block text-sm font-semibold text-gray-900">No wallet available</span>
    </button>
    <div v-if="walletTransactions?.length && !loading" class="overflow-x-auto bg-white rounded-lg shadow-md text-sm">
        <table class="min-w-full text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th class="py-4 pl-6 ">Date</th>
                    <th class="py-4 px-6">Description</th>
                    <th class="py-4 px-6">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in walletTransactions" :key="transaction.id" class="border-t hover:bg-gray-50">
                    <td class="py-4 pl-6 ">{{ formatDate(transaction.createdAt) }}</td>
                    <td class="py-4 px-6">{{ transaction.description }}</td>
                    <td class="py-4 px-6 font-medium"
                        :class="transaction.direction === 'credit' ? 'text-green-400' : 'text-red-600'">{{
                            formatCurrency(transaction.amount) }}</td>
                </tr>
            </tbody>
        </table>
        <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
            :pages="pagination.pages" @page-changed="handlePageChange" />
    </div>
    <div v-if="loading" class="w-full h-32 bg-gray-100 animate-pulse rounded-xl"></div>
</template>


<script lang="ts" setup>
import { useFetchUserWalletTransactions } from '@/composables/wallet/fetchUserWalletTransactions';

const { loading, walletTransactions, fetchUserWalletTransactions, pagination } = useFetchUserWalletTransactions();
fetchUserWalletTransactions();

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amount);
};
const handlePageChange = (val: any) => {
    pagination.value.page = val
}
</script>

<style></style>