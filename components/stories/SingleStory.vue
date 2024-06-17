<template>
    <main>
        <div class="rounded-lg border border-gray-200 space-y-6 relative pt-4">
            <div class="flex justify-end items-end pr-4">
                <svg @click="toggleDropdown(stori.id)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </div>
            <div v-if="openDropdownIndex === stori.id"
                class="absolute mt-1.5 w-32 bg-white top-3 right-2 rounded-lg border-[0.4px] border-gray-200 shadow-xl z-10">
                <div>
                    <a href="#" @click.prevent="handleNotifyUser(stori.id)"
                        class="flex items-center p-3 text-sm text-gray-700 font-bold hover:text-gray-900  capitalize transition-colors duration-300 transform">
                        <span class="mx-1">
                            Notify User
                        </span>
                    </a>

                    <a href="#" @click="handleRemoveStory(stori)"
                        class="flex items-center p-3 text-sm text-red-500 font-bold hover:text-red-700 capitalize transition-colors duration-300 transform ">
                        <span class="mx-1">
                            Remove
                        </span>
                    </a>
                </div>
            </div>
            <div class="px-4">
                <DashboardImageZoom v-if="stori?.cover_image" class="h-10 w-10 rounded-full object-cover object-center" alt="" :src="stori?.cover_image" />
                <img v-else src="@/assets/img/stori.png" class="h-10 w-10 rounded-full" alt="" />
            </div>
            <h1 class="px-4 text-sm text-gray-700">{{ stori?.title ?? 'Nil' }}</h1>
            <div class="flex justify-between items-center px-4 pb-14">
                <div class="flex items-center gap-x-2 font-medium text-gray-600"><img src="@/assets/icons/reactions.svg"
                        alt="" /> {{
                    stori?.reactions_count ?? 'Nil' }}</div>
                <img src="@/assets/icons/stori-eclipse.svg" alt="" />
            </div>
            <div class="absolute w-full bottom-0">
                <div class="border-t border-gray-300 flex justify-end items-end">
                    <p class="text-gray-400 text-xs font-light px-4 py-3">
                        <span v-if="stori?.created_at">{{ moment(stori?.created_at).format("MMM DD, YYYY") }}</span>
                        <span v-else>Nil</span>
                    </p>
                </div>
            </div>
        </div>

        <CoreBaseModal :show="openRemoveStoryModal" @update:show="false">
            <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
                <div>
                    <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
                </div>
                <div>
                    <h1 class="font-semibold text-xl">Remove story</h1>
                    <p class="text-gray-500">
                        Are you sure you want to delete this story? This action cannot be undone.
                    </p>
                </div>
                <div class="flex justify-end items-end gap-x-3 w-full pt-6">
                    <button @click="openRemoveStoryModal = false"
                        class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
                        Cancel
                    </button>
                    <button :disabled="processingDelete || processingDelete" @click="handleRemoveUser"
                        class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
                        {{ processingDelete ? "processing..." : "Remove" }}
                    </button>
                </div>
            </section>
        </CoreBaseModal>


        <CoreBaseModal :show="openNotifyUserModal" @update:show="openNotifyUserModal = false">
            <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
                <div>
                    <h1 class="font-semibold text-xl">Notify user</h1>
                    <p class="text-gray-500">
                        Use this form to send a user update
                    </p>
                </div>
                <div>
                    <select v-model="form.category">
                        <option>Violation of story policies</option>
                    </select>
                </div>
                <div>
                    <TextEditor />
                </div>
                <!-- <div>
                    <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
                </div>
                <div>
                    <h1 class="font-semibold text-xl">Remove story</h1>
                    <p class="text-gray-500">
                        Are you sure you want to delete this story? This action cannot be undone.
                    </p>
                </div>
                <div class="flex justify-end items-end gap-x-3 w-full pt-6">
                    <button @click="openRemoveStoryModal = false"
                        class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
                        Cancel
                    </button>
                    <button :disabled="processingDelete || processingDelete" @click="handleRemoveUser"
                        class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
                        {{ processingDelete ? "processing..." : "Remove" }}
                    </button>
                </div> -->
            </section>
        </CoreBaseModal>
    </main>
</template>

<script setup lang="ts">
import moment from "moment"
const activeTab = ref('insight')
defineProps({
    stori: {
        type: Object,
        required: true
    },
})

const handleRemoveStory = (stori: any) => {
    openRemoveStoryModal.value = true
};

const handleNotifyUser = (stori: any) => {
    openNotifyUserModal.value = true
}

const openRemoveStoryModal = ref(false)
const openNotifyUserModal = ref(false)

const form = ref({
    category: '',
    description: ''
})

const openDropdownIndex = ref(null);

function toggleDropdown(id: any) {
    openDropdownIndex.value = openDropdownIndex.value === id ? null : id;
}
</script>