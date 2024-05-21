<template>
    <main>
        <UsersTabs @selected="handleSelected" />
        <section v-if="activeProfileView === 'insight' && route.query.page === 'insight'"
            class="bg-white p-6 border-[0.1px] border-gray-100 shadow-sm rounded-b-lg space-y-10">
            <section class="">
                <div v-if="!loading && Object.keys(user).length" class="space-y-3">
                    <h1 class="text-[#101828] font-medium text-base">User Information</h1>
                    <UsersProfileHeader :user="user" :loadingUser="loading" :userStats="setUserStats()"
                        :activeTable="activeTable" :activeTab="activeTab" />
                </div>
                <div class="w-full" v-if="loading && !Object.keys(user).length">
                    <div class="h-[100px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                </div>
            </section>
            <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <UsersProfileDetails v-if="!loading && Object.keys(user).length" class="w-full"
                        :userStats="setUserStats()" :user="user" :loadingUser="loading" />
                    <div class="w-full" v-if="loading && !Object.keys(user).length">
                        <div class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
                <div>
                    <div v-if="!loading && Object.keys(user).length"
                        class="bg-[#F3F2F2] lg:mt-16 rounded-md border-[0.1px] p-4">
                        <ChartsStoriCharts class="w-full" />
                        <ChartsStoriCharts class="w-full" />
                    </div>
                    <div class="w-full" v-if="loading && !Object.keys(user).length">
                        <div class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            </section>
        </section>
        <UsersWallet v-if="activeProfileView === 'wallet' && route.query.page === 'wallet'" />
        <UsersStories v-if="activeProfileView === 'stori' && route.query.page === 'stori'" />
    </main>
</template>

<script lang="ts" setup>
import { useFetchUserById } from '@/composables/user/getUserById'
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading: loadingUserStories } = useFetchUserStories()
const { fetchUser, user, loading } = useFetchUserById()
fetchUser()
fetchUserStories()
const router = useRouter()
const route = useRoute()
const activeTab = ref("default") as any
const activeProfileView = ref('')

const handleSelected = (data: any) => {
    activeProfileView.value = data
    router.push({ path: route.path, query: { page: data } })
}

// router.push({ path: route.path, query: { page: 'insight' } })

const setUserStats = () => {
    return [
        {
            title: "Followers",
            key: "followers",
            count: user?.value?.followersCount ?? 0
        },
        {
            title: "Following",
            key: "following",
            count: user?.value?.followingsCount ?? 0
        },
        {
            title: "Stories",
            key: "stories",
            count: !loadingUserStories.value ? userStoriesList?.value?.length : 0
        },
        {
            title: "Premium stories",
            key: "premium_stories",
            count: user?.value?.premiumStories ?? 0
        },
        {
            title: "Views",
            key: "views",
            count: user?.value?.views ?? 0
        },
        {
            title: "Reactions",
            key: "reactions",
            count: user?.value?.reactions ?? 0
        },
        {
            title: "Estimated Payout",
            key: "estimated_payout",
            count: user?.value?.estimatedPayout ?? 0,
        }
    ]
}

onMounted(() => {
    setUserStats()
})

definePageMeta({
    layout: 'dashboard'
})
</script>