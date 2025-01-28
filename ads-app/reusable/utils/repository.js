const defaultAds = [
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 1",
    description: "Description",
    price: "50",
  },
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 2",
    description: "Description",
    price: "100",
  },
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 3",
    description: "Description.",
    price: "150",
  },
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 4",
    description: "Description",
    price: "150",
  },
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 5",
    description: "Description",
    price: "150",
  },
  {
    image: "../../assets/images/default_ad_image.jpg",
    title: "Example add 6",
    description: "Description",
    price: "150",
  },
];

export function initializeAds() {
  const storedAds = localStorage.getItem("ads");

  if (!storedAds) {
    localStorage.setItem("ads", JSON.stringify(defaultAds));
    console.log("Ads are saved in localStorage.");
  } else {
    console.log("Ads are already saved in localStorage.");
  }
}

initializeAds();
