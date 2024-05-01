<template>
  <main class="">
    <DashboardHeader>
      <template v-slot:action>
        <div class="relative">
          <b-dropdown id="dropdown-1" class="m-md-2" variant="link" right toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </template>
            <b-dropdown-item>Edit</b-dropdown-item>
            <b-dropdown-item>Remove User</b-dropdown-item>
            <b-dropdown-item @click="isModalOpen = true">{{ user.isActive ? 'Suspend' : 'Un-Suspend'
              }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </DashboardHeader>
    <section>
      <div class="border-b border-gray-200 mx-6">
        <div class="">
          <nav class="-mb-px flex gap-6" aria-label="Tabs">
            <button @click="setActiveTable('insight')" :class="[
              activeTable === 'insight'
                ? 'border-sky-500 border-b-2 font-bold text-gray-900 dark:text-white'
                : 'border-transparent',
            ]" class="shrink-0 border-b-2 px-1 pb-2.5 text-sm text-gray-400" aria-current="page">
              Insight
            </button>

            <button @click="setActiveTable('stori')" :class="[
              activeTable === 'stori'
                ? 'border-sky-500 font-bold text-gray-900 dark:text-white'
                : 'border-transparent',
            ]" class="shrink-0 border-b-2 px-1 pb-2.5 text-sm text-gray-400">
              Stori
            </button>

            <button @click="setActiveTable('wallet')" :class="[
              activeTable === 'wallet'
                ? 'border-sky-500 font-bold text-gray-900 dark:text-white'
                : 'border-transparent',
            ]" class="shrink-0 border-b-2 px-1 pb-2.5 text-sm text-gray-400">
              Wallet & Payout
            </button>
          </nav>
        </div>
      </div>
      <section class="bg-white rounded-md p-6 space-y-4 mx-6 lg:h-screen">
        <h1 class="font-bold text-gray-950 text-lg pl-3 lg:pl-6">
          Users Information
        </h1>
        <div class="flex">
          <div v-if="loadingUser && !Object.keys(user).length"
            class="rounded-full bg-slate-500 h-16 w-16 animate-pulse">
          </div>
          <div v-if="user?.profilePicture && !loadingUser" class="lg:w-1/12 flex justify-center items-center">
            <img :src="user?.profilePicture" alt="avatar" class="h-16 w-16 rounded-full cursor-pointer"
              @click="activeTab = 'default'" />
          </div>
          <div v-if="!loadingUser && user?.profilePicture === null"
            class="h-10 w-10 mr-4 rounded-full bg-gray-500 text-white flex justify-center items-center">
            {{
              computedInitials
            }}
          </div>
          <div class="w-11/12 hidden lg:block">
            <div class="bg-gray-100 rounded-lg flex justify-between items-center">
              <div v-for="(itm, idx) in userStats" :key="idx"
                :class="itm.key === activeTab ? 'bg-gray-200' : 'bg-gray-50'"
                class="w-full border-r last:border-r-0 border-gray-300 py-2">
                <div class="flex justify-center items-center cursor-pointer" @click="setActiveTab(itm)">
                  <div class="flex justify-center items-center flex-col">
                    <p :class="itm.key === activeTab
              ? 'text-gray-900'
              : 'text-gray-400'
              " class="text-xl font-bold py-0 my-0">
                      {{ itm.count }}
                    </p>
                    <p :class="itm.key === activeTab
              ? 'text-[#667085]'
              : 'text-gray-400'
              " class="text-sm font-medium py-0 my-0 flex items-center gap-x-3">
                      {{ itm.title }}
                      <img v-if="itm.title === 'Stories'" src="@/assets/icons/dashboard/stories-link.svg" alt="'" />
                    </p>
                  </div>
                  <p class="bg-gray-300 h-12"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:flex justify-between max-h-[650px] pt-6">
          <UserProfileDetails :user="user" v-if="activeTab === 'default'" />
          <div v-else
            class="flow-root lg:w-6/12 bg-gray-50 p-4 border-[0.6px] border-white max-h-[650px] rounded-lg lg:p-6 w-full">
            <div class="pt-32">
              <p class="flex justify-center items-center font-medium text-gray-700">
                Coming soon
              </p>
            </div>
          </div>
          <div class="lg:w-6/12 space-y-0 overflow-y-auto">
            <h1 class="text-lg font-semibold pl-6">Daily StoriTime</h1>
            <div class="rounded-lg p-6 space-y-4">
              <div class="rounded-lg bg-[#F3F2F2] p-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-gray-400 font-medium">Today, 9 January</p>
                    <h1 class="text-lg font-extrabold text-gray-950 leading-loose">
                      3h 50m
                    </h1>
                  </div>
                  <div>
                    <select class="text-sm outline-none font-medium bg-white rounded-md px-2.5 py-2 w-full">
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                </div>
                <user-activities-chart />
              </div>
              <div class="rounded-lg bg-[#F3F2F2] p-3">
                <p class="text-gray-400 font-medium">Today, 9 January</p>
                <h1 class="text-lg font-extrabold text-gray-950 leading-loose">
                  3h 50m
                </h1>
                <user-activities-chart />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
      <section class="bg-white p-3 space-y-6 max-w-screen-lg rounded-md">
        <div>
          <img src="@/assets/icons/warning.svg" class="h-20 w-20" alt="warning" />
        </div>
        <div>
          <h1 class="font-semibold text-xl">{{ user.isActive ? 'Suspend' : 'Un-Suspend' }} user</h1>
          <p class="text-gray-500">
            {{ user.isActive ? `Are you sure you want to deactivate this user?` : `Are you sure you want to reactivate
            this
            user ? ` }}
          </p>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="isModalOpen = false"
            class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-2.5 rounded-lg">
            Cancel
          </button>
          <button :disabled="processingStatusUpdate" @click="handleRemoveUser"
            :class="[user.isActive ? 'bg-[#D92D20]' : 'bg-green-500']"
            class="disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-2.5 rounded-lg">
            {{ processingStatusUpdate ? "processing..." : `${user.isActive ? 'Suspend' : 'un suspend'}` }}
          </button>
        </div>
      </section>
    </Modal>
  </main>
</template>

<script>
import Modal from '@/components/core/Modal.vue';
import UserProfileDetails from "@/components/users/UserProfileDetails.vue";
// import UserActivitiesChart from "@/components/charts/UserActivitiesChart.vue";
import Breadcrumb from "@/components/dashboard/Breadcrumb.vue";
export default {
  components: { UserActivitiesChart, Breadcrumb, UserProfileDetails, Modal },
  layout: "dashboard",
  data() {
    return {
      activeTable: "insight",
      processingStatusUpdate: false,
      isModalOpen: false,
      user: {},
      loadingUser: false,
      activeTab: "default",
      activeTabKey: "",
      breadcrumbTabs: [
        {
          text: "Insight",
        },
        {
          text: "Stori",
        },
        {
          text: "Wallet & Payout",
        },
      ],
      userStats: [
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
        },
      ],
    };
  },
  methods: {
    setActiveTable(val) {
      this.activeTable = val;
    },
    setActiveTab(itm) {
      this.activeTab = itm.key;
    },
    async getUserById() {
      try {
        this.loadingUser = true;
        const response = await this.$userApiService.getUserById(this.$route.params.id);
        console.log(response, 'uer here')
        this.user = response
      } catch (error) {
        this.$toastr.e(error.response.data.message)
      } finally {
        this.loadingUser = false;
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    async handleRemoveUser() {
      this.processingStatusUpdate = true;
      const payload = {
        newStatus: this.user?.isActive ? false : true
      }
      try {
        await this.$userApiService.updateUserStatus(this.$route.params.id, payload);
        this.getUserById()
      } catch {
        this.$toastr.e(error.response.data.message)
      } finally {
        this.processingStatusUpdate = false
        this.isModalOpen = false
      }
    },
  },
  mounted() {
    this.getUserById()
  },
  computed: {
    computedInitials() {
      return this?.user ? `${this?.user?.fname?.charAt(0)?.toUpperCase()} ${this?.user?.lname?.charAt(0)?.toUpperCase()}` : ''
    }
  }
};
</script>
