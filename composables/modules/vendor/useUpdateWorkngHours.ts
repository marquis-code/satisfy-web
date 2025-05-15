import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"

export const useUpdateWorkingHours = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref(null)

  const updateWorkingHours = async (payload:any) => {
    loading.value = true
    error.value = null

    try {
      const res = (await vendor_api.$_update_working_hours(payload)) as any
      if (res.type !== "ERROR") {
        result.value = res.data
        return res
      } else {
        error.value = res.message || "Failed to update working Hour"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { updateWorkingHours, result, loading, error }
}