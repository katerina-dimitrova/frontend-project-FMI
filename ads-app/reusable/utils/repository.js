import { createUser, createAd } from "./helpers.js";

const defaultAds = [
  createAd("Example add 1", "Description", "50"),
  createAd("Example add 2", "Description", "100"),
  createAd("Example add 3", "Description.", "150"),
  createAd("Example add 4", "Description", "150"),
  createAd("Example add 5", "Description", "150"),
  createAd("Example add 6", "Description", "150"),
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
