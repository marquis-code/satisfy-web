<template>
    <div class="relative h-full w-full">
      <div class="mb-4 flex flex-wrap gap-2">
        <div v-for="(location, index) in locations" :key="index" class="flex items-center">
          <div class="w-4 h-4 mr-1 rounded" :style="{ backgroundColor: colors[index % colors.length] }"></div>
          <span class="text-xs text-gray-600 dark:text-gray-400">{{ location }}</span>
        </div>
      </div>
      <canvas ref="chartRef"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Chart from 'chart.js/auto'
  
  const chartRef = ref<HTMLCanvasElement | null>(null)
  
  const locations = [
    'Accord', 'Agbede', 'Apakila', 'Arowo', 'Camp', 'Fatola', 'Harmony', 'Isolu',
    'Kofesu', 'Labuta', 'Oluwo', 'Others', 'Pick it up myself', 'School, FUNAAB', 'Zoo'
  ]
  
  const colors = [
    'rgba(187, 237, 237, 0.7)', 'rgba(196, 196, 237, 0.7)', 'rgba(237, 196, 196, 0.7)',
    'rgba(196, 237, 196, 0.7)', 'rgba(237, 237, 196, 0.7)', 'rgba(237, 196, 237, 0.7)',
    'rgba(196, 237, 237, 0.7)', 'rgba(237, 196, 196, 0.7)', 'rgba(196, 196, 237, 0.7)',
    'rgba(196, 237, 196, 0.7)', 'rgba(237, 237, 196, 0.7)', 'rgba(237, 196, 237, 0.7)',
    'rgba(196, 237, 237, 0.7)', 'rgba(237, 196, 196, 0.7)', 'rgba(196, 196, 237, 0.7)'
  ]
  
  onMounted(() => {
    if (chartRef.value) {
      const ctx = chartRef.value.getContext('2d')
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: locations,
            datasets: [{
              data: [10, 15, 5, 12, 8, 6, 20, 7, 9, 11, 14, 5, 8, 25, 10],
              backgroundColor: colors,
              borderColor: colors.map(color => color.replace('0.7', '1')),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }
    }
  })
  </script>