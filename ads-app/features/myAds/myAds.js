import { createAdHtml } from "../../reusable/components/ad/ad.js";
import { createAd } from "../../reusable/utils/helpers.js";
import { CATEGORIES } from "../../reusable/utils/constants.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-button");
  const addContainer = document.getElementById("add-container");
  const addForm = document.getElementById("add-form");
  const categorySelect = document.getElementById("ad-category");
  const overlay = document.getElementById("overlay");
  const cancelButton = document.getElementById("cancel-button");

  Object.values(CATEGORIES).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  renderAds();

  addButton.addEventListener("click", function () {
    addContainer.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("modal-active");
});

cancelButton.addEventListener("click", function () {
    addContainer.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("modal-active");
});

  addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("ad-title").value;
    const description = document.getElementById("ad-description").value;
    const price = document.getElementById("ad-price").value;
    const category = categorySelect.value;
    const image = document.getElementById("ad-image").value || undefined;

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token.isAuthenticated) {
      alert("You need to be logged in to post an ad.");
      return;
    }

    const userEmail = token.userEmail;

    console.log(image);

    try {
      const newAd = createAd(
        userEmail,
        title,
        description,
        price,
        category,
        image
      );

      const ads = JSON.parse(localStorage.getItem("ads")) || [];
      ads.push(newAd);
      localStorage.setItem("ads", JSON.stringify(ads));

      renderAds();

      addContainer.style.display = "none";
      addButton.style.display = "block";
      overlay.style.display = "none";
      document.body.classList.remove("modal-active");

      addForm.reset();
    } catch (error) {
      alert(error.message);
    }
  });

  function renderAds() {
    const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
    const adsContainer = document.getElementById("ads-container");
    const ads = JSON.parse(localStorage.getItem("ads")) || [];

    adsContainer.innerHTML = "";

    const userAds = ads.filter((ad) => ad.userEmail === userEmail);

    if (userAds.length === 0) {
      adsContainer.innerHTML = "<p>You have no added ads.</p>";
    }

    userAds.forEach((adData) => {
      const adElement = createAdHtml(adData);
      adsContainer.appendChild(adElement);
    });
  }
});
