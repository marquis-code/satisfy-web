import { ref } from "vue"
import { vendor_api } from "@/api_factory/modules/vendor"
import { useFormattedString } from '@/composables/core/useFormatVendorName'
const { formatString } = useFormattedString()

export const useFetchVendorById = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const vendor = ref(null)
  const vendorObj = localStorage.getItem('selected-vendor') as any
  const userObj = localStorage.getItem('user') as any
  const parsedVendor = JSON.parse(vendorObj)
  const parsedUser = JSON.parse(userObj)
  const route  = useRoute()

  const fetchVendorById = async () => {
    loading.value = true
    error.value = null
    const id = route?.params?.id  || vendorObj?._id || parsedUser?._id

    try {
      const res = (await vendor_api.$_fetch_vendor_by_id(id)) as any
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
    if(parsedVendor?._id || parsedUser?._id){
      fetchVendorById()
    }
  })

  // if(parsedVendor._id){
  //   fetchVendorDeliveryLocations()
  //  }

  return { fetchVendorById, vendor, loading, error }
}