export default defineNuxtRouteMiddleware((to, from) => {
  console.log("Navigating from:", from);
  const userStore = useUserStore();

  if (!userStore.isLogged) {
    console.log("User not logged in, redirecting to login.");
    return navigateTo(`/login?redirect=${to.path}`);
  }
});