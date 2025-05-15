import { ref } from "vue"
import { delivery_location_api } from "@/api_factory/modules/delivery_location"

export const useDeleteDeliveryLocation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deleteDeliveryLocation = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = await delivery_location_api.$_delete_delivery_location(id) as any
      if (res.type !== "ERROR") {
        success.value = true
        return res
      } else {
        error.value = res.message || "Failed to delete delivery location"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { deleteDeliveryLocation, loading, error, success }
}
