<template>
  <main>
    <div class="w-full border-b">
      <nav class="" aria-label="Tabs">
        <div href="#"
          :class="[activeTab === 'users' ? 'border-b-4 border-[#0ba9b9] text-gray-800' : 'text-gray-400 group-hover:text-gray-500']"
          class="uppercase group inline-flex items-center py-2 px-1 text-xs font-semibold">
          <span>Users </span><span class="font-semibold ml-2 rounded-3xl px-2 py-2 bg-[#0ba9b9] text-white">{{
            pagination.total }}</span>
        </div>
      </nav>
    </div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flow-root mt-2">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 border-[0.7px] rounded-b-lg">
          <div v-if="filteredUsers.length && !loading">
            <form class="relative flex flex-1 border-[0.9px] py-6" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <svg class="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd" />
              </svg>
              <input id="search-field"
                class="block h-full w-full border-0 py-0 pl-10 pr-0 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..." v-model="searchQuery" type="search" name="search">
            </form>
            <UsersTable :usersList="filteredUsers" :loadingUsers="loading" :pagination="pagination"
              @selectedUser="handleSelectedUser" />
            <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
              :pages="pagination.pages" @page-changed="handlePageChange" />
          </div>
          <CoreEmptyState v-if="filteredUsers.length <= 0 && !loading" title="No User available"
            desc="">
          </CoreEmptyState>
          <LoadingSpinner v-if="loading" />
        </div>
      </div>
    </div>
    <div class="w-full" v-if="loading && !filteredUsers.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchUsers } from '@/composables/user/fetch'
const { fetchUsers, usersList, searchQuery,
  filteredUsers, loading, pagination } = useFetchUsers()
const selectedUser = ref({}) as any
const activeTab = ref('users')
const selectedPeople = ref([])
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < usersList.length)
definePageMeta({
  layout: 'dashboard'
})

const handleSelectedUser = (data: any) => {
  selectedUser.value = data
}

const handlePageChange = (val: any) => {
  pagination.value.page = val
}
fetchUsers()

// const users = ref([]);
// const pagination = ref({
//   total: 0,
//   page: 1,
//   perPage: 20,
//   pages: 0,
// });

// const handleFetchUsers = async (page = 1) => {
//   pagination.value = {
//     total: metadata.value.total,
//     page: metadata.value.page,
//     perPage: metadata.value.perPage,
//     pages: metadata.value.pages,
//   };
// };

// onMounted(() => {
//   fetchUsers();
// });


// interface Item {
//   id: number
//   name: string
// }

// interface Metadata {
//   total: number
//   page: number
//   perPage: number
//   pages: number
// }

// const data = ref<Item[]>([])
// const metadata = ref<Metadata>({
//   total: 0,
//   page: 1,
//   perPage: 20,
//   pages: 0,
// })

// const fetchData = async (page: number = 1) => {
//   // Replace with your actual API endpoint and logic
//   // const response = await fetch(/api/items?page=${page}&perPage=${metadata.value.perPage})
//   const result = await response.json()

//   data.value = result.items
//   metadata.value = {
//     total: result.total,
//     page: result.page,
//     perPage: result.perPage,
//     pages: result.pages,
//   }
// }

// onMounted(() => {
//   fetchData()
// })
</script>
