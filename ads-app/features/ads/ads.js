import { createAdHtml } from "../../reusable/components/ad/ad.js";
import {
  addToFavourites,
  removeFromFavourites,
  addToCart,
  removeFromCart,
} from "../../reusable/utils/helpers.js";

import {
  setupSearchBar,
  setupCategoryFilter,
  setupPriceFilter,
} from "../../reusable/components/searchBar/searchBar.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

let filterFunction = null;
let sortOrder = "default";

document.addEventListener("DOMContentLoaded", function () {
  const searchBarContainer = document.getElementById("search-bar-container");

  if (searchBarContainer) {
    fetch("../../reusable/components/searchBar/searchBar.html")
      .then((response) => response.text())
      .then((html) => {
        searchBarContainer.innerHTML = html;
        setupSearchBar(updateFilter);
        setupCategoryFilter(updateFilter);
        setupPriceFilter(updateSorting);

        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategory = urlParams.get("category");

        if (selectedCategory) {
          updateFilter((ad) => ad.category === selectedCategory);
          window.history.replaceState(
            {},
            document.title,
            "/ads-app/features/ads/ads.html"
          );
        }
      })
      .catch((error) => console.error("Error loading search bar:", error));
  } else {
    console.error("search-bar-container not found");
  }

  renderAds();
});

function updateFilter(newFilterFunction) {
  filterFunction = newFilterFunction;
  renderAds();
}

function updateSorting(newSortOrder) {
  sortOrder = newSortOrder;
  renderAds();
}

function renderAds() {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === userEmail);
  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads")) || [];

  adsContainer.innerHTML = "";

  const filteredAds = filterFunction
    ? ads.filter(filterFunction)
    : ads.filter((ad) => !ad.isDeleted && !ad.isSold && ad.userEmail !== userEmail);

  if (sortOrder === "ascending") {
    filteredAds.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "descending") {
    filteredAds.sort((a, b) => b.price - a.price);
  }

  if (!filteredAds.length) {
    adsContainer.innerHTML = "<h2>No ads available</h2>";
  }

  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Add to cart", "Favourites");
    adsContainer.appendChild(adElement);

    const cartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    cartButton.addEventListener("click", function () {
      addToCart(adData.id);
      renderAds();
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData.id);
      renderAds();
    });

    if (currentUser.cartAds.includes(adData.id)) {
      cartButton.innerText = "In the cart";
      cartButton.addEventListener("click", function () {
        removeFromCart(adData.id);
        renderAds();
      });
    }

    if (currentUser.favouriteAds.includes(adData.id)) {
      favouritesButton.innerText = "In favourites";
      favouritesButton.addEventListener("click", function () {
        removeFromFavourites(adData.id);
        renderAds();
      });
    }
  });
}

renderAds();
