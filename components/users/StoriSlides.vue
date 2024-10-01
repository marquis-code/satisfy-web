<template>
    <main class="mx-9 my-5">
        <!-- <DashboardImageZoom v-if="item.coverImage" class="h-10 w-10" :src="item.coverImage" /> -->
        <div v-if="item.coverImage">
            <img :src="item.coverImage" class="h-10 w-10 rounded-full object-cover object-center" alt="avatar" />
        </div>
        <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
            {{ generateInitials(story?.user?.fname, story?.user?.lname) }}
        </div>
        <div class="text-sm my-1 font-bold leading-6 text-gray-900">{{ item.title }}</div>
        <div class="text-sm leading-6 text-gray-500">{{ item.content }}</div>
        <div class=" my-2 flex justify-between items-center">
            <div class="flex items-center gap-2 text-sm leading-6 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>{{ item.viewsCount ?? 'Nil' }}
            </div>

            <div class="text-sm leading-6 text-gray-300">{{ item.createdAt || 'Nil' }}</div>

        </div>

    </main>
</template>

<script setup lang="ts">
const props = defineProps<{
    item: any;
    story: any;
}>();

const generateInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};
</script>