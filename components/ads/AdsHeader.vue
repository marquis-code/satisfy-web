<template>
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Banner Ads</h1>
            <p class="mt-2 text-sm text-gray-700">A list of all the banner ads in your account including
                their name,
                title, email and role.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <!-- <button type="button" @click="handleAds('create')"
            class="block rounded-sm bg-[#00A1C1] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
            new banner ads</button> -->
        </div>
    </div>
    <div class="border-[0.5px] border-gray-50 rounded-lg">
        <!-- dl class: class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border-[0.5px] border-gray-50 rounded-lg"> -->
        <dl class="mx-auto grid grid-cols-4 gap-px bg-gray-900/5 border-[0.5px] border-gray-50 rounded-lg">

            <div
                class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">Total Banner Ads</dt>
                <dd class="text-xs font-medium text-gray-700"></dd>
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{{ total
                    }}
                </dd>
            </div>
            <div
                class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">Total Clicks</dt>
                <dd class="text-xs font-medium text-rose-600">+54.02%</dd>
                <!-- <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">200</dd> -->
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {{ clicks }}</dd>

            </div>
            <div
                class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">Total Impressions</dt>
                <dd class="text-xs font-medium text-gray-700">-1.39%</dd>
                <!-- <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">300</dd> -->
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {{ impressions }}</dd>
            </div>
            <!-- <div
            class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-white bg-[#00A1C1] px-4 py-6 sm:px-6 xl:px-8">
            <h1 class="text-xl font-semibold">Create new Banner Ads</h1>
            <p class="text-sm">Give your business the visibility it need to grow</p>
          </div> -->
            <div @click="handleAds('create')"
                class="cursor-pointer flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-white bg-[#00A1C1] px-4 py-6 sm:px-6 xl:px-8">
                <h1 class="text-xl font-semibold">Create new Banner Ads</h1>
                <p class="text-sm">Give your business the visibility it needs to grow</p>
            </div>
        </dl>
    </div>
</template>

<script setup lang="ts">
defineProps({
    total: {
        type: Number,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
    },
    impressions: {
        type: Number,
        required: true,
    },
    handleAds: {
        type: Function as PropType<(action: string, data?: any) => void>,
        required: true,
    },

})
</script>

<style scoped></style>