<template>
    <div class="w-full h-full">
      <canvas ref="chartRef"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import Chart from 'chart.js/auto'
  
  const props = defineProps<{
    data: { month: string; orders: number }[]
  }>()
  
  const chartRef = ref<HTMLCanvasElement | null>(null)
  let chart: Chart | null = null
  
  const createChart = () => {
    if (!chartRef.value) return
    
    const ctx = chartRef.value.getContext('2d')
    if (!ctx) return
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.data.map(item => item.month),
        datasets: [{
          label: 'Total Orders',
          data: props.data.map(item => item.orders),
          backgroundColor: 'rgba(157, 236, 223, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }
  
  onMounted(() => {
    createChart()
  })
  
  watch(() => props.data, () => {
    if (chart) {
      chart.destroy()
    }
    createChart()
  }, { deep: true })
  </script>