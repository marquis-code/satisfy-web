<template>
    <div class="bg-red-50 rounded-lg p-4 h-64">
      <canvas ref="chartCanvas" class="w-full h-full"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (process.client) {
      const canvas = chartCanvas.value;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Data for the chart
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const data = [
        300, 320, 280, 250, 220, 230,
        210, 200, 240, 260, 290, 310
      ];
      
      // Chart dimensions
      const chartWidth = canvas.width - 60;
      const chartHeight = canvas.height - 60;
      const barWidth = chartWidth / months.length * 0.6;
      const barSpacing = chartWidth / months.length * 0.4;
      const maxValue = Math.max(...data) * 1.2;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw title
      ctx.fillStyle = '#6B7280';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Monthly Orders Analysis', canvas.width / 2, 20);
      
      // Draw y-axis labels
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      
      const yAxisLabels = [
        { value: maxValue, label: '618' },
        { value: maxValue / 2, label: '309' },
        { value: 0, label: '0' }
      ];
      
      yAxisLabels.forEach(item => {
        const y = 40 + chartHeight - (item.value / maxValue * chartHeight);
        ctx.fillText(item.label, 30, y);
        
        // Draw horizontal grid line
        ctx.beginPath();
        ctx.strokeStyle = '#E5E7EB';
        ctx.setLineDash([2, 2]);
        ctx.moveTo(40, y);
        ctx.lineTo(40 + chartWidth, y);
        ctx.stroke();
        ctx.setLineDash([]);
      });
      
      // Draw bars and x-axis labels
      months.forEach((month, index) => {
        const x = 40 + (chartWidth / months.length * index) + (chartWidth / months.length - barWidth) / 2;
        const barHeight = (data[index] / maxValue) * chartHeight;
        const y = 40 + chartHeight - barHeight;
        
        // Draw bar
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#FCA5A5');
        gradient.addColorStop(1, '#FEE2E2');
        ctx.fillStyle = gradient;
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
        
        // Draw x-axis label
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(month.substring(0, 3), x + barWidth / 2, 40 + chartHeight + 15);
      });
      
      // Draw legend
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      
      ctx.beginPath();
      ctx.fillStyle = '#FCA5A5';
      ctx.roundRect(canvas.width - 120, 15, 12, 12, 2);
      ctx.fill();
      
      ctx.fillStyle = '#6B7280';
      ctx.fillText('Total Orders', canvas.width - 100, 25);
    }
  });
  </script>