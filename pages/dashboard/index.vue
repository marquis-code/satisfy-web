<template>
  <main class="space-y-10">
    <DashboardStatsCards />
    <DashboardSectionTwo />
    <DashboardSectionThree />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});
</script>