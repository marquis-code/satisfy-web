import { ref, computed } from 'vue'

interface Delivery {
  id: string
  address: string
  riderName: string
  status: 'Pending' | 'Completed' | 'Failed'
  price: number
  requestTime: string
  pickupTime: string
}

export const useDeliveries = () => {
  const deliveries = ref<Delivery[]>([])

  const addDelivery = (delivery: Delivery) => {
    deliveries.value.push(delivery)
  }

  const updateDelivery = (updatedDelivery: Delivery) => {
    const index = deliveries.value.findIndex(d => d.id === updatedDelivery.id)
    if (index !== -1) {
      deliveries.value[index] = updatedDelivery
    }
  }

  const deleteDelivery = (id: string) => {
    deliveries.value = deliveries.value.filter(d => d.id !== id)
  }

  const pendingDeliveries = computed(() => {
    return deliveries.value.filter(d => d.status === 'Pending').length
  })

  const completedDeliveries = computed(() => {
    return deliveries.value.filter(d => d.status === 'Completed').length
  })

  const totalDeliveries = computed(() => {
    return deliveries.value.length
  })

  return {
    deliveries,
    addDelivery,
    updateDelivery,
    deleteDelivery,
    pendingDeliveries,
    completedDeliveries,
    totalDeliveries
  }
}