import { createAdHtml } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function addToFavourites(adId) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex(user => user.email === userEmail);

  if (userIndex !== -1) {
    if (!users[userIndex].favouriteAds.includes(adId)) {
      users[userIndex].favouriteAds.push(adId);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

function addToCart(adId) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex(user => user.email === userEmail);

  if (userIndex !== -1) {
    if (!users[userIndex].cartAds.includes(adId)) {
      users[userIndex].cartAds.push(adId);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

function renderAds() {

  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads"));

  adsContainer.innerHTML = "";

  const filteredAds = ads.filter((ad) => !ad.isDeleted);


  filteredAds.forEach((adData) => {
    const adElement = createAdHtml(adData, "Add to cart", "Favourites");
    adsContainer.appendChild(adElement);

    const cartButton = adElement.querySelector(".left-btn");
    const favouritesButton = adElement.querySelector(".right-btn");

    cartButton.addEventListener("click", function () {
      addToCart(adData.id);
      cartButton.innerText = "In the cart";
    });

    favouritesButton.addEventListener("click", function () {
      addToFavourites(adData.id);
      favouritesButton.innerText = "In favourites";
    });
  });
}

renderAds();
