<template>
  <main>
    <StoriesCardList v-if="userStoriesList?.length && !loading" :stories="userStoriesList" :show-header="false" />
    <!-- <CoreEmptyState v-if="!userStoriesList?.length && !loading" title="No User Stories available"
      desc="Get started by creating a story." /> -->
    <StoriesEmptyState v-if="!userStoriesList?.length && !loading" />
    <div class="w-full mt-3" v-if="loading && !userStoriesList?.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading } = useFetchUserStories()
fetchUserStories()
</script>