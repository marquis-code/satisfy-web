import { ref } from "vue"
import { customer_api } from "@/api_factory/modules/customer"

export const useDeactivateAccount = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deactivateAccount = async (payload: any) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = (await customer_api.$_deactivate_account(payload)) as any
      if (res.type !== "ERROR") {
        success.value = true
        return res
      } else {
        error.value = res.message || "Failed to deactivate account"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { deactivateAccount, loading, error, success }
}

