<template>
  <main>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title,
            email
            and role.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button"
            class="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
            user</button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div v-if="usersList.length && !loading">
            <UsersTable :usersList="usersList" :loadingUsers="loading" :pagination="pagination"
              @selectedUser="handleSelectedUser" />
            <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
              :pages="pagination.pages" @page-changed="handlePageChange" />
          </div>
          <CoreEmptyState v-if="usersList.length <= 0 && !loading" title="No User available"
            desc="Get started by creating a new user." />
          <LoadingSpinner v-if="loading" />
        </div>
      </div>
    </div>
    <div class="w-full" v-if="loading && !usersList.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchUsers } from '@/composables/user/fetch'
const { fetchUsers, usersList, loading, pagination } = useFetchUsers()
const selectedUser = ref({}) as any

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
