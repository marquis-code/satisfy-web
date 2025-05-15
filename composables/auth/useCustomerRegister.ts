import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import type { CustomerSignup } from "@/api_factory/modules/auth"

export const useCustomerRegister = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const registerCustomer = async (credentials: CustomerSignup) => {
    loading.value = true
    error.value = null

    try {
      const res = (await auth_api.$_customer_register(credentials)) as any
      if (res.type !== "ERROR") {
        // Handle successful registration
        router.push('/login')
        return res
      } else {
        error.value = res.data.message || "Registration failed"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { registerCustomer, loading, error }
}

