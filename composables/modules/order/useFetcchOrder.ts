import { ref } from "vue"
import { order_api } from "@/api_factory/modules/order"
import { useFormattedString } from '@/composables/core/useFormatVendorName'
const { formatString } = useFormattedString()

export const useFetchOrderById = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const order = ref(null)
  const route  = useRoute()

  const fetchOrderById = async () => {
    loading.value = true
    error.value = null
    try {
      const res = (await order_api.$_get_order_by_id(route?.params?.id)) as any
      if (res.type !== "ERROR") {
        order.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch order"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
      fetchOrderById()
  })

  // if(parsedVendor._id){
  //   fetchVendorDeliveryLocations()
  //  }

  return { fetchOrderById, order, loading, error }
}