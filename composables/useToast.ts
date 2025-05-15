import { ref } from 'vue'

interface Toast {
  show: boolean
  type: 'success' | 'error'
  message: string
}

export const useToast = () => {
  const toast = ref<Toast>({
    show: false,
    type: 'success',
    message: ''
  })

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toast.value = {
      show: true,
      type,
      message
    }
    
    setTimeout(() => {
      toast.value.show = false
    }, 3000)
  }

  return {
    toast,
    showToast
  }
}