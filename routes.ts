export const routes = {
  public: [
    "/",
    "/new-verification",
    "/email",
  ],
  auth: [
    "/signin",
    "/signup",
    "/reset",
    "/new-password",
    "/error"
  ],
  apiAuthPrefix: "/api/auth",
  defaultLoginRedirect: "/settings",
  defaultLogoutRedirect: "/signin"
}