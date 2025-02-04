import { createAdHtml } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function removeFromFavourites(adId) {
    const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(user => user.email === userEmail);
  
    if (userIndex !== -1) {
      users[userIndex].favouriteAds = users[userIndex].favouriteAds.filter(id => id !== adId);
      localStorage.setItem("users", JSON.stringify(users));
    }
    renderAds();
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
    (ad) => currentUser.favouriteAds.includes(ad.id) && !ad.isDeleted
  );

    filteredAds.forEach((adData) => {
      const adElement = createAdHtml(adData, "Add to cart", "Dislike");
      adsContainer.appendChild(adElement);

      const cartButton = adElement.querySelector(".left-btn");
      const dislikeButton = adElement.querySelector(".right-btn");

      cartButton.addEventListener("click", function () {
        addToCart(adData.id);
      });

      dislikeButton.addEventListener("click", function () {
        removeFromFavourites(adData.id);
      });

      if (currentUser.cartAds.includes(adData.id)) {
        cartButton.innerText = "In the cart";
      }
    });
}

renderAds();