<template>
  <main>
    <StoriesCardList v-if="userStoriesList?.length && !loading" :stories="userStoriesList" :pagination="pagination" :show-header="false" />
    <CorePagination :total="pagination.total" :page="pagination.page" :perPage="pagination.perPage"
    :pages="pagination.pages" @page-changed="handlePageChange" />
    <StoriesEmptyState v-if="!userStoriesList?.length && !loading" />
    <div class="w-full mt-3" v-if="loading && !userStoriesList?.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>

  </main>
</template> 

<script setup lang="ts">
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading, pagination, queryObj } = useFetchUserStories()

fetchUserStories()

const handlePageChange = (val: any) => {
  pagination.value.page = val;
}

defineProps({
  stories: {
    type: Array,
    required: true
  },
  // loading: {
  //   type:Boolean,
  //   required: true
  // }
})
</script>