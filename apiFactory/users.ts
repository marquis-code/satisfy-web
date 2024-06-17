import { axiosInstance, storipodAxiosInstance } from "./axios.config";

export const userApiFactory = {
  getUsersList(metadata: { page: number; perPage: number }) {
    return axiosInstance.get(
      `/user/all?page=${metadata.page}&perPage=${metadata.perPage}`
    );
  },
  getUserById(id: string) {
    return axiosInstance.get(`/user/${id}`);
  },
  getActiveUsers() {
    return axiosInstance.get("/user/active-users-summary");
  },
  getSignupSummary() {
    return axiosInstance.get("/user/signup-summary");
  },
  getTopUsers() {
    return axiosInstance.get("/user/top-users");
  },
  getUserProfile() {
    return axiosInstance.get("/user/profile");
  },
  getUserFollowers(userId: string) {
    return axiosInstance.get(`/user/${userId}/followers`);
  },
  getUserFollowing(userId: string) {
    return axiosInstance.get(`/user/${userId}/following`);
  },
  getUserFollowersCount(userId: string) {
    return axiosInstance.get(`/users/${userId}/followers/count`);
  },
  getUserFollowingCount(userId: string) {
    return axiosInstance.get(`/users/${userId}/followings/count`);
  },
  getUserSummary(userId: string) {
    return axiosInstance.get(`/user/${userId}/summary`);
  },
  deactivateUser(userId: string, payload: any) {
    return axiosInstance.post(`/user/${userId}/status`, payload);
  },
  removeUser(id: string | number) {
    const url = `/users/${id}`;
    return axiosInstance.delete(url);
  },
  editUser(id: string | number, payload: any) {
    const url = `/users/${id}/edit`;
    return axiosInstance.patch(url, payload);
  },
  createUser(payload: any) {
    return axiosInstance.post("/user/create-user", payload);
  },
  getUserInterests(metadata: { page: number; perPage: number }) {
    return storipodAxiosInstance.get(`/categories/all?page=${metadata.page}&perPage=${metadata.perPage}`);
  },
  getUserInterestsBySearch(metadata: { page: number; perPage: number, search: string }) {
    return storipodAxiosInstance.get(`/categories?page=${metadata.page}&perPage=${metadata.perPage}&search=${metadata.search}`);
  },
};
