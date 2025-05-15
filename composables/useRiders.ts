import { ref, computed } from 'vue'

interface Rider {
  id: string
  name: string
  count: number
}

export const useRiders = () => {
  const riders = ref<Rider[]>([])
  const totalAmountValue = ref<number>(0)

  const addRider = (rider: Rider) => {
    riders.value.push(rider)
  }

  const updateRider = (updatedRider: Rider) => {
    const index = riders.value.findIndex(r => r.id === updatedRider.id)
    if (index !== -1) {
      riders.value[index] = updatedRider
    }
  }

  const deleteRider = (id: string) => {
    riders.value = riders.value.filter(r => r.id !== id)
  }

  const clearRiders = () => {
    riders.value = []
  }

  const totalAmount = computed(() => {
    return totalAmountValue.value
  })

  return {
    riders,
    addRider,
    updateRider,
    deleteRider,
    clearRiders,
    totalAmount
  }
}