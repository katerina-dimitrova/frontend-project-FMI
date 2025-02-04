import { createAdHtml } from "../../reusable/components/ad/ad.js";
import {
  removeFromCart,
  addToFavourites,
  removeFromFavourites,
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
    (ad) => currentUser.cartAds.includes(ad.id) && !ad.isDeleted
  );

  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Remove", "Favourites");
    adsContainer.appendChild(adElement);

    const removeFromCartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    removeFromCartButton.addEventListener("click", function () {
      removeFromCart(adData.id);
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData.id);
    });

    if (currentUser.favouriteAds.includes(adData.id)) {
      favouritesButton.innerText = "In favourites";
      favouritesButton.addEventListener("click", function () {
        removeFromFavourites(adData.id);
      });
    }
  });
}

renderAds();
