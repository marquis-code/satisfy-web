<template>
    <main>
        <div class="space-y-6">
            <AdsHeader :total="adsList.length" :clicks="adsDashboardTotals.clicks"
                :impressions="adsDashboardTotals.impressions" :handleAds="handleAds" />

            <div class="mt-8 flow-root">
                <div class="flex items-center justify-end gap-x-6 mb-5">
                    <div class="space-x-2">
                        <label for="sortBy" class="text-sm text-gray-700 font-medium">Sort By:</label>
                        <select id="sortBy" v-model="sortKey" @change="applySorting"
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
                        <select id="orderBy" v-model="sortOrder" @change="applySorting"
                            class="h-10 rounded border-gray-300 text-sm">
                            <option value="asc">Ascending Order</option>
                            <option value="desc">Descending Order</option>
                        </select>
                    </div>
                </div>
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <!-- <div v-if="paginatedAds.length && !loading" -->
                    <div class="inline-block  min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="px-3 py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">S/N
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Client Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">File
                                            Upload</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ads Link
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hits</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount
                                            Paid</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date
                                            Created</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                        </th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <td :colspan="11">
                                        <CoreEmptyState class="w-full" title="No Ads available" desc="">
                                        </CoreEmptyState>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- <CoreEmptyState v-if="adsList.length <= 0 && !loading" title="No Ads available" desc="">
                    </CoreEmptyState> -->
                    <div v-if="loading" class="h-32 bg-slate-100 rounded"></div>

                    <!-- Pagination Controls -->
                    <!-- <nav v-if="!loading && adsList.length"
                        class="flex max-w-screen-2xl mx-10  items-center justify-between border border-gray-200 bg-white px-4 py-3\\\ sm:px-6"
                        aria-label="Pagination">
                        <div class="hidden sm:block">
                            <p class="text-sm text-gray-700">
                                Showing
                                <span class="font-medium">{{ currentPage }}</span>
                                of
                                <span class="font-medium">{{ totalPages }}</span>
                                results
                            </p>
                        </div>
                        <div class="flex flex-1 justify-between sm:justify-end">
                            <button :disabled="currentPage === 1" @click="previousPage"
                                class="relative inline-flex items-center rounded-md bg-white px-3 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Previous</button>
                            <button :disabled="currentPage === totalPages" @click="nextPage" href="#"
                                class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Next</button>
                        </div>
                    </nav> -->

                </div>
            </div>

        </div>
        <CoreSlideOver :show="showSlideOver" @update:show="closeSideModal" :title="computedSlideOverHeader.title"
            :description="computedSlideOverHeader.desc">
            <template #content>
                <AdsForm @success="showSlideOver = false" :ads="selectedAds"
                    v-if="route.query.action === 'edit' || route.query.action === 'create'" />
            </template>
        </CoreSlideOver>
    </main>
</template>

<script setup lang="ts">
import { formatDateTime } from '@/utils/generateDate'
import { useGetAllSponsoredAds } from '@/composables/sponsored-ads/fetch'
import { useDeleteSponsoredAds } from '@/composables/sponsored-ads/delete'
import { useGetAdsDashboardTotal } from '@/composables/sponsored-ads/adsDashboard';
const { deleteSponsoredAds, loading: deleting } = useDeleteSponsoredAds()
const { getAllSponsoredAds, ads: adsList, loading } = useGetAllSponsoredAds()
const { getAdsDahboardTotals, adsDashboardTotals, loading: showing } = useGetAdsDashboardTotal()
const showSlideOver = ref(false)
const selectedAds = ref({}) as Record<string, any>
const route = useRoute()
const router = useRouter()
getAllSponsoredAds()

definePageMeta({
    layout: 'dashboard'
})

onMounted(() => {
    getAdsDahboardTotals();
});

const itemsPerPage = 10;
const currentPage = ref(1);

//new
const sortKey = ref('clientName');
const sortOrder = ref('asc');

const sortedAds = computed(() => {
    const sorted = [...adsList.value].sort((a, b) => {
        let comparison = 0;

        switch (sortKey.value) {
            case 'clientName':
                comparison = a.clientName.localeCompare(b.clientName);
                break;
            case 'status':
                comparison = a.status.localeCompare(b.status);
                break;
            case 'startDate':
                comparison = new Date(a.startDate) - new Date(b.startDate);
                break;
            case 'endDate':
                comparison = new Date(a.endDate) - new Date(b.endDate);
                break;
            case 'createdAt':
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
                break;
            default:
                break;
        }

        return sortOrder.value === 'asc' ? comparison : -comparison;
    });
    return sorted;
});

const applySorting = () => {
    sortedAds.value;
};



// Computed property to get paginated data

// const paginatedAds = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return adsList.value.slice(start, end);
// });

const paginatedAds = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedAds.value.slice(start, end);
});

// Total pages calculation
const totalPages = computed(() => Math.ceil(adsList.value.length / itemsPerPage));

// Pagination controls
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};


const handleAds = (action: string, data?: any) => {
    if (action === 'edit') {
        selectedAds.value = data
        router.push({ path: route.path, query: { action: 'edit', id: data.id } })
        showSlideOver.value = true
    }
    if (action === 'delete') {
        deleteSponsoredAds(data.id)
    }

    if (action === 'create') {
        router.push({ path: route.path, query: { action: 'create' } })
        showSlideOver.value = true
    }
}

const computedSlideOverHeader = computed(() => {
    switch (route.query.action) {
        case 'create':
            return {
                title: 'Create Banner Ads',
                desc: 'Enter client name, upload sponsored file, start date, end date and target link to begin'
            }
        case 'edit':
            return {
                title: 'Edit Banner Ads',
                desc: 'Enter client name, upload sponsored file, start date, end date and target link to begin update'
            }
        case 'preview':
            return {
                title: 'Preview Banner Ads',
                desc: 'View sponsored ads details below.'
            }
        default:
            return {
                title: '',
                desc: ''
            }
    }
})

const closeSideModal = () => {
    router.push({ path: router.path })
    showSlideOver.value = false
}
</script>
