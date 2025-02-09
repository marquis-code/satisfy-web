import { userApiFactory } from "@/apiFactory/users";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const route = useRoute()


const payload = ref({
  id: route.params.id,
  reason: "t",
  duration: "" // in days
})

export const useSuspendUser = () => {
  const loading = ref(false);

  const suspendUser = async () => {
    loading.value = true;
    const response = await userApiFactory.suspendUser(route.params.id, payload.value) as any
    if(response !== 'undefined'){
       showToast({
        title: "Success",
        message: "User was suspended successfully.",
        toastType: "success",
        duration: 3000
    });  
    } else {
       showToast({
            title: "Error",
            message: response?.error?.message || 'Something went wrong.',
            toastType: "error",
            duration: 3000
        });
    }
    loading.value = false;
    console.log(response, 'res ponse here')
  };

  const setPayload = (data: any) => {
    payload.value.id = data.id,
    payload.value.reason = data.reason
    payload.value.duration = data.duration
  }

  return { suspendUser, loading, payload, setPayload };
};
