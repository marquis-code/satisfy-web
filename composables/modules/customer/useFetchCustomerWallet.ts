import { ref } from "vue"
import { customer_api } from "@/api_factory/modules/customer"

export const useCustomerWallet = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const wallet = ref(null)

  const fetchWallet = async () => {
    loading.value = true
    error.value = null

    try {
      const res = (await customer_api.$_fetch_customer_wallet()) as any
      if (res.type !== "ERROR") {
        wallet.value = res.data
        return res
      } else {
        error.value = res.message || "Failed to fetch wallet"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { fetchWallet, wallet, loading, error }
}

