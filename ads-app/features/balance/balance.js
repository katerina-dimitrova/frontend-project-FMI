document.addEventListener("DOMContentLoaded", function () {
  const balanceAmount = document.getElementById("balance-amount");
  const amountInput = document.getElementById("amount");
  const depositButton = document.getElementById("deposit-button");
  const withdrawButton = document.getElementById("withdraw-button");

  function updateUI() {
    balanceAmount.textContent = getBalance();
  }

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

  updateUI();
});

export function getBalance() {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.email === userEmail);

  return user ? user.balance || 0 : 0;
}

export function updateBalance(amount) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex((user) => user.email === userEmail);

  if (userIndex !== -1) {
    users[userIndex].balance = (users[userIndex].balance || 0) + amount;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export function addTransaction(type, amount, details) {
  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex((user) => user.email === userEmail);

  if (userIndex !== -1) {
    const newTransaction = {
      type,
      amount,
      details,
      date: new Date().toLocaleString(),
    };

    users[userIndex].transactions.push(newTransaction);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
