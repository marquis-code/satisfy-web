// import { ref } from "vue"
// import { menu_api } from "@/api_factory/modules/menu"
// import type { UpdateMenu } from "@/api_factory/modules/menu"
// import { useFetchMenu } from '@/composables/modules/menu/useFetchMenu'

// export const useEditMenu = () => {
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//   const menu = ref(null)
//   const { fetchMenu } = useFetchMenu()

//   const editMenu = async (id: string, payload: UpdateMenu) => {
//     loading.value = true
//     error.value = null

//     try {
//       const res = (await menu_api.$_edit_menu(id, payload)) as any
//       if (res.type !== "ERROR") {
//         fetchMenu()
//         menu.value = res.data
//         return res
//       } else {
//         error.value = res.message || "Failed to edit menu"
//       }
//     } catch (err: any) {
//       error.value = err.message || "An unexpected error occurred"
//     } finally {
//       loading.value = false
//     }
//   }

//   return { editMenu, menu, loading, error }
// }

import { ref } from "vue"
import { menu_api } from "@/api_factory/modules/menu"
import type { UpdateMenu } from "@/api_factory/modules/menu"
import { useFetchMenu } from '@/composables/modules/menu/useFetchMenu'

export const useEditMenu = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const menu = ref(null)
  const refreshTrigger = ref(0) // Added to trigger reactive updates
  const { fetchMenu } = useFetchMenu()

  const editMenu = async (id: string, payload: UpdateMenu) => {
    loading.value = true
    error.value = null

    try {
      const res = (await menu_api.$_edit_menu(id, payload)) as any
      if (res.type !== "ERROR") {
        menu.value = res.data
        await fetchMenu() // Re-fetch the menu data
        refreshTrigger.value++ // Increment to trigger reactivity
        return res
      } else {
        error.value = res.message || "Failed to edit menu"
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred"
    } finally {
      loading.value = false
    }
  }

  return { editMenu, menu, loading, error, refreshTrigger }
}