import { categoryApiFactory } from "@/apiFactory/category";

const loading = ref(false);
const payload = ref({
    name: "",
    description: "",
}) as any;

export const useCreateCategory = () => {
    const createCategory = async () => {
        loading.value = true;
        try {
            const response = await categoryApiFactory.createCategory(payload.value);
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
    };

    const setPayload = (data: any) => {
        payload.value.name = data.name;
        payload.value.description = data.description;
    };

    return { createCategory, payload, loading, setPayload};
};
