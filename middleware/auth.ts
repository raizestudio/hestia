export default defineNuxtRouteMiddleware((to, from) => {
  console.log(from);
  // const token = localStorage.getItem("token");
  const userStore = useUserStore();

  if (!userStore.isLogged) {
    return navigateTo(`/login?redirect=${to.path}`);
  } else {
    return navigateTo("/");
  }
});
