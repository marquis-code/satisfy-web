<template>
    <section class="bg-white md:rounded-lg space-y-10">
        <StoriesCardList :stories="storiesList" v-if="!loading && storiesList.length" />
        <CoreEmptyState v-if="storiesList.length <= 0 && !loading" title="No Stories available"
            desc="Get started by creating a new story." />
        <div class="w-full" v-if="loading">
            <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useFetchStories } from '@/composables/story/fetch'
const { fetchStories, storiesList, loading } = useFetchStories()
definePageMeta({
    layout: 'dashboard'
})

fetchStories()
</script>