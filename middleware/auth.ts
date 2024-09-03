import { useLogin } from "@/composables/auth/login";
const { isLoggedIn } = useLogin();
export default defineNuxtRouteMiddleware((to, from) => {
  if (!isLoggedIn.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
