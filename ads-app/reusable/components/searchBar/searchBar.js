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
          ad.title.toLowerCase().includes(query) ||
          ad.description.toLowerCase().includes(query)
      : null;

    updateFilter(newFilterFunction);
  });
}
