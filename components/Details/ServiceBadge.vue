<template>
    <span 
      class="px-4 py-2 rounded-full text-sm"
      :class="colorClasses[color]"
    >
      {{ text }}
    </span>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    text: string
    color: 'green' | 'purple' | 'orange' | 'blue' | 'red'
  }>()
  
  const colorClasses = {
    green: 'bg-[#BCE6C7] text-[#222222] border border-[#58C174]',
    purple: 'bg-[#E1CCD8] text-[#222222] border border-[#68003C]',
    orange: 'text-[#222222] border bg-[#FEEBD6] border-[#F99D33]',
    blue: 'text-[#222222] border bg-[#D6EEFF] border-[#0072C6]',
    red: 'text-[#222222] border bg-[#F7B4AE] border-[#EA4335]'
  }
  </script>
  