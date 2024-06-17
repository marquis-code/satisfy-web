<template>
    <main>
        <UsersTabs @selected="handleSelected" />
        <section class="bg-white p-6 border-[0.1px] border-gray-100 shadow-sm rounded-b-lg space-y-10">
            <section class="">
                <div v-if="!loading && Object.keys(user).length" class="space-y-3">
                    <div class="w-full border-b flex justify-between">
                        <h1 class="text-[#101828] font-medium text-base">User Information</h1>
                        <div>
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
            <section v-if="!Object.keys(route.query).length" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div class="flex justify-end items-end">
                    <button @click="createPod" class="bg-green-600  rounded-full shadow p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <UsersStories :stories="userStoriesList" />
            </section>
            <section v-else-if="route.query.page === 'wallet'">
                <UsersWallet />
            </section>
            <section v-else-if="route.query.page === 'followers'">
                <UsersFollowers :users="followersList" :loading="loadFollowers" />
            </section>
            <section v-else-if="route.query.page === 'following'">
                <UsersFollowings :users="followingsList" :loading="loadFollowings" />
            </section>
            <section v-else>
                <CoreEmptyState title="No Data Available" desc="" />
            </section>
        </section>

        <CoreSlideOver type="large" :show="showSlideOver" @update:show="closeSlideOver"
            :title="`Add new stori to ${user.fname} ${user.lname}`"
            description="Get started by filling the form below to create a new stori.">
            <template #content>
                <StoriesForm />
            </template>
        </CoreSlideOver>
    </main>
</template>

<script lang="ts" setup>
import { useFetchFollowings } from '@/composables/user/getUserFollowings'
import { useFetchFollowers } from '@/composables/user/getUserFollowers'
import { useFetchUserById } from '@/composables/user/getUserById'
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading: loadingUserStories } = useFetchUserStories()
const { fetchFollowings, followingsList, loading: loadFollowings } = useFetchFollowings()
const { fetchFollowers, followersList, loading: loadFollowers } = useFetchFollowers()
const { fetchUser, user, loading } = useFetchUserById()
fetchUser()
fetchUserStories()
fetchFollowings()
fetchFollowers()
const router = useRouter()
const route = useRoute()
const activeTab = ref("default") as any
const activeProfileView = ref('default')

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

const setUserStats = () => {
    return [
        {
            title: "Followers",
            key: "followers",
            count: !loadFollowers.value ? followersList?.value.length : 0
        },
        {
            title: "Following",
            key: "following",
            count: !loadFollowings.value ? followingsList?.value.length : 0
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
    router.push({ path: route.path, query: { page: 'insight' } })
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