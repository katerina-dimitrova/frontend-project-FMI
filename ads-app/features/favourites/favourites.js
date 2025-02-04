import { createAdHtml } from "../../reusable/components/ad/ad.js";
import {
  removeFromFavourites,
  addToCart,
  removeFromCart,
} from "../../reusable/utils/helpers.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function renderAds() {
  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  const currentUser = users.find((user) => user.email === userEmail);

  adsContainer.innerHTML = "";

  const filteredAds = ads.filter(
    (ad) => currentUser.favouriteAds.includes(ad.id) && !ad.isDeleted
  );

  if (!filteredAds.length) {
    adsContainer.innerHTML = "<h2>No ads in favourites</h2>";
  }

  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Add to cart", "Dislike");
    adsContainer.appendChild(adElement);

    const cartButton = adElement.querySelector(".left-btn");
    const dislikeButton = adElement.querySelector(".right-btn");

    cartButton.addEventListener("click", function () {
      addToCart(adData.id);
      renderAds();
    });

    dislikeButton.addEventListener("click", function () {
      removeFromFavourites(adData.id);
      renderAds();
    });

    if (currentUser.cartAds.includes(adData.id)) {
      cartButton.innerText = "In the cart";
      cartButton.addEventListener("click", function () {
        removeFromCart(adData.id);
        renderAds();
      });
    }
  });
}

renderAds();
