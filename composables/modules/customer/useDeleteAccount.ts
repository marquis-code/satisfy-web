import { ref } from "vue"
import { customer_api } from "@/api_factory/modules/customer"

export const useDeleteAccount = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deleteAccount = async () => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = (await customer_api.$_delete_account()) as any
      if (res.type !== "ERROR") {
        success.value = true
        return res
      } else {
        error.value = res.message || "Failed to delete account"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { deleteAccount, loading, error, success }
}

