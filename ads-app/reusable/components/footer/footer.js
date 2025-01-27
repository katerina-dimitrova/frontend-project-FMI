document.addEventListener("DOMContentLoaded", () => {
  fetch("../../reusable/components/footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});
