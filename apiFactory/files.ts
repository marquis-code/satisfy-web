import { axiosInstance } from "./axios.config";

export const filesApiFactory = {
  getFilesList() {
    return axiosInstance.get("/user/dashboard-summary");
  },
};
