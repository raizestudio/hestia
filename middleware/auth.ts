export default defineNuxtRouteMiddleware((to, from) => {
  // const token = localStorage.getItem("token");
  const userStore = useUserStore();

  if (!userStore.isLogged) {
    return navigateTo("/login");
  }
});
