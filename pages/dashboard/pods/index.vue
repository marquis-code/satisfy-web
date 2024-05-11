<template>
    <section class="bg-white md:rounded-lg p-6 lg:p-10 space-y-10 mx-3 pb-6">
        <StoriesCardList  v-if="!loading && storiesList.length" />
        <div class="w-full" v-if="loading && !storiesList.length">
            <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
          </div>
    </section>
</template>

<script setup lang="ts">
import { useFetchStories } from '@/composables/story/fetch'
const { fetchStories, storiesList, loading  } = useFetchStories()
definePageMeta({
    layout: 'dashboard'
})

fetchStories()
</script>