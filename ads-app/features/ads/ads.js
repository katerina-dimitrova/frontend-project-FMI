import { createAd } from "../../reusable/components/ad/ad.js";

const isAuthenticated =
  JSON.parse(localStorage.getItem("isAuthenticated")) || false;

if (!isAuthenticated) {
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
