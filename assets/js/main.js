'use strict';

// Element toggle helper
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// -------------------------------------------------------------
// Project Case Study Modal Functionality
// -------------------------------------------------------------
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectModalTarget = document.querySelector("[data-project-modal-target]");
const projectCards = document.querySelectorAll("[data-project-card]");

const openProjectModal = function (cardKey) {
  if (!projectModalContainer || !projectModalTarget) return;
  const payload = document.getElementById(`payload-${cardKey}`);
  if (payload) {
    projectModalTarget.innerHTML = payload.innerHTML;
    projectModalContainer.style.display = "flex";
    setTimeout(() => {
      projectModalContainer.classList.add("active");
      if (projectOverlay) projectOverlay.classList.add("active");
    }, 10);
  }
};

const closeProjectModal = function () {
  if (!projectModalContainer) return;
  projectModalContainer.classList.remove("active");
  if (projectOverlay) projectOverlay.classList.remove("active");
  setTimeout(() => {
    projectModalContainer.style.display = "none";
    if (projectModalTarget) projectModalTarget.innerHTML = "";
  }, 250);
};

projectCards.forEach(card => {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    const cardKey = this.getAttribute("data-project-card");
    openProjectModal(cardKey);
  });
});

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", closeProjectModal);
if (projectOverlay) projectOverlay.addEventListener("click", closeProjectModal);

// -------------------------------------------------------------
// Blog Article Modal Functionality
// -------------------------------------------------------------
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogModalTarget = document.querySelector("[data-blog-modal-target]");
const blogCards = document.querySelectorAll("[data-blog-card]");

const openBlogModal = function (cardKey) {
  if (!blogModalContainer || !blogModalTarget) return;
  const payload = document.getElementById(`payload-${cardKey}`);
  if (payload) {
    blogModalTarget.innerHTML = payload.innerHTML;
    blogModalContainer.style.display = "flex";
    setTimeout(() => {
      blogModalContainer.classList.add("active");
      if (blogOverlay) blogOverlay.classList.add("active");
    }, 10);
  }
};

const closeBlogModal = function () {
  if (!blogModalContainer) return;
  blogModalContainer.classList.remove("active");
  if (blogOverlay) blogOverlay.classList.remove("active");
  setTimeout(() => {
    blogModalContainer.style.display = "none";
    if (blogModalTarget) blogModalTarget.innerHTML = "";
  }, 250);
};

blogCards.forEach(card => {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    const cardKey = this.getAttribute("data-blog-card");
    openBlogModal(cardKey);
  });
});

if (blogModalCloseBtn) blogModalCloseBtn.addEventListener("click", closeBlogModal);
if (blogOverlay) blogOverlay.addEventListener("click", closeBlogModal);

// Global Escape Key listener for all modals
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
    closeBlogModal();
  }
});

// -------------------------------------------------------------
// Portfolio Filter & Select Functionality
// -------------------------------------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category ? filterItems[i].dataset.category.toLowerCase().trim() : "";
    if (selectedValue === "all" || selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// -------------------------------------------------------------
// Contact Form Validation
// -------------------------------------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

// -------------------------------------------------------------
// Navigation Functionality
// -------------------------------------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.innerText.trim().toLowerCase();

    pages.forEach(page => {
      const pageName = (page.dataset.page || "").toLowerCase().trim();
      // Handle mapping between 'projects' and 'portfolio' if needed
      const matches = (pageName === targetPage) || (targetPage === "projects" && pageName === "projects");
      
      if (matches) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(nav => {
      if (nav === this) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});