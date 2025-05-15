import { ref } from "vue"
import { review_api } from "@/api_factory/modules/review"

export const useFetchVendorsReviews = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const reviews = ref(null)
  const vendorData = ref({}) as any
  const userData = ref({})

  const fetchVendorReviews = async (vendorId: string) => {
    loading.value = true
    error.value = null
    const vendorString = localStorage.getItem("selected-vendor");
    const userString = localStorage.getItem("user");
    if (vendorString) {
      vendorData.value = JSON.parse(vendorString);
    }

    if (userString) {
      userData.value = JSON.parse(userString);
    }

    try {
      const res = (await review_api.$_fetch_reviews(vendorId || vendorData.value._id || userData.value._id)) as any
      console.log(res.data, 'res here again')
      if (res.type !== "ERROR") {
        reviews.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch reviews"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  // onMounted(() => {
  //   if(vendorId)
  //   fetchVendorReviews()
  // })

  return { fetchVendorReviews, reviews, loading, error }
}