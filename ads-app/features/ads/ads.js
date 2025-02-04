import { createAdHtml } from "../../reusable/components/ad/ad.js";
import {
  addToFavourites,
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
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === userEmail);
  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads")) || [];

  adsContainer.innerHTML = "";

  const filteredAds = ads.filter((ad) => !ad.isDeleted);

  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Add to cart", "Favourites");
    adsContainer.appendChild(adElement);

    const cartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    cartButton.addEventListener("click", function () {
      addToCart(adData.id);
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData.id);
    });

    if (currentUser.cartAds.includes(adData.id)) {
      cartButton.innerText = "In the cart";
      cartButton.addEventListener("click", function () {
        removeFromCart(adData.id);
      });
    }

    if (currentUser.favouriteAds.includes(adData.id)) {
      favouritesButton.innerText = "In favourites";
      favouritesButton.addEventListener("click", function () {
        removeFromFavourites(adData.id);
      });
    }
  });
}

renderAds();
