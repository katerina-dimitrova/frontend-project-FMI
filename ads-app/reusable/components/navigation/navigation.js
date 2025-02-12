document.addEventListener("DOMContentLoaded", () => {
  fetch("../../reusable/components/navigation/navigation.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.querySelector(".nav-links");

      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
});
