const token = JSON.parse(localStorage.getItem("token")) || {
    isAuthenticated: false,
  };
  
  if (!token.isAuthenticated) {
    window.location.href = "../auth/login.html";
  }

if (document.getElementById("balance-amount")) {
  document.addEventListener("DOMContentLoaded", function () {
    const balanceAmount = document.getElementById("balance-amount");
    const amountInput = document.getElementById("amount");
    const depositButton = document.getElementById("deposit-button");
    const withdrawButton = document.getElementById("withdraw-button");

    depositButton.addEventListener("click", function () {
      let amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount!");
        return;
      }

      updateBalance(amount);
      addTransaction("deposit", amount, "Added money to balance");
      updateUI();
      amountInput.value = "";
    });

    withdrawButton.addEventListener("click", function () {
      let amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount!");
        return;
      }

      if (getBalance() < amount) {
        alert("Insufficient funds!");
        return;
      }

      updateBalance(-amount);
      addTransaction("withdraw", -amount, "Withdrawn money from balance");
      updateUI();
      amountInput.value = "";
    });

    function updateUI() {
      let currentBalance = getBalance();
      balanceAmount.textContent = currentBalance;
    }

    updateUI();
  });
}

export function getBalance() {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.email === userEmail);

  return user ? user.balance || 0 : 0;
}

export function updateBalance(amount, userEmail = null) {
  if (!userEmail) {
    userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const getUser = users.find((user) => user.email === userEmail);

  if (getUser) {
    getUser.balance = (getUser.balance || 0) + amount;

    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.error(`User not found: ${userEmail}`);
  }
}

export function addTransaction(type, amount, details, adId, userEmail = null) {
  if (!userEmail) {
    userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const getUser = users.find((user) => user.email === userEmail);

  if (getUser) {
    const newTransaction = {
      type,
      amount,
      details,
      adId,
      date: new Date().toLocaleString(),
    };

    getUser.transactions.push(newTransaction);

    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.error(`User not found: ${userEmail}`);
  }
}
