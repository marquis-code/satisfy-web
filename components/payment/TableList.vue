<template>
    <main>
        <div v-if="walletTransactions.length && !loading"
            class="inline-block min-w-full py-2 align-middle border-gray-100 rounded-b-lg border bg-white shadow">
            <div class="relative">
                <table class="min-w-full table-fixed divide-y divide-gray-300">
                    <thead class="">
                        <tr>
                            <th scope="col" class="px-6 py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">S/N
                            </th>
                            <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Avatar
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Payer</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Commission
                                Amount</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Date
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 bg-white">
                        <tr class="odd:bg-gray-50" v-for="(transaction, index) in walletTransactions" :key="index">
                            <td class="whitespace-nowrap  text-sm font-medium text-gray-900 sm:pl-4">
                                {{ (pagination.page - 1) * pagination.perPage + (index + 1) }}</td>
                            <td class="whitespace-nowrap py-4 pr-3 text-xs font-medium">
                                <DashboardImageZoom v-if="transaction.user.profilePicture" class="h-10 w-10"
                                    :src="transaction.user.profilePicture" />
                                <div v-else
                                    class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                                    {{ generateInitials(transaction.user.fname, transaction.user.lname) }}
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ transaction.user.fname || "" }} {{ transaction.user.lname || "" }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ transaction.description }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{""}}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{""}}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 font-medium text-right"
                                :class="transaction.direction === 'credit' ? 'text-green-600' : 'text-red-600'">{{
                                    formatCurrency(transaction.amount) }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">{{
                                formatDateTime(transaction.createdAt) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
                :pages="pagination.pages" @page-changed="handlePageChange" />


    </main>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/generateDate'
import VueTailwindDatepicker from "vue-tailwind-datepicker";

const props = defineProps({
    walletTransactions: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    pagination: {
        type: Object,
    },
});


const generateInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amount);
};
const handlePageChange = (val: any) => {
    props.pagination.page = val
}



</script>

<style></style>