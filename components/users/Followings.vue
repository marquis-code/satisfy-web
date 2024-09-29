<template>
    <main>
      <!-- <div v-if="users.length">
        <UsersTableList :usersList="users" :loadingUsers="loading" :pagination="pagination" />
      </div> -->
      <UsersTableList v-if="followingsList?.length && !loading" :usersList="followingsList.filter(Boolean)" :loadingUsers="loading" :pagination="pagination" />
      <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
        :pages="pagination.pages" @page-changed="handlePageChange" />
      <CoreEmptyState v-if="followingsList.length <= 0 && !loading" title="No Followings available" desc="">
      </CoreEmptyState>
      <LoadingSpinner v-if="loading" />
    </main>
  </template>
  
  <script setup lang="ts">
import { useFetchFollowings } from '@/composables/user/getUserFollowings'
const { fetchFollowings, followingsList, pagination, loading  } = useFetchFollowings()
fetchFollowings()

const handlePageChange = (val: any) => {
  pagination.value.page = val
}
  defineProps({
    users: {
      type: Array,
      required: true,
    },
    // loading: {
    //   type: Boolean,
    //   required: true,
    // },
    // pagination: {
    //   type: Object,
    //   required: true,
    // },
  })
  </script>