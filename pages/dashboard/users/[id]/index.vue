<template>
    <main>
        <button @click="router.back()" class="bg-black mb-3 px-3 py-2 text-white text-xs rounded-xl">Go Back</button>
        <UsersTabs @selected="handleSelected" />
        <section class="bg-white p-6 border-[0.1px] border-gray-100 shadow-sm rounded-b-lg space-y-10">
            <section class="">
                <div v-if="!loading && Object.keys(user).length" class="space-y-3">
                    <div class="w-full border-b flex justify-between items-center">
                        <h1 class="text-[#101828] font-medium text-base">User Information</h1>
                        <div class="mb-4">
                            <NuxtLink :to="`/dashboard/users/${user.id}/create-pod`"
                                class="bg-[#0ba9b9] text-white font-medium text-sm rounded-md py-2.5 px-4">Add Pods
                            </NuxtLink>
                        </div>
                    </div>
                    <UsersProfileHeader @profileSelected="handleSelectedProfileTab" @selected="handleSelectedTab"
                        :user="user" :loadingUser="loading" :userStats="setUserStats()" :activeTable="activeTable"
                        :activeTab="activeTab" />
                </div>
                <div class="w-full" v-if="loading && !Object.keys(user).length">
                    <div class="h-[100px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
                </div>
            </section>
            <!-- <section v-if="!Object.keys(route.query).length" class="grid grid-cols-1 lg:grid-cols-2 gap-6"> -->
            <section v-if="!Object.keys(route.query).length || route.query.page === 'insights'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <section v-else-if="route.query.page === 'stories'">
                <UsersStories :stories="userStoriesList" :loading="loadingUserStories" :pagination="storyPagination" :queryObj="queryObj" />
            </section>
            <section v-else-if="route.query.page === 'payout'">
                <UsersWallet />
            </section>
            <section v-else-if="route.query.page === 'followers'">
                <UsersFollowers :users="followersList" :pagination="pagination" :loading="loadFollowers" />
            </section>
            <section v-else-if="route.query.page === 'following'">
                <UsersFollowings :pagination="followingsPagination" :users="followingsList" :loading="loadFollowings" />
            </section>
            <section v-else-if="route.query.page === 'referrals'">
                <UsersReferrals :pagination="referralsPagination" :fields="referralList" :loading="loadRefferals" />
            </section>
            <section v-else>
                <CoreEmptyState title="No Data Available" desc="" />
            </section>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { useFetchFollowings } from '@/composables/user/getUserFollowings'
import { useFetchFollowers } from '@/composables/user/getUserFollowers'
import { useFetchUserById } from '@/composables/user/getUserById'
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
import { useFetchReferalls } from '@/composables/user/getReferrals'
import { useFetchUserSummary } from '@/composables/user/getUserSummary';
import { useFetchUserWallet } from '@/composables/wallet/fetchUserWallets'

const { fetchUserStories, userStoriesList, loading: loadingUserStories, pagination: storyPagination, queryObj, totalPods } = useFetchUserStories()
const { fetchFollowings, followingsList, pagination: followingsPagination, loading: loadFollowings, totalFollowings } = useFetchFollowings()
const { fetchFollowers, followersList, pagination, loading: loadFollowers, totalFollowers } = useFetchFollowers()
const { fetchUser, user, loading } = useFetchUserById()
const { fetchReferalls, referralList, loading: loadRefferals, pagination: referralsPagination } = useFetchReferalls()
const {loading : loadingWallet, wallets, fetchUserWallet} = useFetchUserWallet();
fetchUser(),
fetchUserStories()
fetchFollowings()
fetchFollowers()
fetchReferalls()
fetchUserWallet()
const router = useRouter()
const route = useRoute()
const activeTab = ref("default") as any
const activeProfileView = ref('insights')


const handleSelected = (data: any) => {
    activeProfileView.value = data
    router.push({ path: route.path, query: { page: data } })
}

const handleSelectedProfileTab = () => {
    router.push({ path: route.path })
}

const showSlideOver = ref(false)

const createPod = () => {
    // router.push({ path: route.path, query: { action: 'create' } })
    showSlideOver.value = true
}

const closeSlideOver = () => {
    showSlideOver.value = false
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

const setUserStats = () => {
    return [
        {
            title: "Followers",
            key: "followers",
            count: !loadFollowers?.value ? totalFollowers?.value : 0
            // count: !loadFollowers?.value ? followersList?.value.length : 0
        },
        {
            title: "Following",
            key: "following",
            count: !loadFollowings?.value ? totalFollowings?.value : 0
            // count: !loadFollowings?.value ? followingsList?.value.length : 0
        },
        {
            title: "Pods",
            key: "stories",
            count: !loadingUserStories?.value ? totalPods?.value : 0
            // count: !loadingUserStories?.value ? userStoriesList?.value?.length : 0
        },
        {
            title: "Views",
            key: "views",
            count: user?.value?.total_views_count ?? 0
        },
        // {
        //     title: "Reactions",
        //     key: "reactions",
        //     count: user?.value?.reactions_count ?? 0
        // },
        {
            title: "Wallet",
            key: "wallet",
            count: formatCurrency(wallets?.value[0]?.balance )|| 0
        },
        {
            title: "Payout",
            key: "payout",
            count: formatCurrency(wallets?.value[1]?.balance )|| 0
        },
        {
            title: "Referrals",
            key: "referrals",
            count: !loadRefferals?.value ? referralList?.value.length : 0
        },
        // {
        //     title: "Estimated Payout",
        //     key: "estimated_payout",
        //     count: user?.value?.estimatedPayout || 0,
        // }
    ]
}

onMounted(() => {
    setUserStats()
    router.push({ path: route.path })
    localStorage.removeItem("selectedUSerCode")
})

definePageMeta({
    layout: 'dashboard'
})

const handleSelectedTab = (itm: any) => {
    activeProfileView.value = itm.key
    router.push({ path: route.path, query: { page: itm.key } })
    // activeProfileTab.value = itm.key
}
</script>