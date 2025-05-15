import { ref } from "vue"
import { review_api } from "@/api_factory/modules/review"
import type { OrderPayload } from "@/api_factory/modules/order"

export const useCreateReview = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const reviewResponse = ref({})
  const vendorData = ref({}) as any


  const createReview = async (payload: any, vendorId?: any) => {
    loading.value = true
    error.value = null

    const vendorString = localStorage.getItem("selected-vendor");
    if (vendorString) {
      vendorData.value = JSON.parse(vendorString);
    }

    try {
      const res = (await review_api.$_create_review(vendorId || vendorData.value._id, payload)) as any
      if (res.type !== "ERROR") {
        console.log(res.data,'order res')
        reviewResponse.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to create review"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { createReview, loading, error }
}