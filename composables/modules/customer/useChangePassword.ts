import { ref } from "vue"
import { customer_api } from "@/api_factory/modules/customer"
import type { UpdatePassword } from "@/api_factory/modules/customer"

export const useChangePassword = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const changePassword = async (passwordData: UpdatePassword) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = (await customer_api.$_change_password(passwordData)) as any
      if (res.type !== "ERROR") {
        success.value = true
        return res
      } else {
        error.value = res.message || "Failed to change password"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { changePassword, loading, error, success }
}

