document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");

  if (sidebarContainer) {
    fetch("../../reusable/components/sideBar/sideBar.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sidebar not found!");
        }
        return response.text();
      })
      .then((data) => {
        sidebarContainer.innerHTML = data;

        const logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
          localStorage.removeItem("token");
          window.location.href = "../../features/auth/login.html";
        });
      })
      .catch((error) => console.error("Error loading sidebar:", error));
  }
});
