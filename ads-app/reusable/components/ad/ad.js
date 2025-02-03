export function createAdHtml(data, leftButtonText, rightButtonText) {
  const adCard = document.createElement("div");
  adCard.className = "ad-card";

  adCard.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="ad-image">
        <h3 class="ad-title">${data.title}</h3>
        <p class="ad-description">${data.description}</p>
        <p class="ad-price">${data.price} лв.</p>
        <div class="ad-buttons">
        <button class="left-btn">${leftButtonText}</button>
        <button class="right-btn">${rightButtonText}</button>
        </div>
    `;

  return adCard;
}
