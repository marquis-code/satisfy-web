import { storyApiFactory } from "@/apiFactory/story";

export const useGetTagCloud = () => {
    const loading = ref(false);
    const tags = ref([]);
    const pagination = ref({
        page: 1,
        perPage: 10,
    });
    const fetchTagCloud = async () => {
        loading.value = true;
        try {
            const response = await storyApiFactory.getTagCloud(pagination.value);
            tags.value = response.data.result.slice(0, 30)
            // console.log(response.data.result);
        } catch (error : any) {
            useNuxtApp().$toast.error(error.message, {
                autoClose: 5000,
                dangerouslyHTMLString: true,
              });
              return error;
        } finally {
            loading.value = false;
        }
    }
    return {loading, tags, fetchTagCloud}
}