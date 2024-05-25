<template>
  <div v-if="usersList.length && !loadingUsers"
  class="inline-block min-w-full py-2 align-middle border-gray-100 rounded-b-lg border bg-white shadow">
  <div class="relative">
      <div v-if="selectedPeople.length > 0"
          class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
          <button type="button"
              class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
              Bulk edit
          </button>
          <button type="button"
              class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
              Delete all
          </button>
      </div>
      <table class="min-w-full table-fixed divide-y divide-gray-300">
          <thead class="">
              <tr>
                  <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                      <input type="checkbox"
                          class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          :checked="indeterminate || selectedPeople.length === usersList.length"cjecl            :indeterminate="indeterminate"
                          @change="selectedPeople = $event.target.checked ? usersList.map((p) => p.email) : []" />
                  </th>
                  <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Avatar
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Username
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      First name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last name
                  </th>
                  <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Interest(s)
      </th> -->
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone no.
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                  </th>
                  <!-- <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
        No. of (pods)
      </th> -->
                  <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
              <tr class="odd:bg-gray-50" v-for="(person, index) in usersList" :key="index"
                  :class="[selectedPeople.includes(person.email) && 'bg-gray-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                      <div v-if="selectedPeople.includes(person.email)"
                          class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
                      </div>
                      <input type="checkbox"
                          class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          :value="person.email" v-model="selectedPeople" />
                  </td>
                  <td :class="[
  'whitespace-nowrap py-4 pr-3 text-xs font-medium',
  selectedPeople.includes(person.email)
      ? 'text-indigo-600'
      : 'text-gray-900',
]">
                      <DashboardImageZoom v-if="person.profilePicture" class="h-10 w-10"
                          :src="person.profilePicture" />
                      <div v-else
                          class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                          {{ generateInitials(person.fname, person.lname) }}
                      </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <nuxt-link :to="`/dashboard/users/${person.id}`"
                          class="font-medium text-gray-800 no-underline">{{
  person.handle ?? "N/A" }}</nuxt-link>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{
  person.fname ??
  "N/A" }}</nuxt-link>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{
  person.lname ??
  "N/A" }}</nuxt-link>
                  </td>
                  <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-[#6941C6] font-semibold">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-3" v-if="person.categories.length">
          <span class="bg-[#F9F5FF] rounded-full px-3 py-2 text-xs" v-for="(itm, idx) in  person.categories"
            :key="idx">{{
itm.name.length > 10 ? `${itm.name.slice(0, 10)}...` : itm.name
}}</span>
        </div>
        <span v-else class="bg-[#EEF4FF] text-[#6941C6] rounded-full px-3 py-2">N/A</span>
      </td> -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{
  person.phone ??
  "N/A" }}</nuxt-link>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{
  person.email ??
  "N/A" }}</nuxt-link>
                  </td>
                  <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{
getUserPods(person) }}</nuxt-link>
      </td> -->
                  <td
                      class="whitespace-nowrap text-center py-4 pl-3 pr-4 text-xs font-medium sm:pr-3 relative">
                      <button @click="toggleDropdown(index)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"
                              fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                      </button>
                      <div v-if="openDropdownIndex === index"
                          class="absolute mt-1.5 w-32 bg-white -left-14 rounded-lg shadow-xl z-10">
                          <div>
                              <a href="#" @click.prevent="handleEditUer(person)"
                                  class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                                  <span class="mx-1">
                                      Edit
                                  </span>
                              </a>

                              <a href="#" @click.prevent="handleRemoveUser(person)"
                                  class="flex items-center p-3 text-sm text-red-500 font-semibold capitalize transition-colors duration-300 transform">
                                  <span class="mx-1">
                                      Remove
                                  </span>
                              </a>

                              <a href="#" @click.prevent="toggleUserStatus(person)"
                                  class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                                  <span class="mx-1">
                                      {{ person.isActive ? "Suspend" : "Unsuspend" }}
                                  </span>
                              </a>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</div>
</template>