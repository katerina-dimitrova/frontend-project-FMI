import { createUser, createAd } from "./helpers.js";
import { CATEGORIES } from "./constants.js";

const defaultAds = [
  createAd("ads@gmail.com", "Example add 1", "Description", "50", CATEGORIES.ELECTRONICS),
  createAd("ads@gmail.com", "Example add 2", "Description", "100", CATEGORIES.VEHICLES),
  createAd("ads@gmail.com", "Example add 3", "Description.", "150", CATEGORIES.REAL_ESTATE),
  createAd("ads@gmail.com", "Example add 4", "Description", "150", CATEGORIES.FASHION),
  createAd("ads@gmail.com", "Example add 5", "Description", "150", CATEGORIES.HOME_APPLIANCES),
  createAd("ads@gmail.com", "Example add 6", "Description", "150", CATEGORIES.SPORTS),
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
