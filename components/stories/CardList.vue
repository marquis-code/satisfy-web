<template>
  <main>
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option>Insights</option>
          <option>Stori</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="#" @click.prevent="activeTab = 'insight'" :class="[activeTab === 'insight' ? 'border-[#0ba9b9] text-[#0ba9b9]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              class="whitespace-nowrap border-b-4 py-2 px-1 text-sm font-medium">Insight</a>
            <a href="#" @click.prevent="activeTab = 'stori'" :class="[activeTab === 'stori' ? 'border-[#0ba9b9] text-[#0ba9b9]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              class="whitespace-nowrap border-b-4 py-2 px-1 text-sm font-medium">Stori</a>
          </nav>
        </div>
      </div>
    </div>

    <section class="bg-white border-[0.7px] border-gray-100 rounded-lg p-6 space-y-3">
      <StoriesFilters />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="(itm, idx) in stories" :key="idx" class="rounded-lg border border-gray-200 space-y-6 relative pt-4">
          <div class="flex justify-end items-end pr-4">
            <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <div class="px-4">
            <img v-if="itm.cover_image" :src="itm.cover_image" class="h-10 w-10 rounded-full" alt="" />
            <img v-else src="@/assets/img/stori.png" class="h-10 w-10 rounded-full" alt="" />
          </div>
          <h1 class="px-4 text-sm text-gray-700">{{ itm?.title ?? 'Nil' }}</h1>
          <div class="flex justify-between items-center px-4 pb-14">
            <div class="flex items-center gap-x-2 font-medium text-gray-600"><img src="@/assets/icons/reactions.svg"
                alt="" /> {{
          itm.reactions_count ?? 'Nil' }}</div>
            <img src="@/assets/icons/stori-eclipse.svg" alt="" />
          </div>
          <div class="absolute w-full bottom-0">
            <div class="border-t border-gray-300 flex justify-end items-end">
              <p class="text-gray-400 text-sm font-medium px-4 py-3">
                <span v-if="itm.published_at">{{ moment(itm?.published_at).format("MMM DD, YYYY") }}</span>
                <span v-else>Nil</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import moment from 'moment'
const activeTab = ref('insight')
defineProps({
  stories: {
    type: Array,
    required: true
  },
})
</script>