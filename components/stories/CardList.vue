<template>
  <main>
    <div v-if="showHeader">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select id="tabs" name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option>Insights</option>
          <option>Stori</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="#" @click.prevent="activeTab = 'insight'"
              :class="[activeTab === 'insight' ? 'border-[#0ba9b9] text-[#0ba9b9]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              class="whitespace-nowrap border-b-4 py-2 px-1 text-sm font-medium">Insight</a>
            <a href="#" @click.prevent="activeTab = 'stori'"
              :class="[activeTab === 'stori' ? 'border-[#0ba9b9] text-[#0ba9b9]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              class="whitespace-nowrap border-b-4 py-2 px-1 text-sm font-medium">Stori</a>
          </nav>
        </div>
      </div>
    </div>

    <section class="bg-white border-[0.7px] border-gray-100 rounded-b-lg p-6 space-y-3">
      <StoriesFilters v-if="showHeader" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StoriesSingleStory v-for="(itm, idx) in stories" :stori="itm" :key="idx" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const activeTab = ref('insight')
defineProps({
  stories: {
    type: Array,
    required: true
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>