import { storyApiFactory } from "@/apiFactory/story";
import Swal from "sweetalert2";


export const useDeleteStory = () => {
  const router = useRouter()
  const loading = ref(false);
  const deleteStory = async (id: string | number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete.",
      cancelButtonText: "Nah, Just kidding",
    }).then(async (result) => {
      if (result.value) {
        try {
          loading.value = true;
          const response = await storyApiFactory.deleteUserStory(id);
          router.push({ path: "/dashboard/pods" });
          return response;
        } catch (error: any) {
          useNuxtApp().$toast.error(error.message, {
            autoClose: 5000,
            dangerouslyHTMLString: true,
          });
          return error;
        } finally {
          loading.value = false;
        }
      } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
      }
    });
  };

  return { deleteStory, loading };
};
