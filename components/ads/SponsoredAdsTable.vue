<template>
    <main>
        <div class="px-4 sm:px-6 lg:px-8 space-y-6">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Banner Ads</h1>
                    <p class="mt-2 text-sm text-gray-700">A list of all the banner ads in your account including
                        their name,
                        title, email and role.</p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button" @click="handleAds('create')"
                        class="block rounded-sm bg-[#00A1C1] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                        new pod ads</button>
                </div>
            </div>
            <!-- <div>
                <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-10 pt-5 flex flex-col justify-between shadow sm:px-6 sm:pt-6">
                    <dt>
                      <p class="truncate font-semibold text-gray-900">Total Views</p>
                    </dt>
                    <dd class="flex justify-between items-center">
                      <p class="ml-2 flex items-baseline text-sm font-bold text-green-600">
                        <span class="sr-only"> Increased by </span>
                        <svg class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
                          </svg>
                        122
                      </p>
                      <p class="text-2xl font-semibold text-gray-900">53</p>
                    </dd>
                  </div>
                  <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <p class="ml-16 truncate text-sm font-medium text-gray-500">Total Clicks</p>
                    </dt>
                    <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p class="text-2xl font-semibold text-gray-900">58.16%</p>
                      <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg class="h-5 w-5 flex-shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
                        </svg>
                        <span class="sr-only"> Increased by </span>
                        5.4%
                      </p>
                    </dd>
                  </div>
                  <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <p class="ml-16 truncate text-sm font-medium text-gray-500">Total Impressions</p>
                    </dt>
                    <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p class="text-2xl font-semibold text-gray-900">24.57%</p>
                      <p class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                        <svg class="h-5 w-5 flex-shrink-0 self-center text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
                        </svg>
                        <span class="sr-only"> Decreased by </span>
                        3.2%
                      </p>
                    </dd>
                  </div>
                  <div class="relative overflow-hidden rounded-lg text-white bg-[#00A1C1] px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                    <h1 class="text-xl font-semibold">Create new Pod Ads</h1>
                    <p class="text-sm">Give your business the visibility it need to grow</p>
                  </div>
                </dl>
              </div> -->
          <div class="border-[0.5px] border-gray-50 rounded-lg">
            <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border-[0.5px] border-gray-50 rounded-lg">
                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                  <dt class="text-sm font-medium leading-6 text-gray-500">Total Banner Ads</dt>
                  <dd class="text-xs font-medium text-gray-700"></dd>
                  <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{{adsList.length}}</dd>
                </div>
                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                  <dt class="text-sm font-medium leading-6 text-gray-500">Total Clicks</dt>
                  <dd class="text-xs font-medium text-rose-600">+54.02%</dd>
                  <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">200</dd>
                </div>
                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                  <dt class="text-sm font-medium leading-6 text-gray-500">Total Impressions</dt>
                  <dd class="text-xs font-medium text-gray-700">-1.39%</dd>
                  <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">300</dd>
                </div>
                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-white bg-[#00A1C1] px-4 py-6 sm:px-6 xl:px-8">
                  <!-- <dt class="text-sm font-medium leading-6 text-gray-500">Expenses</dt>
                  <dd class="text-xs font-medium text-rose-600">+10.18%</dd>
                  <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$30,156.00</dd> -->
                  <h1 class="text-xl font-semibold">Create new Pod Ads</h1>
                  <p class="text-sm">Give your business the visibility it need to grow</p>
                </div>
              </dl>
          </div>
              
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div v-if="adsList.length && !loading"
                        class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Client Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">File
                                            Upload</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ads
                                            Link</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hits</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Created
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
                                            {{ ads.clientName ?? 'Nil' }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <DashboardImageZoom type="ads" v-if="ads.image" class="rounded-lg h-10 w-10"
                                                :src="ads.image" />
                                            <span v-else>Nil</span>
                                            <!-- <img v-if="ads.image" :src="ads.image" class="rounded-xl object-cover object-center" />
                                            <span v-else>Nil</span> -->
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a target="__blank" v-if="ads.link" :href="ads.link"
                                                class="underline text-green-600">{{ ads.link.slice(0, 10) + '.....' }}</a>
                                            <span v-else>Nil</span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{ ads.status
                                                ?? 'Nil' }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{ ads.hits
                                                ?? 'Nil' }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span v-if="ads?.startDate">
                                                <!-- {{ moment(ads?.startDate).format("MMM DD, YYYY, h:mm a") }} -->
                                                {{ formatDateTime(ads?.startDate) }}
                                            </span>
                                            <span v-else>Nil</span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span v-if="ads?.endDate">
                                                <!-- {{ moment(ads?.endDate).format("MMM DD, YYYY, h:mm a") }} -->
                                                {{ formatDateTime(ads?.endDate) }}
                                            </span>
                                            <span v-else>Nil</span>
                                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span v-if="ads?.createdAt">{{ formatDateTime(ads?.createdAt) }}</span>
                            <span v-else>Nil</span>
                        </td>
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
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <CoreEmptyState v-if="adsList.length <= 0 && !loading" title="No Ads available" desc="">
                    </CoreEmptyState>
                    <div v-if="loading" class="h-32 bg-slate-100 rounded"></div>
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
const { deleteSponsoredAds, loading: deleting } = useDeleteSponsoredAds()
const { getAllSponsoredAds, ads: adsList, loading } = useGetAllSponsoredAds()
const showSlideOver = ref(false)
const selectedAds = ref({}) as Record<string, any>
const route = useRoute()
const router = useRouter()
getAllSponsoredAds()

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
