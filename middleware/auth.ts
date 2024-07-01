export default defineNuxtRouteMiddleware((to, from) => {
  console.log("Navigating from:", from);
  const userStore = useUserStore();

  if (!userStore.isLogged) {
    console.log("User not logged in, redirecting to login.");
    return navigateTo(`/login?redirect=${to.path}`);
  } 
  // else {
  //   const redirectPath = (to.query.redirect || "/dashboard").toString();
  //   console.log("User logged in, redirecting to:", redirectPath);
  //   return navigateTo(redirectPath);
  // }
});