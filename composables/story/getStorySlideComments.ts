import { storyApiFactory } from "@/apiFactory/story";

export const useFetchSlideComments = () => {
  const comments = ref(null);
//   const storyId = useRoute().params.id;
  const loading = ref(false);
  const fetchSlideComments = async (id) => {
    loading.value = true; 
    try {
      const response = await storyApiFactory.getStorySideComments(id);
      comments.value = response.data;
    //   console.log(comments.value)
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { fetchSlideComments, comments, loading };
};
