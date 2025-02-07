import { createAdHtml } from "../../reusable/components/ad/ad.js";
import {
  removeFromCart,
  addToFavourites,
  removeFromFavourites,
} from "../../reusable/utils/helpers.js";

import {
  getBalance,
  updateBalance,
  addTransaction,
} from "../balance/balance.js";

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
    (ad) => currentUser.cartAds.includes(ad.id) && !ad.isDeleted && !ad.isSold
  );

  if (!filteredAds.length) {
    adsContainer.innerHTML = "<h2>No ads in cart</h2>";
  }

  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Remove", "Favourites");
    adsContainer.appendChild(adElement);

    const removeFromCartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    removeFromCartButton.addEventListener("click", function () {
      removeFromCart(adData.id);
      renderAds();
      updateTotalPrice();
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData.id);
      renderAds();
    });

    if (currentUser.favouriteAds.includes(adData.id)) {
      favouritesButton.innerText = "In favourites";
      favouritesButton.addEventListener("click", function () {
        removeFromFavourites(adData.id);
        renderAds();
      });
    }
  });
  updateTotalPrice();
}
renderAds();

document.addEventListener("DOMContentLoaded", function () {
  const checkoutButton = document.getElementById("checkout-button");

  checkoutButton.addEventListener("click", function () {
    updateTotalPrice();
    checkoutCart();
  });
});

function getCartItems() {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let ads = JSON.parse(localStorage.getItem("ads")) || [];
  let currentUser = users.find((user) => user.email === userEmail);

  return ads.filter((ad) => currentUser.cartAds.includes(ad.id)) || [];
}

function updateTotalPrice() {
  const totalPrice = getTotalPrice();
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function checkoutCart() {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find((user) => user.email === userEmail);

  if (currentUser.cartAds.length === 0) {
    alert("Cart is empty.");
    return;
  }

  const totalPrice = getTotalPrice();
  if (getBalance() < totalPrice) {
    alert("Insufficient balance!");
    return;
  }

  const cartItems = getCartItems();
  cartItems.forEach((ad) => {
    let seller = users.find((u) => u.email === ad.userEmail);
    if (seller) {
      updateBalance(Number(ad.price), seller.email);
      addTransaction(
        "received",
        Number(ad.price),
        `Sold: ${ad.title}`,
        ad.id,
        seller.email
      );
    } else {
      console.error(`Seller not found for ad: ${ad.title}`);
    }

    addTransaction(
      "spent",
      -Number(ad.price),
      `Purchased: ${ad.title}`,
      ad.id,
      userEmail
    );
  });

  updateBalance(-Number(totalPrice), userEmail);
  dealWithCartAds(userEmail, cartItems);

  alert("Purchase successful!");
  window.location.reload();
}

function getTotalPrice() {
  let cartItems = getCartItems();
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }

  return cartItems.reduce((sum, ad) => sum + (Number(ad.price) || 0), 0);
}

function dealWithCartAds(userEmail, cartItems) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === userEmail);
  const ads = JSON.parse(localStorage.getItem("ads")) || [];

  ads.forEach((ad) => {
    if (cartItems.some((cartAd) => cartAd.id === ad.id)) {
      ad.isSold = true;
    }
  });
  currentUser.cartAds = [];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("ads", JSON.stringify(ads));
}
