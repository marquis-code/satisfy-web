import { axiosInstance } from "./axios.config";

export const userApiFactory = {
  getUsersList() {
    return axiosInstance.get("/user/all");
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
    return axiosInstance.get(`/user/${userId}/follower/count`);
  },
  getUserFollowingCount(userId: string) {
    return axiosInstance.get(`/user/${userId}/following/count`);
  },
  getUserSummary(userId: string) {
    return axiosInstance.get(`/user/${userId}/summary`);
  },
  deactivateUser(userId: string, payload: any) {
    return axiosInstance.post(`/user/${userId}/status`, payload);
  }
};
