import { ref } from "vue"
import { order_api } from "@/api_factory/modules/order"
import { useFormattedString } from '@/composables/core/useFormatVendorName'
const { formatString } = useFormattedString()

export const useFetchOrderAnalysis = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const analytics = ref(null)
  const route  = useRoute()

  const fetchOrderAnalysis = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await order_api.$_get_orders_monthly_analysis()
      if (res.type !== "ERROR") {
        analytics.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch analytics"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
      fetchOrderAnalysis()
  })


  return { fetchOrderAnalysis, analytics, loading, error }
}