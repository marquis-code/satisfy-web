// useFetchLoggedInDeliveryLocations.ts
import { ref } from "vue"
import { delivery_location_api } from "@/api_factory/modules/delivery_location"

export const useFetchLoggedInDeliveryLocations = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const deliveryLocations = ref<any[]>([])

  const fetchLoggedInDeliveryLocations = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await delivery_location_api.$_fetch_loggedIn_delivery_location() as any
      if (res.type !== "ERROR") {
        deliveryLocations.value = res.data || []
        return res
      } else {
        error.value = res.message || "Failed to fetch delivery locations"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { fetchLoggedInDeliveryLocations, loading, error, deliveryLocations }
}
