document.addEventListener("DOMContentLoaded", () => {
  const shopProductList = document.getElementById("shopProductList");
  const checkoutForm = document.getElementById("checkoutForm");

  let products = JSON.parse(localStorage.getItem("products")) || [];

  function renderProducts() {
    shopProductList.innerHTML = "";
    products.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rp ${p.price.toLocaleString()}</p>
        <button class="btn primary" onclick="selectProduct(${i})">Beli</button>
      `;
      shopProductList.appendChild(card);
    });
  }

  window.selectProduct = (index) => {
    localStorage.setItem("selectedProduct", JSON.stringify(products[index]));
    alert(`Produk ${products[index].name} dipilih. Silakan isi form pembelian.`);
  };

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const buyerName = document.getElementById("buyerName").value;
    const buyerWA = document.getElementById("buyerWA").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!selectedProduct) {
      alert("Silakan pilih produk terlebih dahulu!");
      return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
      product: selectedProduct.name,
      price: selectedProduct.price,
      buyer: buyerName,
      whatsapp: buyerWA,
      method: paymentMethod,
      status: "Pending"
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Pesanan berhasil dibuat! Admin akan memproses transaksi Anda.");
    checkoutForm.reset();
  });

  renderProducts();
});
