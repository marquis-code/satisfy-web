<template>
  <main>
    <!-- <div v-if="users.length"> -->
      <!-- <UsersTableList :usersList="users" :loadingUsers="loading" :pagination="pagination" /> -->
      <UsersTableList v-if="followersList?.length && !loading" :usersList="followersList" :loadingUsers="loading" :pagination="pagination" />
      <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
        :pages="pagination.pages" @page-changed="handlePageChange" />
    <!-- </div> -->
    <CoreEmptyState v-if="users.length <= 0 && !loading" title="No Followers available" desc="">
    </CoreEmptyState>
    <LoadingSpinner v-if="loading" />
  </main>
</template>

<script setup lang="ts">
import { useFetchFollowers } from '@/composables/user/getUserFollowers'
const { fetchFollowers, followersList, pagination, loading } = useFetchFollowers()
fetchFollowers()


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
