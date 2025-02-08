<template>
  <main>
    <button
      @click="router.back()"
      class="bg-black mb-3 px-3 py-2 text-white text-xs rounded-xl"
    >
      Go Back
    </button>
    <UsersTabs @selected="handleSelected" />
    <section
      class="bg-white p-6 border-[0.1px] border-gray-100 shadow-sm rounded-b-lg space-y-10"
    >
      <section class="">
        <div v-if="!loading && Object.keys(user).length" class="space-y-3">
          <div class="w-full border-b flex justify-between items-center">
            <h1 class="text-[#101828] font-medium text-base">
              User Information
            </h1>
            <section class="flex items-center gap-x-3">
              <div  class="mb-4">
                <button
                  @click="showSuspendModal = true"
                  class="bg-red-200 text-red-600 font-medium text-sm rounded-md py-2.5 px-4"
                >
                  Suspend User
                </button>
                <button disabled
                  class="bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 text-red-600 font-medium text-sm rounded-md py-2.5 px-4"
                >
                  Account Suspended
                </button>
              </div>
              <div class="mb-4">
                <NuxtLink
                  v-if="use?.isActive"
                  :to="`/dashboard/users/${user.id}/create-pod`"
                  class="bg-[#0ba9b9] text-white font-medium text-sm rounded-md py-2.5 px-4"
                  >Add Pods
                </NuxtLink>
              </div>
            </section>
          </div>
          <UsersProfileHeader
            @profileSelected="handleSelectedProfileTab"
            @selected="handleSelectedTab"
            :user="user"
            :loadingUser="loading"
            :userStats="setUserStats()"
            :activeTable="activeTable"
            :activeTab="activeTab"
          />
        </div>
        <div class="w-full" v-if="loading && !Object.keys(user).length">
          <div
            class="h-[100px] w-full bg-slate-300 rounded-2xl animate-pulse"
          ></div>
        </div>
      </section>
      <!-- <section v-if="!Object.keys(route.query).length" class="grid grid-cols-1 lg:grid-cols-2 gap-6"> -->
      <section
        v-if="
          !Object.keys(route.query).length || route.query.page === 'insights'
        "
        class="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <UsersProfileDetails
            v-if="!loading && Object.keys(user).length"
            class="w-full"
            :userStats="setUserStats()"
            :user="user"
            :loadingUser="loading"
          />
          <div class="w-full" v-if="loading && !Object.keys(user).length">
            <div
              class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"
            ></div>
          </div>
        </div>
        <div>
          <div
            v-if="!loading && Object.keys(user).length"
            class="bg-[#F3F2F2] lg:mt-16 rounded-md border-[0.1px] p-4"
          >
            <ChartsStoriCharts class="w-full" />
            <ChartsStoriCharts class="w-full" />
          </div>
          <div class="w-full" v-if="loading && !Object.keys(user).length">
            <div
              class="h-[700px] w-full bg-slate-300 rounded-2xl animate-pulse"
            ></div>
          </div>
        </div>
      </section>
      <section v-else-if="route.query.page === 'stories'">
        <UsersStories
          :stories="userStoriesList"
          :loading="loadingUserStories"
          :pagination="storyPagination"
          :queryObj="queryObj"
        />
      </section>
      <section v-else-if="route.query.page === 'wallet'">
        <UsersWallet />
      </section>
      <section v-else-if="route.query.page === 'followers'">
        <UsersFollowers
          :users="followersList"
          :pagination="pagination"
          :loading="loadFollowers"
        />
      </section>
      <section v-else-if="route.query.page === 'following'">
        <UsersFollowings
          :pagination="followingsPagination"
          :users="followingsList"
          :loading="loadFollowings"
        />
      </section>
      <section v-else-if="route.query.page === 'referrals'">
        <UsersReferrals
          :pagination="referralsPagination"
          :fields="referralList"
          :loading="loadRefferals"
        />
      </section>
      <section v-else>
        <CoreEmptyState title="No Data Available" desc="" />
      </section>
    </section>
    <CoreBaseModal
      :show="showSuspendModal" @update:show="showSuspendModal = false"
    >
      <main class="p-6">
        <section v-if="step === 1" class="text-center">
          <div class="flex justify-center mb-2">
            <svg
              class="w-12 h-12 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800">Suspend User</h2>
          <p class="text-gray-600 mt-2">
            Are you sure you want to suspend
            <span class="font-bold">{{ `${user.fname} ${user.lname}` }}</span
            >? This action cannot be undone.
          </p>

          <section class="flex justify-between gap-x-4 items-center mt-10">
            <button
            class="px-4 py-3 bg-gray-300 text-gray-700 w-full rounded-md hover:bg-gray-400" 
              @click="closeModal"
            >
              Cancel
            </button>

            <button
            class="px-4 py-3 bg-red-600 text-white w-full rounded-md hover:bg-red-700" 
              @click="proceedToReason"
            >
              Continue
            </button>
          </section>
        </section>

        <section v-else class="space-y-6">
      <div class="space-y-1">
        <label class="text-sm text-start flex justify-start items-start font-medium text-gray-800">
            Reason for Suspension
          </label>
          <textarea
            v-model="reason"
            rows="6"
            cols="6"
            class="w-full mt-2 p-2 border-[0.5px] border-gray-100 outline-none resize-none  bg-gray-50 rounded-md"
            placeholder="Enter reason for suspension"
          ></textarea>
      </div>

         <div class="space-y-1">
            <!-- {{ duration }} -->
            <label class="text-sm text-start flex justify-start items-start font-medium text-gray-800">Select Duration</label>
            <CoreDateInput v-model="duration" placeholder="Duration in days" :range="true" />
         </div>
          <!-- <vue-tailwind-datepicker class="outline-none ring-0" :formatter="formatter" v-model="duration" /> -->
          <!-- <input
            type="number"
            v-model.number="duration"
            class="w-full p-2 border rounded-md"
            placeholder="Duration in days"
            min="1"
          /> -->

          <section class="flex justify-between gap-x-4 items-center pt-6">
            <button
              class="px-4 py-2.5 bg-gray-300 text-gray-700 w-full rounded-md hover:bg-gray-400"
              @click="step = 1"
            >
              Back
            </button>

            <button
              :disabled="suspending"
              class="px-4 py-2.5 bg-red-600 disabled:cursor-not-allowed disabled:opacity-25 text-white w-full rounded-md hover:bg-red-700"
              @click="confirmSuspend"
            >
              {{ suspending ? "Processing..." : "Suspend User" }}
            </button>
          </section>
        </section>
      </main>
    </CoreBaseModal>
    <!-- <CoreBaseModal :show="showSuspendModal" @update:show="showSuspendModal = false">
            <section class="text-center">
        <div class="flex justify-center mb-2">
          <svg class="w-12 h-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Suspend User</h2>
        <p class="text-gray-600 mt-2 leading-loose">Are you sure you want to suspend <span class="font-bold">{{`${user.fname} ${user.lname}`}}?</span> This action cannot be undone.</p>
      </section>
      
      <section class="flex justify-between gap-x-4 items-center mt-10">
        <button 
        type="button"
          class="px-4 py-3 bg-gray-300 text-gray-700 w-full rounded-md hover:bg-gray-400" 
          @click="closeModal"
        >
          Cancel
        </button>
        
        <button 
        type="button"
          :disabled="suspending"
          class="px-4 py-3 bg-red-600 disabled:cursor-not-allowed disabled:opacity-25 text-white w-full rounded-md hover:bg-red-700" 
          @click="confirmSuspend"
        >
         {{ suspending ? 'processing...' : ' Suspend User ' }}
        </button>
      </section>
        </CoreBaseModal> -->
  </main>
</template>

<script lang="ts" setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useFetchFollowings } from "@/composables/user/getUserFollowings";
import { useFetchFollowers } from "@/composables/user/getUserFollowers";
import { useFetchUserById } from "@/composables/user/getUserById";
import { useFetchUserStories } from "@/composables/user/fetchUserStories";
import { useFetchReferalls } from "@/composables/user/getReferrals";
import { useFetchUserSummary } from "@/composables/user/getUserSummary";
import { useFetchUserWallet } from "@/composables/wallet/fetchUserWallets";
import { useSuspendUser } from "@/composables/user/useSuspendUser";
import { useDateRange } from '@/composables/core/useDateRange';
// const route = useRoute()

const { dateRange, differenceInDays } = useDateRange();
const step = ref(1);
const reason = ref("");
const duration = ref<number | null>(null);

const {
  fetchUserStories,
  userStoriesList,
  loading: loadingUserStories,
  pagination: storyPagination,
  queryObj,
  totalPods,
} = useFetchUserStories();
const {
  fetchFollowings,
  followingsList,
  pagination: followingsPagination,
  loading: loadFollowings,
  totalFollowings,
} = useFetchFollowings();
const {
  fetchFollowers,
  followersList,
  pagination,
  loading: loadFollowers,
  totalFollowers,
} = useFetchFollowers();
const { fetchUser, user, loading } = useFetchUserById();
const {
  fetchReferalls,
  referralList,
  loading: loadRefferals,
  pagination: referralsPagination,
} = useFetchReferalls();
const {
  loading: loadingWallet,
  wallets,
  fetchUserWallet,
} = useFetchUserWallet();
const {
  suspendUser,
  loading: suspending,
  payload,
  setPayload,
} = useSuspendUser();
fetchUser(), fetchUserStories();
fetchFollowings();
fetchFollowers();
fetchReferalls();
fetchUserWallet();
const router = useRouter();
const route = useRoute();
const activeTab = ref("default") as any;
const activeProfileView = ref("insights");
const showSuspendModal = ref(false);


const proceedToReason = () => {
  step.value = 2;
};

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

// const confirmSuspend = async () => {
//     await suspendUser(user.value.id).then(() => {
//         showSuspendModal.value = false
//     })
// };

// const confirmSuspend = async () => {
//   if (!reason.value || !duration.value) return;
//   suspending.value = true;
//   const payload = {
//     reason: reason.value,
//     duration: duration.value,
//   };

//   // Example: Set an initial range
// dateRange.value = payload.duration
//   setPayload(payload);
//   await suspendUser(user.value.id).then(() => {
//     showSuspendModal.value = false;
//   });
// };

const confirmSuspend = async () => {
    console.log('clciked', reason.value, duration.value)
  if (!reason.value || !duration.value) return;
//   suspending.value = true;

  // Ensure dateRange.value is not null before destructuring
  const [start, end] = duration.value ?? [];

  if (!start || !end) {
    suspending.value = false;
    return;
  }

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) {
    // suspending.value = false;
    return;
  }

  const formattedDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  const payload = {
    id: route.params.id,
    reason: reason.value,
    duration: formattedDuration,
  };

  setPayload(payload);
  await suspendUser().then(() => {
    showSuspendModal.value = false;
  });
};



const handleSelected = (data: any) => {
  activeProfileView.value = data;
  router.push({ path: route.path, query: { page: data } });
};

const handleSelectedProfileTab = () => {
  router.push({ path: route.path });
};

const showSlideOver = ref(false);

const createPod = () => {
  // router.push({ path: route.path, query: { action: 'create' } })
  showSlideOver.value = true;
};

const closeSlideOver = () => {
  showSlideOver.value = false;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const setUserStats = () => {
  return [
    {
      title: "Followers",
      key: "followers",
      count: !loadFollowers?.value ? totalFollowers?.value : 0,
      // count: !loadFollowers?.value ? followersList?.value.length : 0
    },
    {
      title: "Following",
      key: "following",
      count: !loadFollowings?.value ? totalFollowings?.value : 0,
      // count: !loadFollowings?.value ? followingsList?.value.length : 0
    },
    {
      title: "Pods",
      key: "stories",
      count: !loadingUserStories?.value ? totalPods?.value : 0,
      // count: !loadingUserStories?.value ? userStoriesList?.value?.length : 0
    },
    {
      title: "Views",
      key: "views",
      count: user?.value?.total_views_count ?? 0,
    },
    // {
    //     title: "Reactions",
    //     key: "reactions",
    //     count: user?.value?.reactions_count ?? 0
    // },
    {
      title: "Wallet",
      key: "wallet",
      count: formatCurrency(wallets?.value[0]?.balance) || 0,
    },
    {
      title: "Payout",
      key: "payout",
      count: formatCurrency(wallets?.value[1]?.balance) || 0,
    },
    {
      title: "Referrals",
      key: "referrals",
      count: !loadRefferals?.value ? referralList?.value.length : 0,
    },
    // {
    //     title: "Estimated Payout",
    //     key: "estimated_payout",
    //     count: user?.value?.estimatedPayout || 0,
    // }
  ];
};

onMounted(() => {
  setUserStats();
  router.push({ path: route.path });
  localStorage.removeItem("selectedUSerCode");
});

definePageMeta({
  layout: "dashboard",
});

const handleSelectedTab = (itm: any) => {
  activeProfileView.value = itm.key;
  router.push({ path: route.path, query: { page: itm.key } });
  // activeProfileTab.value = itm.key
};
</script>
