<template>
    <main>
        <div v-if="storiesList.length && !loadingStories"
            class="inline-block min-w-full py-2 align-middle border-gray-100 rounded-b-lg border bg-white shadow">
            <div class="relative">
                <div v-if="selectedStori.length > 0"
                    class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button type="button"
                        class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                        Bulk edit
                    </button>
                    <button type="button"
                        class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                        Delete all
                    </button>
                </div>
                <table class="min-w-full table-fixed divide-y divide-gray-300">
                    <thead class="">
                        <tr>
                            <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                                <input type="checkbox"
                                    class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    :checked="indeterminate || selectedStori.length === storiesList.length"
                                    :indeterminate="indeterminate"
                                    @change="selectedStori = $event.target.checked ? storiesList.map((p) => p.id) : []" />
                            </th>
                            <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Cover Image
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Title
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Author
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Tags
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Comment Count
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Reactions Count
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Total Views Count
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Is Published
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 bg-white">
                        <tr class="odd:bg-gray-50" v-for="(stori, index) in storiesList" :key="index"
                            :class="[selectedStori.includes(stori.id) && 'bg-gray-50']">
                            <td class="relative px-7 sm:w-12 sm:px-6">
                                <div v-if="selectedStori.includes(stori.id)"
                                    class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
                                </div>
                                <input type="checkbox"
                                    class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    :value="stori.id" v-model="selectedStori" />
                            </td>
                            <td :class="[
            'whitespace-nowrap py-4 pr-3 text-xs font-medium',
            selectedStori.includes(stori.id)
                ? 'text-indigo-600'
                : 'text-gray-900',
        ]">
                                <DashboardImageZoom class="h-10 w-10" :src="stori.cover_image" />
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p class="font-medium text-gray-800 no-underline">{{
            stori?.title ?? "N/A" }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p v-if="stori?.user" class="font-medium text-gray-800 no-underline">
                                    {{ `${stori?.user?.fname} ${stori?.user?.lname}` }}</p>
                                <p v-else class="font-medium text-gray-800 no-underline">
                                    Nil</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div class="flex flex-wrap gap-2">
                                    <p v-for="category in splitCategories(stori.tags)" :key="category"
                                        class="no-underline text-gray-800 border border-gray-500 text-xs rounded-xl px-3 py-1">
                                        {{ category }}
                                    </p>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p class="no-underline text-gray-800">{{
            stori.comments_count ??
            "N/A" }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p class="no-underline text-gray-800">{{
            stori.reactions_count ??
            "N/A" }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p class="no-underline text-gray-800">{{
            stori.total_views_count ??
            "N/A" }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p class="no-underline text-gray-800">{{
            stori.is_published ??
            "N/A" }}</p>
                            </td>
                            <td
                                class="whitespace-nowrap text-center py-4 pl-3 pr-4 text-xs font-medium sm:pr-3 relative">
                                <button @click="toggleDropdown(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"
                                        fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                </button>
                                <div v-if="openDropdownIndex === index"
                                    class="absolute mt-1.5 w-32 bg-white -left-14 rounded-lg shadow-xl z-10">
                                    <div>
                                        <a href="#" @click.prevent="handleEditUer(stori)"
                                            class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                                            <span class="mx-1">
                                                Edit
                                            </span>
                                        </a>

                                        <a href="#" @click.prevent="deleteStory(stori.id)"
                                            class="flex items-center p-3 text-sm text-red-500 font-semibold capitalize transition-colors duration-300 transform">
                                            <span class="mx-1">
                                                Remove
                                            </span>
                                        </a>

                                        <a href="#" @click.prevent="toggleUserStatus(stori)"
                                            class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                                            <span class="mx-1">
                                                {{ stori.isActive ? "Suspend" : "Unsuspend" }}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useDeleteStory } from '@/composables/story/deleteUserStory';
import { useFetchUserStories } from "@/composables/user/fetchUserStories";
import { splitCategories } from "@/utils/splitCategories";
const {
    fetchUserStories,
    userStoriesList,
    loading: loadingUserStories,
} = useFetchUserStories();
const { deleteStory } = useDeleteStory()
const selectedStori = ref([]) as any;
const selectedOption = ref("") as any;
const selectedUser = ref({}) as any;
const showEditModal = ref(false) as any;

const props = defineProps({
    storiesList: {
        type: Array,
        default: () => [],
    },
    loadingStories: {
        type: Boolean,
        default: false,
    },
});
const formatter = ref({
    date: "DD MMM YYYY",
    month: "MMM",
});

const form = ref({
    category: "",
    isIndefinately: false,
    date: [] as any,
});

const isFormEmpty = computed(() => {
    if (form.value.isIndefinately) {
        return !!(form.value.category && form.value.date);
    } else {
        return !!form.value.category;
    }
});

const handleRemoveUser = (stori: any) => {
    openRemoveUserModal.value = true;
    selectedUser.value = stori;
};
const selectedStatus = ref("");

const openRemoveUserModal = ref(false);
const updateUserStatusModal = ref(false);

const openDropdownIndex = ref(null);

function toggleDropdown(index: any) {
    openDropdownIndex.value = openDropdownIndex.value === index ? null : index;
}

const indeterminate = computed(() => {
    return (
        selectedStori.value.length > 0 &&
        selectedStori.value.length < props.storiesList.length
    );
});
const toggleUserStatus = (user: any) => {
    selectedUser.value = user;
    updateUserStatusModal.value = true;
    if (user.isActive) {
        selectedStatus.value = "suspend";
    }

    if (!user.isActive) {
        selectedStatus.value = "reactivate";
    }
};
</script>

<style></style>