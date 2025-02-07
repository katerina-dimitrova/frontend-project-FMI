const token = JSON.parse(localStorage.getItem("token")) || {
  isAuthenticated: false,
};

if (!token.isAuthenticated) {
  window.location.href = "../auth/login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("transaction-table-body");

  const userEmail = JSON.parse(localStorage.getItem("token")).userEmail;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === userEmail);

  if (!currentUser || !currentUser.transactions) {
    tableBody.innerHTML = "<tr><td colspan='4'>No transactions found</td></tr>";
    return;
  }

  const sortedTransactions = currentUser.transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sortedTransactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${transaction.date}</td>
          <td>${
            transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
          }</td>
          <td>${transaction.amount.toFixed(2)}</td>
          <td>${transaction.details}</td>
      `;
    tableBody.appendChild(row);
  });
});
