const isAuthenticated =
  JSON.parse(localStorage.getItem("isAuthenticated")) || false;

if (!isAuthenticated) {
  window.location.href = "../auth/login.html";
}
