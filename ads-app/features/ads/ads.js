import { createAd } from "../../reusable/components/ad/ad.js";

document.addEventListener("DOMContentLoaded", () => {
    const adsContainer = document.getElementById("ads-container");

    const adsData = [
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 1",
            description: "Description",
            price: "50"
        },
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 2",
            description: "Description",
            price: "100"
        },
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 3",
            description: "Description.",
            price: "150"
        },
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 4",
            description: "Description",
            price: "150"
        },
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 5",
            description: "Description",
            price: "150"
        },
        {
            image: "../../assets/images/default_ad_image.jpg",
            title: "Example add 6",
            description: "Description",
            price: "150"
        }
    ];

    adsData.forEach(adData => {
        const adElement = createAd(adData);
        adsContainer.appendChild(adElement);
    });
});
