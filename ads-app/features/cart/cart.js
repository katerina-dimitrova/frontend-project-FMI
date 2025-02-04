import { createAdHtml } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function removeFromCart(adId) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex((user) => user.email === userEmail);

  if (userIndex !== -1) {
    users[userIndex].cartAds = users[userIndex].cartAds.filter(
      (id) => id !== adId
    );
    localStorage.setItem("users", JSON.stringify(users));
  }
  renderAds();
}

function addToFavourites(adId) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex((user) => user.email === userEmail);

  if (userIndex !== -1) {
    if (!users[userIndex].favouriteAds.includes(adId)) {
      users[userIndex].favouriteAds.push(adId);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
  renderAds();
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
    }
  });
}

renderAds();
