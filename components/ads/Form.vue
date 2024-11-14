<template>
    <main>
        <form @submit.prevent="route.query.action === 'edit' ? handleUpdateSponsoredAds() : handleCreateSponsoredAds()"
            class="pt-6 px-6 space-y-4">
            <div>
                <label for="client_name" class="block text-xs font-medium leading-6 text-gray-900">Client Name</label>
                <div class="mt-1">
                    <input type="text" v-model="payload.clientName" name="client_name" id="client_name" required
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="client_email" class="block text-xs font-medium leading-6 text-gray-900">Client Email
                    Address</label>
                <div class="mt-1">
                    <input type="email" v-model="payload.email" name="client_email" id="client_email" required
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="client_phone" class="block text-xs font-medium leading-6 text-gray-900">Client Phone
                    Number</label>
                <div class="mt-1">
                    <input type="tel" v-model="payload.phone" name="client_phone" id="client_phone"
                        pattern="^(\+?\d{1,3}?\d{9,14}|0\d{10})$"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm "
                        required>
                </div>
            </div>

            <div>
                <label for="ads_image" class="block text-xs font-medium leading-6 text-gray-900">Uploaded Ads
                    File</label>
                <p class="text-xs flex items-center font-medium gap-x-2 text-red-500">
                    <img src="@/assets/icons/info-icon.svg" alt="" class="h-4 w-4" />
                    NOTE: IMAGE WILL RENDER IN A RECTANGULAR FORM
                </p>

                <div>
                    <label class="">
                        <img v-if="imagePreview" :src="imagePreview" alt="Image Preview"
                            class="has-animation w-[328px] h-[140px] object-cover object-center mt-3 border-[0.8px] border-gray-400 shadow rounded-md" />
                        <img v-else src="@/assets/icons/dashboard/image-placeholder.svg" alt="Placeholder"
                            class="h-20 w-20 border-4" />
                        <input @change="onFileChange" type="file" class="hidden" required />
                    </label>
                </div>

                <button v-if="route.query.action === 'edit'" type="button" @click="triggerFileInput"
                    class="mt-2 text-blue-600 underline">Update Image</button>
            </div>

            <div v-if="isModalVisible" class="modal-wrap">
                <div class="modal-mask" @click="closeModal"></div>
                <div class="modal-scroll-view">
                    <div class="modal">
                        <button class=" text-sm bg-blue-600 text-white rounded-md px-4 py-1 mb-1"
                            @click="cropImage">Done</button>
                        <div class="modal-content">
                            <VuePictureCropper
                                :boxStyle="{ width: '100%', height: '100%', backgroundColor: '#f8f8f8', margin: 'auto' }"
                                :img="imageToCrop"
                                :options="{ viewMode: 1, dragMode: 'crop', aspectRatio: 328 / 140, responsive: true, autoCropArea: 1, minWidth: 1, minHeight: 1, maxWidth: 328, maxHeight: 140 }"
                                @ready="ready" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for="target_link" class="block text-xs font-medium leading-6 text-gray-900">Target Link</label>
                <div class="mt-1">
                    <input type="url" id="target_link" name="target_link" placeholder="" v-model="payload.targetLink"
                        required
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="start_date" class="block text-xs font-medium leading-6 text-gray-900">Start Date</label>
                <div class="mt-1">
                    <input type="date" v-model="payload.startDate" name="start_date" id="start_date" required
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="end_date" class="block text-xs font-medium leading-6 text-gray-900">End Date</label>
                <div class="mt-1">
                    <input type="date" v-model="payload.endDate" name="end_date" id="end_date" required
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                </div>
            </div>

            <div>
                <label for="client_audience" class="block text-xs font-medium leading-6 text-gray-900">Target
                    Audience</label>
                <div class="mt-1">
                    <select name="client_audience" v-model="payload.audience" id="client_audience"
                        class="block w-full rounded-md border-[0.6px] px-3  outline-none font-light py-3 text-gray-900 shadow-sm ">
                        <option value="auto">Auto</option>
                        <option value="location">Location</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>

            <div v-if="payload.audience !== 'location'">
                <label for="client_country" class="block text-xs font-medium leading-6 text-gray-900">Country
                    Code</label>
                <div class="mt-1">
                    <input type="text" :value="payload.countryCode" name="client_country" id="client_country" disabled
                        class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm">
                </div>
            </div>

            <div class="w-full pt-10">
                <button type="submit" :disabled="route.query.action === 'create' ? creating : updating"
                    class="disabled:opacity-25 disabled:cursor-not-allowed w-full py-3 rounded-md bg-green-600 text-white">{{
                        (creating || updating) ? 'Processing' : 'Submit' }}</button>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

import { useCreateSponsoredAds } from '@/composables/sponsored-ads/create';
import { useUpdateSponsoredAds } from '@/composables/sponsored-ads/update';
import { useUploadImageFile } from '@/composables/files/useUploadImageFile';
import { useRoute } from 'vue-router';

const { createSponsoredAds, payload, loading: creating, setSponsoredAds } = useCreateSponsoredAds();
const { updateSponsoredAds, payload: updatePayload, loading: updating, setSponsoredAdsUpdate } = useUpdateSponsoredAds();
const { uploadImageFile, uploadResponse, loading: uploading } = useUploadImageFile();
const route = useRoute();

const imagePreview = ref<string | null>(null);
const imageToCrop = ref<string | null>(null);
const isModalVisible = ref(false);
const width = ref(0)
const height = ref(0)

const props = defineProps({
    ads: {
        type: Object,
        default: () => ({})
    }
})
const uploadedAdsImage = ref('') as any;

onMounted(() => {
    if (route.query.action === 'edit') {
        payload.value.clientName = props.ads.clientName
        payload.value.email = props.ads.email //added this
        payload.value.phone = props.ads.phone //added this
        payload.value.imageUrl = props.ads.image
        payload.value.targetLink = props.ads.link
        payload.value.startDate = props.ads.startDate
        payload.value.endDate = props.ads.endDate
        // payload.value.status = props.ads.status
        imagePreview.value = props.ads.image
    }
});

const originalFileName = ref("");

const onFileChange = (e: Event) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            useNuxtApp().$toast.error("Please upload a file in JPG, JPEG, or PNG format.", { autoClose: 5000 });
            imagePreview.value = null;
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            useNuxtApp().$toast.error("File size exceeds the maximum limit of 2MB.", { autoClose: 5000 });
            imagePreview.value = null;
            return;
        }

        originalFileName.value = file.name;
        imageToCrop.value = URL.createObjectURL(file);
        isModalVisible.value = true;
    } else {
        imagePreview.value = null;
    }
};


const closeModal = () => {
    isModalVisible.value = false;
    imageToCrop.value = null;
};


const cropImage = () => {

    if (cropper) {
        const croppedDataURL = cropper.getDataURL();
        imagePreview.value = croppedDataURL;
        const byteString = atob(croppedDataURL.split(',')[1]);
        const mimeString = croppedDataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });
        const file = new File([blob], originalFileName.value, { type: mimeString });

        const img = new Image();
        img.onload = () => {
            width.value = img.width;
            height.value = img.height;

            console.log("Cropped image dimensions:", width.value, height.value);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', 'asset');

            uploadImageFile(formData);

        };

        uploadedAdsImage.value = file;

        img.src = croppedDataURL;
        console.log(file)
        closeModal();
    } else {
        console.error("Cropper instance is not available.");
    }
};

const emit = defineEmits(['success'])


const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.click();
    }
};

const handleCreateSponsoredAds = () => {
    const formData = {
        clientName: payload.value.clientName,
        email: payload.value.email,
        phone: payload.value.phone,
        imageUrl: uploadResponse.value.url,
        targetLink: payload.value.targetLink,
        startDate: payload.value.startDate,
        endDate: payload.value.endDate,
        // userId :payload.value.userId || generateUUID(),
        status: payload.value.status,
        audience: payload.value.audience,
        amountPaid: payload.value.amountPaid,
        countryCode: payload.value.countryCode,
        // sponsoredAdCategories:  [{ categoryId: "6d503f03-1195-4219-948d-4933028f9208" }] 
    };
    setSponsoredAds(formData);
    createSponsoredAds().then(() => {
        emit('success');
    }).catch(error => {
        console.error("Error creating sponsored ad:", error);
    });
};

const handleUpdateSponsoredAds = () => {
    const formData = {
        clientName: payload.value.clientName,
        imageUrl: uploadResponse.value.url,
        targetLink: payload.value.targetLink,
        startDate: payload.value.startDate,
        endDate: payload.value.endDate,
        // status: payload.value.status,
    }
    setSponsoredAdsUpdate(formData);
    updateSponsoredAds().then(() => {
        emit('success');
    });
};
</script>