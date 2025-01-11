import { storyApiFactory } from "@/apiFactory/story";

export const useCreateChainedOriginal = () => {
    const payload = ref({
        title: '',
        storyIds: [],
    });
    const loading = ref(false);
    const createChainedOriginal = async () => {
        loading.value = true;
        try {
            const response = await storyApiFactory.createChainedOriginal(payload.value);
            console.log(payload.value)
            console.log(response);
            useNuxtApp().$toast.success('Created successfully!', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return response
        } catch (error: any) {
            useNuxtApp().$toast.error(error.message, {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }
    return {loading, createChainedOriginal, payload}
}