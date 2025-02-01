import { initializeSystem } from "../../reusable/utils/repository.js";
import { createUser } from "../../reusable/utils/helpers.js";

initializeSystem();


let isSignUpMode = false;

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const mainActionBtn = document.getElementById("mainActionBtn");
const toggleText = document.getElementById("toggleText");
const toggleLink = document.getElementById("toggleLink");
const errorMessage = document.getElementById("errorMessage");
const appTitle = document.getElementById("appTitle");

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

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (isSignUpMode) {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      showError("This email is already registered!");
      return;
    }

    const newUser = createUser(email, password);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      showError("Invalid email or password!");
      return;
    }
  }

  localStorage.setItem("token", JSON.stringify({userEmail: email, isAuthenticated: true}));
  window.location.href = "../../features/home/home.html";
}

function updateFormText() {
  if (isSignUpMode) {
    appTitle.textContent = "Sign up to Ads App";
    mainActionBtn.textContent = "Sign up";
    toggleText.innerHTML = `You already have an account? 
      <a href="#" id="toggleLink">Sign in</a>`;
  } else {
    appTitle.textContent = "Sign in to Ads App";
    mainActionBtn.textContent = "Sign in";
    toggleText.innerHTML = `You don't have an account?
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
