// import { ref } from "vue"
// import { menu_api } from "@/api_factory/modules/menu"
// import { useFetchMenu } from "@/composables/modules/menu/useFetchMenu"

// export const useEnableMenu = () => {
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//   const result = ref(null)
//   const { fetchMenu } = useFetchMenu()

//   const enableMenu = async (id: string) => {
//     loading.value = true
//     error.value = null

//     try {
//       const res = (await menu_api.$_enable_menu(id)) as any
//       if (res.type !== "ERROR") {
//         result.value = res.data
//         // fetchMenu()
//         window.location.reload()
//         return res
//       } else {
//         error.value = res.message || "Failed to enable menu"
//       }
//     } catch (err: any) {
//       error.value = err.message || "An unexpected error occurred"
//     } finally {
//       loading.value = false
//     }
//   }

//   return { enableMenu, result, loading, error }
// }

import { ref } from "vue"
import { menu_api } from "@/api_factory/modules/menu"
import { useFetchMenu } from "@/composables/modules/menu/useFetchMenu"

export const useEnableMenu = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref(null)
  const refreshTrigger = ref(0) // Added to trigger reactive updates
  const { fetchMenu } = useFetchMenu()

  const enableMenu = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const res = (await menu_api.$_enable_menu(id)) as any
      if (res.type !== "ERROR") {
        result.value = res.data
        await fetchMenu() // Re-fetch the menu data
        refreshTrigger.value++ // Increment to trigger reactivity
        return res
      } else {
        error.value = res.message || "Failed to enable menu"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { enableMenu, result, loading, error, refreshTrigger }
}