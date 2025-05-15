// composables/useDeliveryService.ts
import { ref, reactive, readonly } from 'vue'
import type { DeliveryLocation, PackSettings } from '~/types'

export const useDeliveryService = () => {
  // State
  const locations = ref<DeliveryLocation[]>([])
  const packSettings = reactive<PackSettings>({
    price: 10.00,
    limit: 10
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // API URL - would come from environment variables in a real app
  const apiBaseUrl = '/api'

  /**
   * Fetch all delivery locations from the API
   */
  const fetchLocations = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/delivery-locations`)
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 500))
      const data = [
        { name: 'Accord', price: 500.00, confirmed: true },
        { name: 'Zoo', price: 500.00, confirmed: true },
        { name: 'Kofesu', price: 500.00, confirmed: true },
        { name: 'Agbede', price: 500.00, confirmed: true },
        { name: 'Labuta', price: 600.00, confirmed: true },
        { name: 'Oluwo', price: 700.00, confirmed: true },
        { name: 'Isolu', price: 700.00, confirmed: true }, 
        { name: 'Camp', price: 900.00, confirmed: true },
      ]
      
      locations.value = data
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch delivery locations'
      error.value = errorMessage
      console.error('Error fetching locations:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch current pack settings from the API
   */
  const fetchPackSettings = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/pack-settings`)
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 300))
      const data = { price: 10.00, limit: 10 }
      
      packSettings.price = data.price
      packSettings.limit = data.limit
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pack settings'
      error.value = errorMessage
      console.error('Error fetching pack settings:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Add a new delivery location
   */
  const addLocation = async (location: DeliveryLocation) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate input
      if (!location.name.trim()) {
        throw new Error('Location name is required')
      }
      
      if (location.price <= 0) {
        throw new Error('Price must be greater than zero')
      }
      
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/delivery-locations`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(location),
      // })
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 300))
      const newLocation = { ...location, id: Date.now().toString() }
      
      // Update local state
      locations.value.push(newLocation)
      return newLocation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add location'
      error.value = errorMessage
      console.error('Error adding location:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Update an existing delivery location
   */
  const updateLocation = async (index: number, location: DeliveryLocation) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate input
      if (!location.name.trim()) {
        throw new Error('Location name is required')
      }
      
      if (location.price <= 0) {
        throw new Error('Price must be greater than zero')
      }
      
      if (index < 0 || index >= locations.value.length) {
        throw new Error('Invalid location index')
      }
      
      const locationId = locations.value[index].id || index.toString()
      
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/delivery-locations/${locationId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(location),
      // })
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 300))
      const updatedLocation = { ...location, id: locationId }
      
      // Update local state
      locations.value[index] = updatedLocation
      return updatedLocation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update location'
      error.value = errorMessage
      console.error('Error updating location:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Delete a delivery location
   */
  const deleteLocation = async (index: number) => {
    isLoading.value = true
    error.value = null
    
    try {
      if (index < 0 || index >= locations.value.length) {
        throw new Error('Invalid location index')
      }
      
      const locationId = locations.value[index].id || index.toString()
      
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/delivery-locations/${locationId}`, {
      //   method: 'DELETE',
      // })
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Update local state
      locations.value.splice(index, 1)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete location'
      error.value = errorMessage
      console.error('Error deleting location:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Update pack settings
   */
  const updatePackSettings = async (settings: PackSettings) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate input
      if (settings.price < 0) {
        throw new Error('Pack price cannot be negative')
      }
      
      if (settings.limit <= 0 || settings.limit > 15) {
        throw new Error('Pack limit must be between 1 and 15')
      }
      
      // In a real application, this would be an API call
      // const response = await fetch(`${apiBaseUrl}/pack-settings`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(settings),
      // })
      // const data = await response.json()
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Update local state
      packSettings.price = settings.price
      packSettings.limit = settings.limit
      return { ...packSettings }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update pack settings'
      error.value = errorMessage
      console.error('Error updating pack settings:', err)
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }
  
  // Initialize data
  const initialize = async () => {
    try {
      isLoading.value = true
      
      // Load both data sources in parallel
      await Promise.all([
        fetchLocations(),
        fetchPackSettings()
      ])
      
      return true
    } catch (err) {
      console.error('Failed to initialize delivery service:', err)
      error.value = 'Failed to initialize delivery service'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // Call initialize on service creation
  // This is optional and could be called manually instead
  initialize()
  
  // Return public API
  return {
    // State (expose locations as readonly to prevent direct mutations)
    locations: readonly(locations),
    packSettings,
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    initialize,
    fetchLocations,
    fetchPackSettings,
    addLocation,
    updateLocation,
    deleteLocation,
    updatePackSettings
  }
}