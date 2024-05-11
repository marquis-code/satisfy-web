<template>
    <main>
        <!-- {{ followersCount }}
        {{ followingsCount }} -->
        <UsersTabs @selected="handleSelected" />
        <section v-if="activeProfileView === 'insight'"
            class="bg-white p-6 border-[0.1px] border-gray-100 shadow-sm rounded-lg space-y-10">
            <section>
                <div v-if="!loading && Object.keys(user).length">
                    <h1 class="text-[#101828] font-medium text-base">User Information</h1>
                    <UsersProfileHeader :user="user" :loadingUser="loading" :userStats="userStats"
                        :activeTable="activeTable" :activeTab="activeTab" />
                </div>
                <div class="w-full" v-if="loading && !Object.keys(user).length">
                    <div class="h-[100px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                </div>
            </section>
            <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <UsersProfileDetails v-if="!loading && Object.keys(user).length" class="w-full"
                        :userStats="userStats" :user="user" :loadingUser="loading" />
                    <div class="w-full" v-if="loading && !Object.keys(user).length">
                        <div class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
                <div>
                    <div v-if="!loading && Object.keys(user).length" class="bg-[#F3F2F2] rounded-md border-[0.1px] p-4">
                        <ChartsStoriCharts class="w-full" />
                        <ChartsStoriCharts class="w-full" />
                    </div>
                    <div class="w-full" v-if="loading && !Object.keys(user).length">
                        <div class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { useFetchFollowersCount } from '@/composables/user/getFollowersCount'
import { useFetchFollowingsCount } from '@/composables/user/getFollowingsCount'
import { useFetchUserById } from '@/composables/user/getUserById'
const activeTab = ref("default")
const { fetchUser, user, loading } = useFetchUserById()
const { fetchFollowersCount, followersCount, loading: loadingFollowersCount } = useFetchFollowersCount()
const { fetchFollowingsCount, followingsCount, loading: loadingFollowingsCount } = useFetchFollowingsCount()
fetchUser()
fetchFollowersCount()
fetchFollowingsCount()
const activeProfileView = ref('')

const handleSelected = (data: any) => {
    console.log(data, 'data')
    activeProfileView.value = data
}

const userStats = ref([
    {
        title: "Followers",
        key: "followers",
        count: '300k',
    },
    {
        title: "Following",
        key: "following",
        count: '500k'
    },
    {
        title: "Stories",
        key: "stories",
        count: "96",
    },
    {
        title: "Premium stories",
        key: "premium_stories",
        count: "96",
    },
    {
        title: "Views",
        key: "views",
        count: "12.02k",
    },
    {
        title: "Reactions",
        key: "reactions",
        count: "40k",
    },
    {
        title: "Estimated Payout",
        key: "estimated_payout",
        count: "US $0.28",
    }
]) as any

definePageMeta({
    layout: 'dashboard'
})
</script>