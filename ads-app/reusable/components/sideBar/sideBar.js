document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");

    if (sidebarContainer) {
        fetch("../../reusable/components/sideBar/sideBar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Sidebar not found!");
                }
                return response.text();
            })
            .then(data => {
                sidebarContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading sidebar:", error));
    }
});
