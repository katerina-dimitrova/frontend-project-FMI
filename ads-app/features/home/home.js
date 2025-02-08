import { CATEGORIES } from "../../reusable/utils/constants.js";
import { createAdHtml } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories-container");
  const adsContainer = document.getElementById("ads-container");

  if (!categoriesContainer) {
    console.error("Categories container not found!");
    return;
  }

  categoriesContainer.innerHTML = "";

  Object.entries(CATEGORIES).forEach(([key, category]) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
    categoryItem.dataset.category = category;

    const icon = document.createElement("img");
    icon.src = `../../assets/images/${key.toLowerCase()}.png`;
    icon.alt = category;
    icon.classList.add("category-icon");

    const name = document.createElement("span");
    name.textContent = category;
    name.classList.add("category-name");

    categoryItem.appendChild(icon);
    categoryItem.appendChild(name);

    categoryItem.addEventListener("click", () => {
      window.location.href = `/ads-app/features/ads/ads.html?category=${encodeURIComponent(
        category
      )}`;
    });

    categoriesContainer.appendChild(categoryItem);
  });

  const ads = JSON.parse(localStorage.getItem("ads")) || [];
  const latestAds = ads.slice(-5).reverse();

  if (latestAds.length === 0) {
    adsContainer.innerHTML = "<p>No ads available</p>";
  } else {
    latestAds.forEach((ad) => {
      const adElement = createAdHtml(ad, " ", " ");
      adsContainer.appendChild(adElement);
    });
  }
});
