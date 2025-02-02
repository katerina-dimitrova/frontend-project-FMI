export function createAdHtml(data) {
    const adCard = document.createElement("div");
    adCard.className = "ad-card";

    adCard.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="ad-image">
        <h3 class="ad-title">${data.title}</h3>
        <p class="ad-description">${data.description}</p>
        <p class="ad-price">${data.price} лв.</p>
    `;

    return adCard;
}
