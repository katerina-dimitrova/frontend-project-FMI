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

const users = [
  {
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    email: "ads@gmail.com",
    password: "ads",
  },
];

export function initializeSystem() {
  const storedUsers = localStorage.getItem("users");
  const storedAds = localStorage.getItem("ads");

  if (!storedUsers) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (!storedAds) {
    localStorage.setItem("ads", JSON.stringify(defaultAds));
  }
}
