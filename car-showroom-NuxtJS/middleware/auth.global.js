export default defineNuxtRouteMiddleware((to, from) => {
  const userAuthenticated = useLocalStorage("userValid", false).value;

  if (!userAuthenticated && to.path === "/") {
    return navigateTo("/login");
  } else if (userAuthenticated && to.path === "/login") {
    return navigateTo("/");
  } else if (to.name === "details-carID" && !userAuthenticated) {
    return navigateTo("/login");
  } else if (to.name === "login" && userAuthenticated) {
    return navigateTo("/");
  } else if (to.name === "register" && userAuthenticated) {
    return navigateTo("/");
  }
  return;
});
