import { createAd } from "../../reusable/components/ad/ad.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

function renderAds() {
  const userEmail = (JSON.parse(localStorage.getItem("token"))).userEmail;
  const adsContainer = document.getElementById("ads-container");
  const ads = JSON.parse(localStorage.getItem("ads")) || [];

  adsContainer.innerHTML = "";

  const userAds = ads.filter((ad) => ad.userEmail === userEmail);

  if (userAds.length === 0) {
    adsContainer.innerHTML = "<p>You have no added ads.</p>";
  }  

  userAds.forEach((adData) => {
    const adElement = createAd(adData);
    adsContainer.appendChild(adElement);
  });
}

renderAds();
