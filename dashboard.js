document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");
  const productList = document.getElementById("productList");
  const transactionList = document.getElementById("transactionList");
  const preview = document.getElementById("preview");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Preview Gambar
  document.getElementById("productImage").addEventListener("change", function(){
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => preview.src = e.target.result;
      reader.readAsDataURL(file);
    }
  });

  // Tambah Produk
  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = parseInt(document.getElementById("productPrice").value);
    const image = preview.src || "";

    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    addProductForm.reset();
    preview.src = "";
  });

  // Render Produk
  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rp ${p.price.toLocaleString()}</p>
        <button class="btn danger" onclick="deleteProduct(${i})">Hapus</button>
      `;
      productList.appendChild(card);
    });
  }

  window.deleteProduct = (index) => {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  };

  // Render Transaksi
  function renderTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach((t, i) => {
      const card = document.createElement("div");
      card.className = "transaction-card";
      card.innerHTML = `
        <h3>${t.product} - Rp ${t.price.toLocaleString()}</h3>
        <p>Pembeli: ${t.buyer}</p>
        <p>WhatsApp: ${t.whatsapp}</p>
        <p>Metode: ${t.method}</p>
        <p>Status: <strong>${t.status}</strong></p>
        <button class="btn primary" onclick="markDone(${i})">Tandai Done</button>
        <button class="btn danger" onclick="cancelTransaction(${i})">Batalkan</button>
      `;
      transactionList.appendChild(card);
    });
  }

  window.markDone = (i) => {
    transactions[i].status = "Selesai";
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
  };

  window.cancelTransaction = (i) => {
    transactions[i].status = "Dibatalkan";
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
  };

  renderProducts();
  renderTransactions();
});
