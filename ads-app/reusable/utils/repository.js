import { createUser } from "./helpers.js";

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
  createUser("admin@gmail.com", "admin"),
  createUser("ads@gmail.com", "ads"),
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
