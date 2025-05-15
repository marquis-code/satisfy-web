import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"

export const useUpdatePackPrice = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref(null)

  const updatePackPrice = async (payload: any) => {
    loading.value = true
    error.value = null

    try {
      const res = (await vendor_api.$_update_pack_price(payload)) as any
      if (res.type !== "ERROR") {
        result.value = res.data
        return res
      } else {
        error.value = res.message || "Failed to update pack price"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { updatePackPrice, result, loading, error }
}