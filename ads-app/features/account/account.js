const token = JSON.parse(localStorage.getItem("token")) || {
    isAuthenticated: false,
  };
  
  if (!token.isAuthenticated) {
    window.location.href = "../auth/login.html";
  }

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("profile-form");

    const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.email === userEmail);

    document.getElementById("email").value = currentUser.email;
    document.getElementById("name").value = currentUser.name || "";
    document.getElementById("phone").value = currentUser.phone || "";
    document.getElementById("preferences").value = currentUser.preferences || "";

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const newName = document.getElementById("name").value;
        const newPhone = document.getElementById("phone").value;
        const newPreferences = document.getElementById("preferences").value;

        currentUser.name = newName;
        currentUser.phone = newPhone;
        currentUser.preferences = newPreferences;

        localStorage.setItem("users", JSON.stringify(users));

        alert("Profile updated successfully!");
    });
});
