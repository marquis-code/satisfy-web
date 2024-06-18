<template>
    <main>
        <section class="pt-6 lg:px-6 space-y-4 h-full">
            <p class="flex justify-end items-end text-sm">created by {{ user.user.firstname }} {{ user.user.lastname }}
                on 15th September 2022, 10:14 AM</p>
            <div class="space-y-3">
                <p class="text-gray-900 font-medium text-sm">Pod Cover</p>
                <div>
                    <label class="">
                        <img v-if="!uploading && Object.keys(uploadResponse).length" :src="imagePreview" alt=""
                            class="has-animation h-20 w-20 object-cover object-center border-[0.8px] border-gray-400 shadow rounded-full" />
                        <div v-if="uploading && !Object.keys(uploadResponse).length"
                            class="h-20 w-20 rounded-full bg-slate-100"></div>
                        <img v-if="!imagePreview" src="@/assets/icons/dashboard/camera.svg" alt="" class="h-20 w-20" />
                        <input @change="onFileChange" type="file" class="hidden" />
                    </label>
                </div>
            </div>

            <div class="w-full space-y-1">
                <label for="title" class="text-xs md:text-sm font-medium">Title</label>
                <input v-model="payload.title" name="title" id="title"
                    class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3" type="text" />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                    <p class="text-sm font-medium">Select mode of uploading stori</p>
                    <select v-model="uploadType" class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option value="manual">Create pod manually</option>
                        <option value="upload">Create pod via Upload</option>
                    </select>
                </div>

                <fieldset class="flex flex-wrap gap-3">
                    <legend class="text-sm font-medium">Select stori background color</legend>

                    <label v-for="color in colors" :key="color.key" :for="color.key"
                        :style="{ backgroundColor: color.code }"
                        class="block size-8 cursor-pointer rounded-full bg-black shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2">
                        <input type="radio" @change="handleColorChange(color, $event)" name="ColorOption"
                            :value="color.key" :id="color.key" class="sr-only" />

                        <span class="sr-only"> {{ color.name }}: {{ color.code }} </span>
                    </label>
                </fieldset>
                <div>
                    <p class="text-sm font-medium">Select stori font</p>
                    <select @change="applyFont" v-model="selectedFont"
                        class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option :value="item.code" v-for="item in fontsList" :key="item.code">{{ item.name }}</option>
                    </select>
                </div>

                <div>
                    <p class="text-sm font-medium">Select stori alignment</p>
                    <select @change="applyAlignment" v-model="selectedTextAlignment"
                        class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option :value="item.code" v-for="item in textAlignmentList" :key="item.code">{{ item.name }}
                        </option>
                    </select>
                </div>

                <div>
                    <p class="text-sm font-medium">Select stori visibility</p>
                    <select v-model="selectedVisibilityStatus" class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option :value="item.code" v-for="item in storiVisibilityList" :key="item.name">{{ item.name }}
                        </option>
                    </select>
                </div>

                <div>
                    <p class="text-sm font-medium">Select stori publication status</p>
                    <select v-model="selectedPublicationStatus"
                        class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option :value="item.code" v-for="item in storiPublicationStatusList" :key="item.name">{{
                item.name }}</option>
                    </select>
                </div>
            </div>

            <StoriesSlidesManager :selectedTextAlignment="selectedTextAlignment" :selectedFont="selectedFont"
                :color="hexaColor" @content="handleManualContent" v-if="uploadType === 'manual'" />
            <div v-if="uploadType === 'upload'">
                <h1 class="text-sm font-medium">Upload a PDF or TXT file</h1>
                <CoreFileUploader :selectedFont="selectedFont" :color="hexaColor" @content="handleStoriContent"
                    :description="payload.description" />
            </div>
            <StoriesTagInput @content="handleTagContent" />

            <div class="flex justify-end items-end pt-32">
                <div class="flex gap-x-3">
                    <button type="button" @click="handleCancellation"
                        class="text-[#0BA9B9] border border-gray-400 text-sm font-semibold rounded-lg px-6 py-3 w-full">Cancel</button>
                    <button :disabled="!isButtonEnabled" type="button" @click="handleCreateUserStory"
                        class="text-white disabled:cursor-not-allowed disabled:opacity-25 bg-[#0BA9B9] font-semibold text-sm rounded-lg px-6 py-3 w-full">
                        {{ loading ? 'processing..' : 'Pod it' }}
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>


<script setup lang="ts">
import Swal from "sweetalert2";
import { useLogin } from '@/composables/auth/login'
import { useColors } from '@/composables/core/useColors';
import { useFontFamily } from '@/composables/core/useFontFamily'
const { colors } = useColors();
import { useRoute } from 'vue-router'
import { useCreateUserStory } from "@/composables/story/createById";
import { useUploadImageFile } from '@/composables/files/useUploadImageFile'
import { useTextAlignment } from '@/composables/core/useTextAlignment'
const { textAlignmentList } = useTextAlignment()
const { uploadImageFile, uploadResponse, loading: uploading } = useUploadImageFile()
const { user } = useLogin()
const selectedFont = ref('Lato') as any
const selectedTextAlignment = ref('center') as any

const { createUserStory, payload, loading, descriptionLength, setPayload } = useCreateUserStory();
const { fontsList } = useFontFamily()
const uploadType = ref('upload');
const manualPodList = ref<string[]>([]);
const actualManualPod = ref<string>('');
const uploadedFileList = ref<any[]>([]);
const uploadedTagsList = ref<any[]>([]);
const uploadedPodCover = ref('') as any;
const slideColor = ref('') as any;
const manualContentList = ref([]) as any
const hexaColor = ref('') as any
// const coverImage = ref('') as any
const route = useRoute();

const storiVisibilityList = ref([
    {
        code: true,
        name: 'True'
    },
    {
        code: false,
        name: 'False'
    }
])

const storiPublicationStatusList = ref([
    {
        code: true,
        name: 'True'
    },
    {
        code: false,
        name: 'False'
    }
])

const selectedPublicationStatus = ref(true) as any
const selectedVisibilityStatus = ref(true) as any

const imagePreview = ref('') as any

const applyFont = () => {
    document.querySelector('.text-preview')?.setAttribute('style', `font-family: ${selectedFont.value}`)
};

const applyAlignment = () => {
    document.querySelector('.text-preview')?.setAttribute('style', `text-align: ${selectedTextAlignment.value}`)
};


const setDescriptionLength = (value: string) => {
    payload.value.description = value;
};


const onFileChange = (e: Event) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
        // Check file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            useNuxtApp().$toast.error("Please upload a file in JPG, JPEG, or PNG format.", {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            // alert("");
            imagePreview.value = null;
            return;
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            useNuxtApp().$toast.error("File size exceeds the maximum limit of 5MB.", {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            // alert("");
            imagePreview.value = null;
            return;
        }

        // If file is valid
        if (file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', 'asset');

            uploadImageFile(formData);

            uploadedPodCover.value = file;
            imagePreview.value = URL.createObjectURL(file);
        } else {
            imagePreview.value = null;
        }
    } else {
        imagePreview.value = null;
    }
};

// Placeholder function for uploadImageFile, replace it with your actual implementation.
// const uploadImageFile = (formData: FormData) => {
//     // Your upload logic here
// };


// const onFileChange = (e: Event) => {
//     const target = e.target as HTMLInputElement;
//     const file = target.files ? target.files[0] : null;
//     if (file && file.type.startsWith("image/")) {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('fileType', 'asset');

//         uploadImageFile(formData);

//         uploadedPodCover.value = file;
//         imagePreview.value = URL.createObjectURL(file);
//     } else {
//         imagePreview.value = null;
//     }
// };

const handleSelectedType = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    uploadType.value = target.value;
};

const handleText = (data: string) => {
    actualManualPod.value = data;
};

const handlePodSave = () => {
    manualPodList.value.push(actualManualPod.value);
    actualManualPod.value = '';
};

const handleStoriContent = (data: any) => {
    uploadedFileList.value = data;
};

const handleManualContent = (data: any) => {
    console.log(data, 'my data')
    manualContentList.value = data;
}

const computedSlides = computed(() => {
    return uploadedFileList.value.map((item: any) => ({
        mediaType: "text/plain",
        title: payload.value.title,
        content: item.text,
        coverImage: uploadResponse.value.url,
        backgroundColor: slideColor.value || '0xFF39349A',
        isVisible: selectedVisibilityStatus.value || true,
        mediaUrl: null,
        fontFamily: selectedFont.value || 'Lato',
        textAlignment: selectedTextAlignment.value || 'center'
    }));
})

const computedManualSlides = computed(() => {
    return manualContentList.value.map((item: any) => ({
        mediaType: "text/plain",
        title: payload.value.title,
        content: item.text,
        coverImage: uploadResponse.value.url,
        backgroundColor: slideColor.value || '0xFF39349A',
        isVisible: selectedVisibilityStatus.value || true,
        mediaUrl: null,
        fontFamily: selectedFont.value || 'Lato',
        textAlignment: selectedTextAlignment.value || 'center'
    }));
})
const computedStoryCategories = computed(() => {
    return uploadedTagsList.value.map((item: any) => ({
        categoryId: item.id,
    }));
})

const handleCreateUserStory = () => {
    const finalPayload = {
        isPublished: selectedPublicationStatus.value,
        title: payload.value.title,
        tags: "",
        coverImage: uploadResponse.value.url,
        userId: route.params.id,
        slides: uploadType.value === 'manual' ? computedManualSlides.value : computedSlides.value,
        storyCategories: computedStoryCategories.value,
    };

    // Set the payload and then call the createUserStory function
    setPayload(finalPayload);
    console.log(finalPayload, 'final pay')
    createUserStory().then(response => {
        useNuxtApp().$toast.success("Story was published successfully", {
            autoClose: 5000,
            dangerouslyHTMLString: true,
        })
    }).catch(error => {
        useNuxtApp().$toast.error("Something went wrong!", {
            autoClose: 5000,
            dangerouslyHTMLString: true,
        });
    });
};

const handleTagContent = (data: any) => {
    uploadedTagsList.value = data.value
}

const handleColorChange = (color: any, e: any) => {
    hexaColor.value = color.code
    slideColor.value = e.target.value
}

const isButtonEnabled = computed(() => {
    return !!(selectedPublicationStatus.value && payload.value.title && uploadResponse.value.url && route.params.id && (computedManualSlides.value || computedSlides.value) && computedStoryCategories.value)
})

const handleCancellation = () => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cancel Story",
        cancelButtonText: "Nah, Just kidding",
    }).then((result: any) => {
        if (result.value) {
            // selectedPublicationStatus.value = null
            payload.value.title = null
            // uploadResponse.value.url = null
            uploadedFileList.value = []
            uploadedTagsList.value = []
            // uploadedPodCover.value = ''
            manualPodList.value = []
            slideColor.value = ''
            manualContentList.value = []
            hexaColor.value = ''
        } else {
            Swal.fire("Cancelled", "Action was cancelled", "info");
        }
    });
}
</script>