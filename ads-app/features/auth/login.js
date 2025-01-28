import { initializeAds } from '../../reusable/utils/repository.js';

initializeAds();

let isSignUpMode = true;

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const mainActionBtn = document.getElementById("mainActionBtn");
const toggleText = document.getElementById("toggleText");
const toggleLink = document.getElementById("toggleLink");
const errorMessage = document.getElementById("errorMessage");

updateFormText();

mainActionBtn.addEventListener("click", handleMainAction);

toggleLink.addEventListener("click", function (event) {
  event.preventDefault();
  isSignUpMode = !isSignUpMode;
  updateFormText();
  clearError();
});

function handleMainAction() {
  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError("Please, fill in Email and Password!");
    return;
  }

  if (!validateEmail(email)) {
    showError("Please, enter a valid email!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("adsAppUsers")) || [];

  if (isSignUpMode) {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      showError("This email is already registered!");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("adsAppUsers", JSON.stringify(users));

    window.location.href = "../home-page.html";
  } else {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      showError("Invalid input data!");
      return;
    }

    window.location.href = "../home-page.html";
  }
}

function updateFormText() {
  if (isSignUpMode) {
    mainActionBtn.textContent = "Sign up";
    toggleText.innerHTML = `You don't have an account? 
      <a href="#" id="toggleLink">Sign in</a>`;
  } else {
    mainActionBtn.textContent = "Sign in";
    toggleText.innerHTML = `You already have an account?
      <a href="#" id="toggleLink">Sign up</a>`;
  }

  const newToggleLink = document.getElementById("toggleLink");
  newToggleLink.addEventListener("click", function (event) {
    event.preventDefault();
    isSignUpMode = !isSignUpMode;
    updateFormText();
    clearError();
  });
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
