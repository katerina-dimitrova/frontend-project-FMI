import { createAd } from "../../reusable/components/ad/ad.js";

function renderAds() {
    const adsContainer = document.getElementById("ads-container");
    const ads = JSON.parse(localStorage.getItem("ads"));
  
    adsContainer.innerHTML = "";
  
    ads.forEach(adData => {
        const adElement = createAd(adData);
        adsContainer.appendChild(adElement);
    });
  }
  
  renderAds();
