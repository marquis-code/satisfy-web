<template>
    <main>
        <div class="space-y-6">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Banner Ads</h1>
                    <p class="mt-2 text-sm text-gray-700">A list of all the banner ads in your account including
                        their name,
                        title, email and role.</p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <!-- <button type="button" @click="handleAds('create')"
            class="block rounded-sm bg-[#00A1C1] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
            new banner ads</button> -->
                </div>
            </div>
            <div class="border-[0.5px] border-gray-50 rounded-lg">
                <!-- dl class: class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border-[0.5px] border-gray-50 rounded-lg"> -->
                <dl class="mx-auto grid grid-cols-3 gap-px bg-gray-900/5 border-[0.5px] border-gray-50 rounded-lg">

                    <div
                        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                        <dt class="text-base font-medium leading-6 text-gray-500">Total Requests</dt>
                        <dd class="text-xs font-medium text-gray-700"></dd>
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{{
                            ads.length }}</dd>
                    </div>
                    <div
                        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                        <dt class="text-base font-medium leading-6 text-gray-500">Published</dt>
                        <!-- <dd class="text-xs font-medium text-rose-600">+54.02%</dd> -->
                        <!-- <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">200</dd> -->
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">0</dd>

                    </div>
                    <div
                        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                        <dt class="text-base font-medium leading-6 text-gray-500">Rejected</dt>
                        <!-- <dd class="text-xs font-medium text-gray-700">-1.39%</dd> -->
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">0</dd>
                    </div>
                </dl>
            </div>

            <div class="mt-8 flow-root">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between my-5 sm:gap-24 gap-3">
                    <div class="flex-1 flex items-center h-9 rounded border-gray-300 relative">
                        <input type="text" v-model="searchTerm" placeholder="Search"
                            class=" text-sm rounded focus:outline-none px-5 flex-1">
                        <svg class="absolute right-3" width="21px" height="21px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="flex gap-x-2 flex-col sm:flex-row gap-2 sm:items-center">
                        <div class="space-x-2">
                            <label for="sortBy" class="text-sm text-gray-700 font-medium">Sort By:</label>
                            <select id="sortBy" v-model="sortKey" @change="updateQuery"
                                class="h-10 rounded border-gray-300 text-sm">
                                <option value="clientName">Client Name</option>
                                <option value="status">Status</option>
                                <option value="startDate">Start Date</option>
                                <option value="endDate">End Date</option>
                                <option value="createdAt">Date Created</option>
                            </select>
                        </div>
                        <div class="space-x-2">
                            <label for="orderBy" class="text-sm text-gray-700 font-medium">Order by:</label>
                            <select id="orderBy" v-model="sortOrder" @change="updateQuery"
                                class="h-10 rounded border-gray-300 text-sm">
                                <option value="asc">Ascending Order</option>
                                <option value="desc">Descending Order</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div v-if="ads.length && !loading">
                        <div class="inline-block  min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="px-3 py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">
                                                S/N
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Client Name</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">File
                                                Upload</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ads
                                                Link
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount
                                                Paid</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start
                                                date
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End
                                                date
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date
                                            </th>
                                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="(ads, idx) in ads" :key="idx">
                                            <td class="whitespace-nowrap  text-sm font-medium text-gray-900 sm:pl-4">
                                                {{ (pagination.page - 1) * pagination.perPage + (idx + 1) }}</td>
                                            <td
                                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {{ ads.clientName ?? 'Nil' }}</td>
                                            <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <DashboardImageZoom type="ads" v-if="ads.image" class="rounded-lg h-10 w-10" :src="ads.image" />
                      <span v-else>Nil</span>
                    </td> -->
                                            <td class="whitespace-nowrap px-3 py-4 pl-6 pr-9 text-sm text-gray-500">
                                                <DashboardImageZoom type="ads" v-if="ads.image"
                                                    class="rounded-lg h-10 w-10" :src="ads.image" />
                                                <span v-else>Nil</span>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <a target="__blank" v-if="ads.link" :href="ads.link"
                                                    class="underline text-green-600">{{
                                                        ads.link.length > 30 ? ads.link.slice(0, 30) + '.....' :
                                                            ads.link.slice(0, 25) }}</a>
                                                <span v-else>Nil</span>
                                            </td>
                                            <td class="whitespace-nowrap pl-5 pr-12 py-4 text-sm text-gray-500">
                                                {{ ads.amountPaid ?? 'Nil' }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span v-if="ads?.startDate">
                                                    {{ formatDate(ads?.startDate) }}
                                                </span>
                                                <span v-else>Nil</span>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span v-if="ads?.endDate">
                                                    {{ formatDate(ads?.endDate) }}
                                                </span>
                                                <span v-else>Nil</span>
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div class="flex items-center gap-x-3">
                                                    <button @click="publishAd(ads?.id)"
                                                        class=" border border-black text-green-600 py-1 px-3 rounded-md">Publish</button>
                                                    <button @click="rejectAd(ads?.id)"
                                                        class=" border border-black text-red-600 py-1 px-3 rounded-md">Reject</button>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 pr-5 py-4 text-sm text-gray-500">
                                                <span v-if="ads?.status">{{ ads?.status }}</span>
                                                <span v-else>Nil</span>
                                            </td>

                                            <td class="whitespace-nowrap px-3 pr-5 py-4 text-sm text-gray-500">
                                                <span v-if="ads?.createdAt">{{ formatDate(ads?.createdAt) }}</span>
                                                <span v-else>Nil</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CoreEmptyState v-if="ads.length <= 0 && !loading" title="No Ads available" desc="">
                    </CoreEmptyState>
                    <div v-if="loading" class="h-32 bg-slate-100 rounded"></div>
                    <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
                        :pages="pagination.pages" @page-changed="handlePageChange" />
                </div>
            </div>

        </div>
    </main>
</template>

<script setup lang="ts">
import { formatDateTime } from '@/utils/generateDate';
import Swal from "sweetalert2";
import { useDeleteSponsoredAds } from '@/composables/sponsored-ads/delete'
import { useGetAdsDashboardTotal } from '@/composables/sponsored-ads/adsDashboard';
import { useGetAllSponsoredAdsRequests } from '@/composables/sponsored-ads/fetchRequests';
import { useReviewAd } from '@/composables/sponsored-ads/reviewAd';
const { deleteSponsoredAds, loading: deleting } = useDeleteSponsoredAds()
// const { getAllSponsoredAds, ads: adsList, loading } = useGetAllSponsoredAds()
const { getAdsDahboardTotals, adsDashboardTotals, loading: showing } = useGetAdsDashboardTotal()
const { getAllSponsoredAdsRequests, ads, loading, pagination, queryObj, status, searchTerm, totalAds } = useGetAllSponsoredAdsRequests();
const { reviewAd, loading: loadingReview, payload, adId } = useReviewAd();
const showSlideOver = ref(false)
const selectedAds = ref({}) as Record<string, any>
const route = useRoute()
const router = useRouter()
getAllSponsoredAdsRequests()

definePageMeta({
    layout: 'dashboard'
})
const comment = ref('')
const rejectAd = async (id: string) => {
    const result = await Swal.fire({
        title: "Reason for rejection?",
        text: "You won't be able to revert this!",
        input: "text",
        inputPlaceholder: "Enter your reason",
    })
    if (result.value) {
        comment.value = result.value;
    } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
    }
    adId.value = id;
    payload.value = {
        status: "false",
        comment: comment.value
    }
    reviewAd()
}

const publishAd = async (id: string) => {
    adId.value = id;
    console.log(id)
    payload.value = {
        status: "true",
        comment: comment.value
    }
    await reviewAd();
    getAllSponsoredAdsRequests();
}

onMounted(async () => {
    getAdsDahboardTotals();
    status.value = false;
    await getAllSponsoredAdsRequests();
    console.log(ads.value)
});

const itemsPerPage = 10;
const currentPage = ref(1);

//new
const sortKey = ref('clientName');
const sortOrder = ref('asc');

const updateQuery = () => {
    queryObj.value = {
        sortBy: sortKey.value,
        orderBy: sortOrder.value,
    };
    getAllSponsoredAdsRequests();
};

const handlePageChange = (val: any) => {
    pagination.value.page = val
}


</script>
