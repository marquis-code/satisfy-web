import { ref, computed } from 'vue'

export interface Order {
  id: string
  customer: string
  total: number
  dateAdded: string
  location: string
}

export interface SalesItem {
  id: string
  name: string
  count: number
  unitPrice: number
  sales: number
}

export function useOrders() {
  const orders = ref<Order[]>([])
  const salesItems = ref<SalesItem[]>([])
  const dateRange = ref({
    from: '',
    to: ''
  })
  const entriesPerPage = ref(50)
  const searchQuery = ref('')

  const totalSales = computed(() => {
    return salesItems.value.reduce((total, item) => total + item.sales, 0)
  })

  const totalOrders = computed(() => orders.value.length)
  
  const todaysOrders = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return orders.value.filter(order => order.dateAdded.startsWith(today))
  })

  const downloadExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert('Excel file downloaded successfully!')
  }

  const sortOrders = () => {
    // In a real app, this would sort orders based on date range
    alert('Orders sorted successfully!')
  }

  // Monthly data for chart
  const monthlyData = computed(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    return months.map(month => ({
      month,
      orders: Math.floor(Math.random() * 10) // Random data for demonstration
    }))
  })

  return {
    orders,
    salesItems,
    dateRange,
    entriesPerPage,
    searchQuery,
    totalSales,
    totalOrders,
    todaysOrders,
    monthlyData,
    downloadExcel,
    sortOrders
  }
}