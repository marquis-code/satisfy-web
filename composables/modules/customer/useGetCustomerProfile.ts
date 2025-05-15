import { ref } from "vue"
import { customer_api } from "@/api_factory/modules/customer"

export const useCustomerProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const profile = ref(null)

  const fetchProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const res = (await customer_api.$_fetch_customer_profile()) as any
      if (res.type !== "ERROR") {
        profile.value = res.data
        return res
      } else {
        error.value = res.message || "Failed to fetch profile"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { fetchProfile, profile, loading, error }
}

