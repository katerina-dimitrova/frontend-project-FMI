import { createAd } from "../../reusable/components/ad/ad.js";

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
    const adElement = createAd(adData);
    adsContainer.appendChild(adElement);
  });
}

renderAds();
