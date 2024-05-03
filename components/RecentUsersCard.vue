<template>
  <main>
    <div v-if="!loading && usersList.length" class="rounded-2xl bg-white p-6 border-gray-50 border space-y-6">
      <div class="space-y-2">
        <h1 class="font-semibold text-base md:text-lg">
          Most Recent
        </h1>
        <div>
          <div class="sm:hidden">
            <label for="Tab" class="sr-only">Tab</label>

            <select id="Tab"
              class="w-full md:w-full text-xs rounded-md py-2.5 md:py-0 px-3 outline-none md:text-sm md:px-0 bg-gray-100 border-gray-200">
              <option select>Reserved Username</option>
              <option>Reported users</option>
              <option>Reported post</option>
              <option>Reported comment</option>
            </select>
          </div>

          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
                <button @click="setActiveTable('reserved_usernames')" :class="[
      activeTable === 'reserved_usernames'
        ? 'border-sky-500 border-b-2 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400" aria-current="page">
                  Reserved Username
                </button>

                <button @click="setActiveTable('reported_users')" :class="[
      activeTable === 'reported_users'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Reported users
                </button>

                <button @click="setActiveTable('reported_post')" :class="[
      activeTable === 'reported_post'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Reported post
                </button>

                <button @click="setActiveTable('reported_comment')" :class="[
      activeTable === 'reported_comment'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Reported comment
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(itm, idx) in computedUsersList" :key="idx">
              <td class="whitespace-nowrap px-4  md:py-3 font-medium text-gray-900 bg-white">
                <nuxt-link v-if="itm.profilePicture" :to="`/dashboard/users/${itm.id}`">
                  <CoreImageZoom class="h-20 w-20 cursor-pointer" :src="itm.profilePicture" />
                </nuxt-link>
                <p v-else
                  class="rounded-full h-10 w-10 font-semibold bg-gray-300 text-gray-800 flex justify-center items-center">
                  {{ generateInitials(itm.fname, itm.lname) }}</p>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
      itm.fname
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
      itm.email
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">
                  <img src="@/assets/icons/arrow-right.svg" alt="" />
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-full" v-if="loading && !usersList.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>
  </main>
</template>


<script setup lang="ts">
import { useFetchUsers } from '@/composables/user/fetch'
const { fetchUsers, usersList, loading } = useFetchUsers()
const computedUsersList = computed(() => {
  return usersList.value.slice(0, 5)
})
fetchUsers()
const activeTable = ref("reserved_usernames")
const setActiveTable = (val: string) => {
  activeTable.value = val;
}
const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
}

</script>