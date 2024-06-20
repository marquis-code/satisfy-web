<template>
    <main class="">
        <div class="space-y-6">
            <div class="flex justify-end items-end">
                <div class="w-3/12">
                    <CoreDateInput v-model="dateFilter" range placeholder="Filter by date" :disabled-date="() => null"
                        clearable />
                </div>
            </div>
            <section v-if="!loading && Object.keys(dashboardSummary).length"
                class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-8">
                <div class="flex justify-center items-center flex-col gap-y-6 rounded-2xl p-4 lg:p-7"
                    v-for="(value, key) in dashboardSummary" :key="key" :class="computedCardColor(key)">
                    <h1 class="font-semibold text-lg">{{ modifyCardTitle(key) }}</h1>
                    <div class="flex items-center flex-col gap-x-4 lg:gap-x-6 mt-3 gap-y-6">
                        <h1 class="text-xl lg:text-2xl font-semibold">{{ value.total || 0 }}</h1>
                        <div class="flex items-center gap-x-2">
                            <img v-if="value.growth >= 0" src="@/assets/icons/dashboard/increase.svg" alt="" />
                            <img v-if="value.growth < 0" src="@/assets/icons/dashboard/decrease.svg" alt="" />
                            <p class="" :class="[value.growth >= 0 ? 'text-green-600' : 'text-red-600']">
                                {{ Math.round(value.growth) || 0 }}%
                            </p>
                        </div>
                    </div>
                    <p class="text-[#6E717C] text-sm">Compared from Last Month</p>
                </div>
            </section>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8"
                v-if="loading && !Object.keys(dashboardSummary).length">
                <div v-for="itm in 4" :key="itm" class="h-[200px] bg-slate-300 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useFetchDashboardSummary } from '@/composables/dashboard/getDashboardSummary'
const { fetchDashboardSummary, dashboardSummary, loading } = useFetchDashboardSummary()
const dateFilter = ref(null) as any

watch(dateFilter, ((val) => {
    fetchDashboardSummary()
}))
fetchDashboardSummary()

const modifyCardTitle = (data: string) => {
    switch (data) {
        case 'active_users':
            return 'Total Active Users'
        case 'signups':
            return 'Sign ups'
        case 'story':
            return 'Pods'
        case 'engagement':
            return 'Engagement'
        default:
            return 'Pods'
    }
}
const computedCardColor = (data: string) => {
    switch (data) {
        case 'active_users':
            return 'bg-[#FDF5F5]'
        case 'signups':
            return 'bg-[#ECFCFE]'
        case 'story':
            return 'bg-[#FFF8E3]'
        case 'engagement':
            return 'bg-[#f9efff]'
        default:
            return 'bg-[#f9efff]'
    }
}
definePageMeta({
    layout: 'dashboard'
})
</script>