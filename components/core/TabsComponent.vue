<template>
    <div class="">
      <!-- Tabs Section -->
      <div class="flex items-center space-x-6 border-b">
        <span
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectTab(tab.key)"
          :class="[
            activeTab === tab.key ? 'text-black border-b-4 border-gray-800' : 'text-gray-500',
            'cursor-pointer pb-2'
          ]"
        >
          {{ tab.label }}
        </span>
      </div>
  
      <!-- Content Section -->
      <div class="mt-6">
        <slot :activeTab="activeTab"></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  interface TabItem {
    key: string;
    label: string;
  }
  
  // Props: Array of tabs
  const props = defineProps<{
    tabs: TabItem[];
  }>();
  
  // Emits: Emit the selected tab key
  const emit = defineEmits<{
    (e: 'update:activeTab', key: string): void;
  }>();
  
  // Router utilities
  const route = useRoute();
  const router = useRouter();
  
  // Active tab state
  const activeTab = ref<string>('');
  
  // Select a tab and update query params
  const selectTab = (key: string) => {
    activeTab.value = key;
    emit('update:activeTab', key);
  
    // Update the query param
    router.push({
      query: { ...route.query, tab: key },
    });
  };
  
  // Set the initial tab when component is mounted
  onMounted(() => {
    const queryTab = route.query.tab as string;
  
    // If there's a tab in the query, use it. Otherwise, default to the first tab in the props array.
    activeTab.value = queryTab || props.tabs[0].key;
  
    // Emit the initial active tab
    emit('update:activeTab', activeTab.value);
  });
  
  // Watch for route changes to update the tab if the query param changes
  watch(
    () => route.query.tab,
    (newTab) => {
      if (newTab && newTab !== activeTab.value) {
        activeTab.value = newTab as string;
      }
    }
  );
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  