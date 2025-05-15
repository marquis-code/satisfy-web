// import { ref } from "vue"
// import { menu_api } from "@/api_factory/modules/menu"
// import { useFetchMenu } from "@/composables/modules/menu/useFetchMenu"
// import type { MenuPayload } from "@/api_factory/modules/menu"
// const { fetchMenu } = useFetchMenu()
// export const useCreateMenu = () => {
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//   const menu = ref(null)

//   const createMenu = async (payload: MenuPayload) => {
//     loading.value = true
//     error.value = null

//     try {
//       const res = (await menu_api.$_create_menue(payload)) as any
//       if (res.type !== "ERROR") {
//         menu.value = res.data
//         window.location.reload()
//         fetchMenu()
//         return res
//       } else {
//         error.value = res.message || "Failed to create menu"
//       }
//     } catch (err: any) {
//       error.value = err.message || "An unexpected error occurred"
//     } finally {
//       loading.value = false
//     }
//   }

//   return { createMenu, menu, loading, error }
// }

import { ref } from "vue"
import { menu_api } from "@/api_factory/modules/menu"
import { useFetchMenu } from "@/composables/modules/menu/useFetchMenu"
import type { MenuPayload } from "@/api_factory/modules/menu"

const { fetchMenu } = useFetchMenu()

export const useCreateMenu = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const menu = ref(null)
  const refreshTrigger = ref(0) // Added to trigger reactive updates

  const createMenu = async (payload: MenuPayload) => {
    loading.value = true
    error.value = null

    try {
      const res = (await menu_api.$_create_menue(payload)) as any
      if (res.type !== "ERROR") {
        menu.value = res.data
        // Instead of window.location.reload(), use these methods:
        await fetchMenu() // Re-fetch the menu data
        refreshTrigger.value++ // Increment to trigger reactivity
        return res
      } else {
        error.value = res.message || "Failed to create menu"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { createMenu, menu, loading, error, refreshTrigger }
}