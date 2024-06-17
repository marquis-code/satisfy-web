<template>
    <main>
        <section class="pt-6 lg:px-6 space-y-4 h-full">
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
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm font-medium">Select mode of uploading stori</p>
                    <select v-model="uploadType" class="border rounded-lg py-2 text-sm outline-none mt-3">
                        <option value="manual">Create pod manually</option>
                        <option value="upload">Create pod via Upload</option>
                    </select>
                </div>
                <fieldset class="flex flex-wrap gap-3">
                    <legend class="sr-only">Color</legend>

                    <label v-for="color in colors" :key="color.key" :for="color.key"
                        :style="{ backgroundColor: color.code }"
                        class="block size-8 cursor-pointer rounded-full bg-black shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2">
                        <input type="radio" @change="handleColorChange" name="ColorOption" :value="color.key"
                            :id="color.key" class="sr-only" />

                        <span class="sr-only"> {{ color.name }}: {{ color.code }} </span>
                    </label>

                    <label for="ColorRed"
                        class="block size-8 cursor-pointer rounded-full bg-red-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-red-500 has-[:checked]:ring-offset-2">
                        <input type="radio" name="ColorOption" value="ColorRed" id="ColorRed" class="sr-only" />

                        <span class="sr-only">Fiesta Red</span>
                    </label>

                    <label for="ColorBlue"
                        class="block size-8 cursor-pointer rounded-full bg-blue-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-blue-500 has-[:checked]:ring-offset-2">
                        <input type="radio" name="ColorOption" value="ColorBlue" id="ColorBlue" class="sr-only" />

                        <span class="sr-only">Cobalt Blue</span>
                    </label>

                    <label for="ColorGold"
                        class="block size-8 cursor-pointer rounded-full bg-amber-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2">
                        <input type="radio" name="ColorOption" value="ColorGold" id="ColorGold" class="sr-only" />

                        <span class="sr-only">Goldtop</span>
                    </label>
                </fieldset>
            </div>

            <StoriesSlidesManager @content="handleManualContent" v-if="uploadType === 'manual'" />
            <div v-if="uploadType === 'upload'">
                <h1 class="text-sm font-medium">Upload a PDF or TXT file</h1>
                <CoreFileUploader @content="handleStoriContent" :description="payload.description" />
            </div>
            <StoriesTagInput @content="handleTagContent" />

            <div class="flex justify-end items-end pt-32">
                <div class="flex gap-x-3">
                    <button type="button"
                        class="text-[#0BA9B9] border border-gray-400 text-sm font-semibold rounded-lg px-6 py-3 w-full">Cancel</button>
                    <button type="button" @click="handleCreateUserStory"
                        class="text-white bg-[#0BA9B9] font-semibold text-sm rounded-lg px-6 py-3 w-full">
                        {{ loading ? 'processing..' : 'Pod it' }}
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>


<script setup lang="ts">
import { useColors } from '@/composables/core/useColors';
const { colors } = useColors();
import { useRoute } from 'vue-router'
import { useCreateUserStory } from "@/composables/story/createById";
import { useUploadImageFile } from '@/composables/files/useUploadImageFile'
const { uploadImageFile, uploadResponse, loading: uploading } = useUploadImageFile()

const { createUserStory, payload, loading, descriptionLength, setPayload } = useCreateUserStory();
const uploadType = ref('upload');
const manualPodList = ref<string[]>([]);
const actualManualPod = ref<string>('');
const uploadedFileList = ref<any[]>([]);
const uploadedTagsList = ref<any[]>([]);
const uploadedPodCover = ref('') as any;
const slideColor = ref('') as any;
const manualContentList = ref([]) as any
// const coverImage = ref('') as any
const route = useRoute();

const imagePreview = ref('') as any


const setDescriptionLength = (value: string) => {
    payload.value.description = value;
};

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', 'asset');

        uploadImageFile(formData);

        uploadedPodCover.value = file;
        imagePreview.value = URL.createObjectURL(file);
    } else {
        imagePreview.value = null;
    }
};

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
    manualContentList.value = data;
}

const handleCreateUserStory = () => {
    const computedSlides = uploadedFileList.value.map((item: any) => ({
        mediaType: "text/plain",
        title: payload.value.title,
        content: item.text,
        coverImage: null,
        backgroundColor: slideColor.value || '0xFF39349A',
        isVisible: true,
        mediaUrl: null,
        fontFamily: "DancingScript_regular"
    }));

    const computedManualSlides = manualContentList.value.map((item: any) => ({
        mediaType: "text/plain",
        title: payload.value.title,
        content: item.text,
        coverImage: null,
        backgroundColor: slideColor.value || '0xFF39349A',
        isVisible: true,
        mediaUrl: null,
        fontFamily: "DancingScript_regular"
    }));

    const computedStoryCategories = uploadedTagsList.value.map((item: any) => ({
        categoryId: item.id,
    }));

    const finalPayload = {
        isPublished: true,
        title: payload.value.title,
        tags: "",
        coverImage: uploadResponse.value.url,
        userId: route.params.id,
        slides: uploadType.value === 'manual' ? computedManualSlides : computedSlides,
        storyCategories: computedStoryCategories
    };

    // Set the payload and then call the createUserStory function
    setPayload(finalPayload);
    createUserStory().then(response => {
        console.log('User story created successfully', response);
    }).catch(error => {
        console.error('Error creating user story', error);
    });
};

const handleTagContent = (data: any) => {
    uploadedTagsList.value = data.value
}

const handleColorChange = (e: any) => {
    console.log(e.target.value, 'selectd')
    slideColor.value = e.target.value
}

</script>