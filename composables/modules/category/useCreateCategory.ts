// import { ref } from "vue"
// import { category_api } from "@/api_factory/modules/category"
// import type { CategoryPayload } from "@/api_factory/modules/category"
// import { useFetchCategory } from '@/composables/modules/category/useFetchCategory'

// export const useCreateCategory = () => {
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//   const category = ref(null)
//   const { fetchCategory } = useFetchCategory()

//   const createCategory = async (payload: CategoryPayload) => {
//     loading.value = true
//     error.value = null

//     try {
//       const res = (await category_api.$_create_mcategory(payload)) as any
//       if (res.type !== "ERROR") {
//         category.value = res.data
//         window.location.reload()
//         await fetchCategory()
//         return res.data
//       } else {
//         error.value = res.message || "Failed to create category"
//       }
//     } catch (err: any) {
//       error.value = err.message || "An unexpected error occurred"
//     } finally {
//       loading.value = false
//     }
//   }

//   return { createCategory, category, loading, error }
// }

import { ref } from "vue"
import { category_api } from "@/api_factory/modules/category"
import type { CategoryPayload } from "@/api_factory/modules/category"
import { useFetchCategory } from '@/composables/modules/category/useFetchCategory'

export const useCreateCategory = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const category = ref(null)
  const refreshTrigger = ref(0) // Added to trigger reactive updates
  const { fetchCategory } = useFetchCategory()

  const createCategory = async (payload: CategoryPayload) => {
    loading.value = true
    error.value = null

    try {
      const res = (await category_api.$_create_mcategory(payload)) as any
      if (res.type !== "ERROR") {
        category.value = res.data
        await fetchCategory() // Re-fetch the category data
        refreshTrigger.value++ // Increment to trigger reactivity
        return res.data
      } else {
        error.value = res.message || "Failed to create category"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { createCategory, category, loading, error, refreshTrigger }
}