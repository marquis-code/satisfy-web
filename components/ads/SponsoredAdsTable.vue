<template>
    <main>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Sponsored Ads</h1>
                    <p class="mt-2 text-sm text-gray-700">A list of all the sponsored ads in your account including
                        their name,
                        title, email and role.</p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button" @click="handleAds('create')"
                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                        new ads</button>
                </div>
            </div>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Client Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">File
                                            Upload</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Target
                                            Link</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End date
                                        </th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(ads, idx) in adsList" :key="idx">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {{ ads.client_name ?? 'Nil' }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <img :src="ads.file_upload" alt="" class="rounded-full h-16 w-16">
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{ ads.target_link ?? 'Nil' }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ ads.start_date
                        ?? 'Nil' }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ ads.end_date ??
                        'Nil' }}</td>
                                        <td
                                            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div class="flex items-center gap-x-3">
                                                <a href.prevent="#" @click="handleAds('edit', ads)"
                                                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                        viewBox="0 0 24 24" fill="none" stroke="#4a4a4a"
                                                        stroke-width="2.5" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                        <line x1="3" y1="22" x2="21" y2="22"></line>
                                                    </svg>
                                                </a>
                                                <a href.prevent="#" @click="handleAds('delete', ads)"
                                                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                        viewBox="0 0 24 24" fill="none" stroke="#d0021b"
                                                        stroke-width="2.5" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path
                                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                        </path>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </a>
                                                <a href.prevent="#" @click="handleAds('view', ads)"
                                                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                        viewBox="0 0 24 24" fill="none" stroke="#4a4a4a"
                                                        stroke-width="2.5" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CoreSlideOver :show="showSlideOver" @update:show="false" :title="computedSlideOverHeader.title"
            :description="computedSlideOverHeader.desc">
            <template #content>
                <AdsForm :ads="selectedAds" v-if="route.query.action === 'edit' || route.query.action === 'create'" />
                <AdsDetails :ads="selectedAds" v-if="route.query.action === 'preview'" />
            </template>
        </CoreSlideOver>
    </main>
</template>

<script setup lang="ts">
import { useGetAllSponsoredAds } from '@/composables/sponsored-ads/fetch'
import { useDeleteSponsoredAds } from '@/composables/sponsored-ads/delete'
const { deleteSponsoredAds, loading: deleting } = useDeleteSponsoredAds()
const { getAllSponsoredAds, ads: adsList, loading } = useGetAllSponsoredAds()
const showSlideOver = ref(false)
const selectedAds = ref({}) as Record<string, any>
const route = useRoute()
const router = useRouter()
getAllSponsoredAds()

const handleAds = (action: string, data?: Record<string, any>) => {
    if (action === 'view') {
        selectedAds.value = data
        router.push({ path: route.path, query: { action: 'preview' } })
    }
    if (action === 'edit') {
        selectedAds.value = data
        router.push({ path: route.path, query: { action: 'edit' } })
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
                title: 'Create Sponsored Ads',
                desc: 'Enter client name, upload sponsored file, start date, end date and target link to begin'
            }
        case 'edit':
            return {
                title: 'Edit Sponsored Ads',
                desc: 'Enter client name, upload sponsored file, start date, end date and target link to begin update'
            }
        case 'preview':
            return {
                title: 'Preview Sponsored Ads',
                desc: 'View sponsored ads details below.'
            }
        default:
            return {
                title: '',
                desc: ''
            }
    }
})
</script>
