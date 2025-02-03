import { createAdHtml } from "../../reusable/components/ad/ad.js";
import { createAd } from "../../reusable/utils/helpers.js";
import { CATEGORIES } from "../../reusable/utils/constants.js";

const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-button");
  const addContainer = document.getElementById("add-container");
  const addForm = document.getElementById("add-form");
  const categorySelect = document.getElementById("ad-category");
  const overlay = document.getElementById("overlay");
  const cancelButton = document.getElementById("cancel-button");
  const submitButton = document.getElementById("submit-button");
  const editButton = document.getElementById("edit-button");

  Object.values(CATEGORIES).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  renderAds();

  addButton.addEventListener("click", function () {
    addContainer.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("modal-active");
  });

  cancelButton.addEventListener("click", function () {
    addContainer.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("modal-active");
  });

  function getFormData() {
    return {
      title: document.getElementById("ad-title").value,
      description: document.getElementById("ad-description").value,
      price: document.getElementById("ad-price").value,
      category: categorySelect.value,
      image: document.getElementById("ad-image").value || "../../assets/images/default_ad_image.jpg",
    };
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token.isAuthenticated) {
      alert("You need to be logged in to post an ad.");
      return;
    }

    const userEmail = token.userEmail;
    const formData = getFormData();


    try {
      const newAd = createAd(
        userEmail,
        formData.title,
        formData.description,
        formData.price,
        formData.category,
        formData.image
      );

      const ads = JSON.parse(localStorage.getItem("ads")) || [];
      ads.push(newAd);
      localStorage.setItem("ads", JSON.stringify(ads));

      renderAds();

      addContainer.style.display = "none";
      addButton.style.display = "block";
      overlay.style.display = "none";
      document.body.classList.remove("modal-active");

      addForm.reset();
    } catch (error) {
      alert(error.message);
    }
  });

  function deleteAd(adId) {
    const ads = JSON.parse(localStorage.getItem("ads")) || [];
    const adIndex = ads.findIndex((ad) => ad.id === adId);

    if (adIndex === -1) {
      alert("Ad not found");
      return;
    }

    ads[adIndex].isDeleted = true;
    localStorage.setItem("ads", JSON.stringify(ads));

    renderAds();
  }

  function editAd(adData) {
    addContainer.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("modal-active");

    document.getElementById("ad-title").value = adData.title;
    document.getElementById("ad-description").value = adData.description;
    document.getElementById("ad-price").value = adData.price;
    document.getElementById("ad-category").value = adData.category;
    document.getElementById("ad-image").value = adData.image;

    submitButton.style.display = "none";
    editButton.style.display = "block";

    editButton.onclick = null;

    editButton.onclick = function (event) {
        event.preventDefault();

        let ads = JSON.parse(localStorage.getItem("ads")) || [];
        const adIndex = ads.findIndex((ad) => ad.id === adData.id);

        if (adIndex === -1) {
            alert("Ad not found");
            return;
        }

        const formData = getFormData();

        ads[adIndex] = {
            ...ads[adIndex],
            title: formData.title,
            description: formData.description,
            price: formData.price,
            category: formData.category,
            image: formData.image,
        };

        localStorage.setItem("ads", JSON.stringify(ads));

        renderAds();

        addButton.style.display = "block";
        editButton.style.display = "none";

        addContainer.style.display = "none";
        overlay.style.display = "none";
        document.body.classList.remove("modal-active");

        addForm.reset();
    };
  }

  function renderAds() {
    const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
    const adsContainer = document.getElementById("ads-container");
    const ads = JSON.parse(localStorage.getItem("ads")) || [];

    adsContainer.innerHTML = "";

    const userAds = ads.filter(
      (ad) => ad.userEmail === userEmail && !ad.isDeleted
    );

    if (userAds.length === 0) {
      adsContainer.innerHTML = "<p>You have no added ads.</p>";
    }

    userAds.forEach((adData) => {
      const adElement = createAdHtml(adData, "Edit", "Delete");
      adsContainer.appendChild(adElement);

      const editButton = adElement.querySelector(".left-btn");
      const deleteButton = adElement.querySelector(".right-btn");

      editButton.addEventListener("click", function () {
        editAd(adData);
      });

      deleteButton.addEventListener("click", function () {
        deleteAd(adData.id);
      });
    });
  }
});
