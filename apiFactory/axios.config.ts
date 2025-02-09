import axios from "axios";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOMEPOD_BASE_URL,
});

export const storipodAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_STORIPOD_BASE_URL,
});


axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

storipodAxiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    if (typeof error.response === "undefined") {
      showToast({
        title: "Error",
        message: 'kindly check your network connection',
        toastType: "error",
        duration: 3000
    });
    } else {
      showToast({
        title: "Error",
        message: error.response.data.message,
        toastType: "error",
        duration: 3000
    });
    }
  }
);

storipodAxiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    if (typeof error.response === "undefined") {
      showToast({
        title: "Error",
        message: 'kindly check your network connection',
        toastType: "error",
        duration: 3000
    });
    } else {
      showToast({
        title: "Error",
        message: error.response.data.message,
        toastType: "error",
        duration: 3000
    });
    }
  }
);