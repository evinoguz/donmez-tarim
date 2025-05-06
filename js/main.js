import { menu, faqs } from "./db.js";

// Navbar menu
const navbarLinks = document.getElementById("navbar-links");
let currentPage = window.location.pathname.split("/").pop();
if (!currentPage) currentPage = "index.html";
navbarLinks.innerHTML =
  menu
    .map((item) => {
      const isActive = item.href === currentPage ? "active" : "";
      return `
      <li class="nav-item">
        <a href="${item.href}" class="nav-link ${isActive}">${item.name}</a>
      </li>
    `;
    })
    .join("") +
  `
    <li class="nav-item px-3">
      <a href="iletisim.html" class="btn btn-danger btn-lg d-inline-flex align-items-center fs-6 iconkeyframe">
        Bize ulaşın
        <i class="bi bi-envelope ms-2 fs-5"></i>
      </a>
    </li>
  `;

// S.S.S.
document.addEventListener("DOMContentLoaded", function () {
  const sssAccordion = document.getElementById("sssAccordion");
  if (!sssAccordion) return;
  faqs.forEach(({ id, question, answer }) => {
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item border-0 mb-3 shadow-sm rounded";

    accordionItem.innerHTML = `

    <div class="accordion-item border-0 mb-3 shadow-sm rounded">
      <h3 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">
          ${question}
        </button>
      </h3>
      <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#sssAccordion">
        <div class="accordion-body text-muted">
          ${answer}
        </div>
      </div>
     </div>
    `;

    sssAccordion.appendChild(accordionItem);
  });
});
