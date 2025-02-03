import { CATEGORIES } from "./constants.js";

function getNextAdId() {
  const metaInfo = JSON.parse(localStorage.getItem("metaInfo"));
  const adsCount = metaInfo.adsCount + 1;
  const adId = adsCount + 1000;
  metaInfo.adsCount = adsCount;
  localStorage.setItem("metaInfo", JSON.stringify(metaInfo));
  return adId;
}

function getNextUserId() {
  const metaInfo = JSON.parse(localStorage.getItem("metaInfo"));
  const usersCount = metaInfo.usersCount + 1;
  const userId = usersCount + 100;
  metaInfo.usersCount = usersCount;
  localStorage.setItem("metaInfo", JSON.stringify(metaInfo));
  return userId;
}

export function createUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const id = getNextUserId();

  const newUser = {
    id,
    email,
    password,
  };

  return newUser;
}

export function createAd(
  userEmail,
  title,
  description,
  price,
  category,
  image = "../../assets/images/default_ad_image.jpg"
) {
  if (!title || !description || !price || !image || !category) {
    throw new Error(
      "Title, description, price, category and image are required"
    );
  }

  if (!Object.values(CATEGORIES).includes(category)) {
    throw new Error(
      `Invalid category: ${category}. Allowed categories: ${Object.values(
        CATEGORIES
      ).join(", ")}`
    );
  }

  const newAd = {
    id: getNextAdId(),
    userEmail,
    title,
    description,
    price,
    category,
    image,
    isDeleted: false,
  };

  return newAd;
}
