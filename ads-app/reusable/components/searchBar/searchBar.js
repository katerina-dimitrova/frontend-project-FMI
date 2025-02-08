import { CATEGORIES } from "../../utils/constants.js";

const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;

export function setupSearchBar(updateFilter) {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (!searchInput || !searchButton) {
    console.error("Search input or button not found");
    return;
  }

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase().trim();

    const newFilterFunction = query
      ? (ad) =>
          ad.userEmail !== userEmail &&
          (ad.title.toLowerCase().includes(query) ||
          ad.description.toLowerCase().includes(query))
      : null;

    updateFilter(newFilterFunction);
  });
}

export function setupCategoryFilter(updateFilter) {
  const categoriesContainer = document.getElementById("categories-container");

  if (!categoriesContainer) {
    console.error("Categories container not found");
    return;
  }

  categoriesContainer.innerHTML = "";

  Object.entries(CATEGORIES).forEach(([key, category]) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
    categoryItem.dataset.category = category;

    const icon = document.createElement("img");
    icon.src = `../../assets/images/${key.toLowerCase()}.png`;
    icon.alt = category;
    icon.classList.add("category-icon");

    const name = document.createElement("span");
    name.textContent = category;
    name.classList.add("category-name");

    categoryItem.appendChild(icon);
    categoryItem.appendChild(name);

    categoryItem.addEventListener("click", () => {
      updateFilter((ad) => ad.category === category && ad.userEmail !== userEmail);
    });

    categoriesContainer.appendChild(categoryItem);
  });
}

export function setupPriceFilter(updateSorting) {
  const priceFilter = document.getElementById("price-filter");

  if (!priceFilter) {
    console.error("Price filter not found");
    return;
  }

  priceFilter.addEventListener("change", function () {
    const sortOrder = priceFilter.value;

    updateSorting(sortOrder);
  });
}
