import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"
// import type { CustomerProfile } from "@/api_factory/modules/vendor"

export const useUpdateProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateProfile = async (profileData: any) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const res = (await vendor_api.$_update_profile(profileData)) as any
      if (res.type !== "ERROR") {
        success.value = true
        window.location.reload()
        return res
      } else {
        error.value = res.message || "Failed to update profile"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { updateProfile, loading, error, success }
}

