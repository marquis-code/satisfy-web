<template>
  <main>
    <StoriesCardList v-if="stories?.length && !loading" :stories="stories" :show-header="false" />
    <StoriesEmptyState v-if="!stories?.length && !loading" />
    <div class="w-full mt-3" v-if="loading && !stories?.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading } = useFetchUserStories()
fetchUserStories()

defineProps({
  stories: {
    type: Array,
    required: true
  }
})
</script>