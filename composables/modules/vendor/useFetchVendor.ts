import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"
import { useFormattedString } from '@/composables/core/useFormatVendorName'
const { formatString } = useFormattedString()

export const useFetchVendor = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const vendor = ref(null)
  const route  = useRoute()

  const fetchVendor = async () => {
    loading.value = true
    error.value = null
    const user = JSON.parse(localStorage.getItem('user'))

    try {
      const res = (await vendor_api.$_fetch_vendor_by_id(user._id)) as any
      if (res.type !== "ERROR") {
        vendor.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch vendor"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchVendor()
  })

  return { fetchVendor, vendor, loading, error }
}