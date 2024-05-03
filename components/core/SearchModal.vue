<!-- components/SearchModal.vue -->
<template>
    <div v-if="isOpen" class="fixed h-screen w-screen z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter route name..."
          class="w-full border border-gray-300 p-2 rounded-md"
          autofocus
        />
        <ul v-if="filteredRoutes.length" class="mt-2">
          <li
            v-for="route in filteredRoutes"
            :key="route.path"
            @click.stop="navigateTo(route.path)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ formatRouteName(route.name) }}
          </li>
        </ul>
        <div v-if="!filteredRoutes.length && searchQuery" class="p-2 text-gray-600">
          No matching routes found.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps<{ isOpen: boolean }>();
  const emit = defineEmits(['update:isOpen']);
  
  const searchQuery = ref('');
  const router = useRouter();
  const routes = router.getRoutes().map(route => ({
    path: route.path,
    name: route.name || 'Unnamed Route',
  }));
  
  const filteredRoutes = computed(() => {
    return routes.filter((route: any) => route.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });
  
  function formatRouteName(name: any): string {
    return name.replace(/-/g, ' ');
  }
  
  const navigateTo = (path: string) => {
    router.push(path);
    emit('update:isOpen', false);
  };
  
  const closeModal = () => {
    emit('update:isOpen', false);
  };
  </script>
  