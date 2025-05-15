// useUpdateDeliveryLocation.ts
import { ref } from "vue"
import { delivery_location_api } from "@/api_factory/modules/delivery_location"

export const useUpdateDeliveryLocation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateDeliveryLocation = async (id: string, payload: any) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = await delivery_location_api.$_update_delivery_location(id, payload) as any
      if (res.type !== "ERROR") {
        success.value = true
        window.location.reload()
        return res
      } else {
        error.value = res.message || "Failed to update delivery location"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { updateDeliveryLocation, loading, error, success }
}
