import { ref } from 'vue'

interface Location {
  id: string
  name: string
  price: number
}

export const useDeliveryLocations = () => {
  const locations = ref<Location[]>([])
  const packPrice = ref<number>(300)
  const packLimit = ref<number>(15)

  const addLocation = (location: Location) => {
    locations.value.push(location)
  }

  const updateLocation = (updatedLocation: Location) => {
    const index = locations.value.findIndex(loc => loc.id === updatedLocation.id)
    if (index !== -1) {
      locations.value[index] = updatedLocation
    }
  }

  const deleteLocation = (id: string) => {
    locations.value = locations.value.filter(loc => loc.id !== id)
  }

  const updatePackSettings = (price: number, limit: number) => {
    packPrice.value = price
    packLimit.value = limit
  }

  return {
    locations,
    addLocation,
    updateLocation,
    deleteLocation,
    packPrice,
    packLimit,
    updatePackSettings
  }
}