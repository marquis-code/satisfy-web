<script setup lang="ts">
import { ref } from 'vue'
import { useFetchOrderAnalysis } from "@/composables/modules/order/useFetchOrderAnalysis"
const { analytics: analyticsData, loading } = useFetchOrderAnalysis()

definePageMeta({
    layout: 'dashboard'
})

interface OrderAnalytics {
  month: number
  count: number
  revenue: number
  averageOrderValue: number
  completedOrders: number
  cancelledOrders: number
  completionRate: number
}

// // This would typically come from an API call
// const analyticsData = ref<OrderAnalytics[]>([
//   {
//     "month": 1,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 2,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 3,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 4,
//     "count": 7,
//     "revenue": 187700,
//     "averageOrderValue": 26814.285714285714,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 5,
//     "count": 2,
//     "revenue": 19200,
//     "averageOrderValue": 9600,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 6,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 7,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 8,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 9,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 10,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 11,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   },
//   {
//     "month": 12,
//     "count": 0,
//     "revenue": 0,
//     "averageOrderValue": 0,
//     "completedOrders": 0,
//     "cancelledOrders": 0,
//     "completionRate": 0
//   }
// ])
</script>

<template>
  <div v-if="!loading">
    <AnalyticsDashboard :data="analyticsData" />
  </div>
</template>
