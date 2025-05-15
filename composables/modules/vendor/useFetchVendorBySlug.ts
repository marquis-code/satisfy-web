import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"

export const useFetchVendorBySlug = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const vendor = ref(null)
  const route  = useRoute()

  const user = JSON.parse(localStorage.getItem('user'))
  const slug = route?.params?.id || user.slug  as any

  const fetchVendorBySlug = async () => {
    loading.value = true
    error.value = null

    try {
      const res = (await vendor_api.$_fetch_vendor_by_name(slug)) as any
      if (res.type !== "ERROR") {
        vendor.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch vendors"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if(slug.length){
      fetchVendorBySlug()
    }
  })

  return { fetchVendorBySlug, vendor, loading, error }
}