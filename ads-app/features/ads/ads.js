import { createAdHtml } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function renderAds() {
  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads"));

  adsContainer.innerHTML = "";

  ads.forEach((adData) => {
    const adElement = createAdHtml(adData, "Add to cart", "Favorites");
    adsContainer.appendChild(adElement);

    const cartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    cartButton.addEventListener("click", function () {
      addToCart(adData);
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData);
    });
  });
}

renderAds();
