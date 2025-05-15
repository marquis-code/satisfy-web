import { ref } from "vue"
import { delivery_location_api } from "@/api_factory/modules/delivery_location"

export const useVendorDeliveryLocations = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const vendorDeliveryLocations = ref<any[]>([])
  const vendor = localStorage.getItem('selected-vendor') as any
  const parsedVendor = JSON.parse(vendor)

  const fetchVendorDeliveryLocations = async (vendorId?: string) => {
    loading.value = true
    error.value = null

    try {
      const res = await delivery_location_api.$_vendor_delivery_locations(vendorId || parsedVendor?._id) as any
      if (res.type !== "ERROR") {
        vendorDeliveryLocations.value = res.data || []
        return res
      } else {
        error.value = res.message || "Failed to fetch vendor delivery locations"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
 if(parsedVendor?._id){
  fetchVendorDeliveryLocations()
 }
  })

  return { fetchVendorDeliveryLocations, loading, error, vendorDeliveryLocations }
}
