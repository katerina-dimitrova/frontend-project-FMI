import { createUser, createAd } from "./helpers.js";
import { CATEGORIES } from "./constants.js";

export function initializeMetaInfo() {
  const storedMetaInfo = localStorage.getItem("metaInfo");

  if (!storedMetaInfo) {
    const metaInfo = {
      usersCount: 0,
      adsCount: 0,
    };

    localStorage.setItem("metaInfo", JSON.stringify(metaInfo));
  }
}

export function updateUserAds(userEmail, adId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex(user => user.email === userEmail);

  if (userIndex !== -1) {
    users[userIndex].addedAds.push(adId);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export function initializeSystem() {
  const storedUsers = localStorage.getItem("users");
  const storedAds = localStorage.getItem("ads");

  if (!storedUsers) {
    const users = [
      createUser("admin@gmail.com", "admin"),
      createUser("ads@gmail.com", "ads"),
      createUser("test@gmail.com", "test"),
      createUser("new@gmail.com", "new"),
    ];

    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!storedAds) {
    const defaultAds = [
      createAd("admin@gmail.com", "Example add 1", "Description", "50", CATEGORIES.ELECTRONICS),
      createAd("ads@gmail.com", "Example add 2", "Description", "100", CATEGORIES.VEHICLES),
      createAd("ads@gmail.com", "Example add 3", "Description.", "150", CATEGORIES.FURNITURE),
      createAd("ads@gmail.com", "Example add 4", "Description", "150", CATEGORIES.FASHION),
      createAd("test@gmail.com", "Example add 5", "Description", "150", CATEGORIES.HOME_APPLIANCES),
      createAd("test@gmail.com", "Example add 6", "Description", "150", CATEGORIES.SPORTS),
      createAd("admin@gmail.com", "Example add 7", "Description", "150", CATEGORIES.OFFICE),
    ];

    localStorage.setItem("ads", JSON.stringify(defaultAds));
  }
}
