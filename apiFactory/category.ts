import { axiosInstance } from "./axios.config";

export const categoryApiFactory = {
    createCategory(payload: any) {
        return axiosInstance.post('/categories', payload);
    },
};
