<template>
    <main>
        <form @submit.prevent="computedFormAction" class="pt-6 px-6 space-y-4">
            <div>
                <label for="client_name" class="block text-xs font-medium leading-6 text-gray-900">Client Name</label>
                <div class="mt-1">
                    <input type="text" v-model="payload.client_name" name="client_name" id="client_name"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="last-name" class="block text-xs font-medium leading-6 text-gray-900">Uploaded Ads
                    File</label>
                <div class="col-span-full" v-if="route.query.action === 'create'">
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                <label for="create-file-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input @change="handleFileChange" id="create-file-upload" name="create-file-upload"
                                        type="file" class="sr-only">
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <div v-if="imagePreview">
                        <img :src="imagePreview" alt="Image Preview" />
                    </div>
                </div>
                <div class="col-span-full" v-if="route.query.action === 'edit'">
                    <div v-if="ads.file_upload && !!!imagePreview?.length">
                        <img :src="ads.file_upload" alt="Image Preview"
                            class="w-32 h-32 rounded-md object-cover object-center" />
                    </div>
                    <div v-else class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                <label for="edit-file-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input @change="handleFileChange" id="edit-file-upload" name="edit-file-upload" type="file" class="sr-only">
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for="target_link" class="block text-xs font-medium leading-6 text-gray-900">Target Link</label>
                <div class="mt-1">
                    <input type="url" id="target_link" name="target_link" placeholder="https://example.com"
                        v-model="payload.target_link"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="start_date" class="block text-xs font-medium leading-6 text-gray-900">Start Date</label>
                <div class="mt-1">
                    <input type="date" v-model="payload.start_date" name="start_date" id="start_date"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="end_date" class="block text-xs font-medium leading-6 text-gray-900">End Date</label>
                <div class="mt-1">
                    <input type="date" v-model="payload.end_date" name="end_date" id="end_date"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div class="w-full pt-10">
                <button type="submit" :disabled="route.query.action === 'create' ? creating : updating"
                    class="disabled:opacity-25 disabled:cursor-not-allowed w-full py-3 rounded-md bg-green-600 text-white">{{
            (creating || updating) ? 'processing' : 'Submit'}}</button>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
import { useCreateSponsoredAds } from '@/composables/sponsored-ads/create'
import { useUpdateSponsoredAds } from '@/composables/sponsored-ads/update'
const { createSponsoredAds, payload, loading: creating } = useCreateSponsoredAds()
const { updateSponsoredAds, payload: updatePayload, loading: updating } = useUpdateSponsoredAds()
const route = useRoute()

const props = defineProps({
    ads: {
        type: Object,
        default: () => { }
    }
})

onMounted(() => {
    if (route.query.action === 'edit') {
        payload.value = props.ads
    }
})

const computedFormAction = computed(() => {
    switch (route.query.action) {
        case 'edit':
            return updateSponsoredAds
        case 'create':
            return createSponsoredAds
        default:
            return createSponsoredAds
    }
})

const imagePreview = ref<string | null>(null)
const imageBase64 = ref<string | null>(null)

const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string
            imageBase64.value = (e.target?.result as string).split(',')[1]
        }
        reader.readAsDataURL(file)
    }
}
</script>
