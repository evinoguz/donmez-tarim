import { products } from "./db.js";

const productList = document.getElementById("product-list");
const productListAll = document.getElementById("product-list-all");
const productDetailContainer = document.getElementById("product-detail");

function renderProducts(container, products) {
  if (!container) {
    return;
  }
  container.classList.add("product-list");
  container.className = "product-list";
  container.innerHTML = "";

  products.forEach((product) => {
    if (!container) return;
    const col = document.createElement("div");
    col.className = "col-12";
    col.innerHTML = `
      <div class="product-card">
        ${
          product.isNew
            ? `<div class="product-badge badge-new">${product.badge}</div>` // "Yeni" rozetini ekle
            : `<img src="${product.badge}" alt="${product.badge}" class="badge-best rounded-5" />` // "En Çok Satan" rozetini ekle
        }
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" class="img-fluid" />
        </div>
        <div class="product-card-data fw-bold">${product.name}</div>
        <div class="product-card-data text-success fw-semibold">${product.price}</div>
        <div class="d-flex gap-3 mt-4 justify-content-center">
          <a href="urun-detay.html?id=${
            product.id
          }" class="btn btn-dark d-inline-flex align-items-center justify-content-center fs-6 btn-stylish">
            <i class="bi bi-search me-2 fs-5"></i>İncele
          </a>
          <a href="iletisim.html" class="btn btn-outline-success d-inline-flex align-items-center justify-content-center fs-6 btn-stylish">
            <i class="bi bi-cart me-2 fs-5"></i>Satın Al
          </a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}
// Home page first 4 product list
const displayedProducts = products?.slice(0, 4);
function renderProductList() {
  if (productList) {
    renderProducts(productList, displayedProducts);
  }
}
document.addEventListener("DOMContentLoaded", renderProductList);

// Product All Page list all products
function renderProductListAll() {
  if (productListAll) {
    renderProducts(productListAll, products);
  }
}
document.addEventListener("DOMContentLoaded", renderProductListAll);

// Detail - Info
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

// Find product detail
const product = products.find((p) => p.id === productId);

// Randomly select 4 recommended products
const randomSuggestions = products
  .filter((p) => p.id !== productId)
  .sort(() => 0.5 - Math.random())
  .slice(0, 4);

// Render product details and recommendations
function renderProductDetail() {
  if (!product) {
    return;
  }

  // Ürün Detayı
  productDetailContainer.innerHTML = `
        <p>
          <a href="urunler.html" class="text-dark text-decoration-none"><i class="bi bi-basket-fill"></i> Ürünler</a>
          <i class="bi bi-chevron-right mx-3 text-danger"></i>${product.category}
          <i class="bi bi-chevron-right mx-3 text-danger"></i> ${product.name}
        </p>
          <div class="row g-4">
            <!-- Sol Kısım: Ürün Detayları -->
            <div class="col-lg-8">
              <div class="p-3 rounded bg-white">
                <div class="row align-items-center">
                  <div class="col-md-6 text-center mb-4 mb-md-0 product-card-detail">
                    <img
                      src="${product.image}"
                      alt="${product.name}"
                      class="img-fluid rounded"
                      style="max-height: 400px"
                    />
                  </div>
                  <div class="col-md-6">
                    ${product.isNew ? `<span class="badge bg-warning text-dark mb-2">${product.badge}</span>` : ""}
                    <h2 class="fw-bold">${product.name}</h2>
                    <p class="lead text-muted">${product.description}</p>
                    <div class="fs-4 text-success fw-semibold">${product.price}</div>
                    <div>
                      <a
                        href="iletisim.html"
                        class="btn btn-outline-success d-inline-flex align-items-center justify-content-center fs-6 my-5"
                      >
                        <i class="bi bi-cart-fill me-2 fs-5"></i>Satın Al
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sağ Kısım: Önerilen Ürünler -->
            <div class="col-lg-4">
              <div class="p-3">
                <h5 class="fw-bold mb-3">Sizin İçin Önerilenler</h5>
                ${randomSuggestions
                  .map(
                    (s) => `
                <div class="card mb-3 px-3 py-2 border-0 shadow-sm">
                  <div class="row g-2 align-items-center">
                    <div class="col-4">
                      <img src="${s.image}" alt="${s.name}" class="img-fluid px-2 rounded suggestion-image" />
                    </div>
                    <div class="col-8 d-flex flex-column justify-content-between">
                      <div>
                        <div class="fw-bold fs-5">${s.name}</div>
                        <div class="small text-muted">${s.category}</div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-2">
                        <div class="text-success fw-semibold">${s.price}</div>
                        <a
                          href="urun-detay.html?id=${s.id}"
                          class="btn btn-outline-dark d-inline-flex align-items-center justify-content-center fs-6 btn-stylish"
                        >
                          <i class="bi bi-search me-2 fs-5"></i>İncele
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                `
                  )
                  .join("")}
              </div>
            </div>
        </div>  
  `;
}
document.addEventListener("DOMContentLoaded", renderProductDetail);
