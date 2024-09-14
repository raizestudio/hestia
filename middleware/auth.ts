export default defineNuxtRouteMiddleware((to, from) => {
  console.log("Navigating from:", from);
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    console.log("User not logged in, redirecting to login.");
    return navigateTo(`/auth/login?redirect=${to.path}`);
  }
});