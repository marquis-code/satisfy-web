<template>
    <div class="relative h-full w-full">
      <canvas ref="chartRef"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Chart from 'chart.js/auto'
  
  const chartRef = ref<HTMLCanvasElement | null>(null)
  
  onMounted(() => {
    if (chartRef.value) {
      const ctx = chartRef.value.getContext('2d')
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'Total Orders',
              data: [800, 750, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(52, 211, 153, 0.2)',
              borderColor: 'rgba(52, 211, 153, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 1000,
                ticks: {
                  stepSize: 200
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        })
      }
    }
  })
  </script>