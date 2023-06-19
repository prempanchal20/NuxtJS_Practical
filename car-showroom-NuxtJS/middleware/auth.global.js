export default defineNuxtRouteMiddleware((to, from) => {
  const userAuthenticated = useLocalStorage("userValid", false).value;
  if (!userAuthenticated && to.path === "/") {
    return navigateTo("/login");
  } else if (
    userAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return navigateTo("/");
  } else if (to.name === "details-carID" && !userAuthenticated) {
    return navigateTo("/login");
  }
  return;
});
