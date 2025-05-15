// useCreateDeliveryLocation.ts
import { ref } from "vue"
import { delivery_location_api } from "@/api_factory/modules/delivery_location"

export const useCreateDeliveryLocation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const createDeliveryLocation = async (payload: { name: string, deliveryFee: number }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = await delivery_location_api.$_create_delivery_location(payload) as any
      if (res.type !== "ERROR") {
        success.value = true
        return res
      } else {
        error.value = res.message || "Failed to create delivery location"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { createDeliveryLocation, loading, error, success }
}
