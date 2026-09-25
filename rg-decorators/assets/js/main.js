/**
 * RG DECORATORS - Interactive Application Script
 * High-End Interior Designing & Decoration Studio
 */

// Global Business Configuration
const DEFAULT_CONFIG = {
  businessName: "RG Decorators",
  phone: "+91 87696 37882",
  phoneRaw: "+918769637882",
  whatsappNumber: "918769637882",
  defaultWhatsappMsg: "Hello RG Decorators, I am interested in your interior design services. I would like to discuss my project.",
  instagramUrl: "https://www.instagram.com", // [PASTE INSTAGRAM LINK HERE]
  email: "contact@rgdecorators.com", // [PASTE BUSINESS EMAIL HERE]
  mapsUrl: "https://maps.google.com/?q=Aligarh+Mathura+Road+Dolta+Mata+Mandir+Opposite+Rathi+Motor", // [PASTE GOOGLE MAPS LINK HERE]
  address: "Aligarh–Mathura Road, Near Dolta Mata Mandir, Opposite Rathi Motor, Aligarh, Uttar Pradesh"
};

// Load saved config from localStorage if available
let SITE_CONFIG = { ...DEFAULT_CONFIG };
try {
  const saved = localStorage.getItem("rg_decorators_config");
  if (saved) {
    SITE_CONFIG = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  }
} catch (e) {
  console.warn("Could not read from localStorage", e);
}

// Function to update dynamic elements across the site
function applySiteConfig() {
  // Update Phone links
  document.querySelectorAll("[data-config-phone]").forEach(el => {
    el.textContent = SITE_CONFIG.phone;
    if (el.tagName === 'A') {
      el.href = `tel:${SITE_CONFIG.phoneRaw.replace(/[^0-9+]/g, '')}`;
    }
  });

  // Update WhatsApp links
  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.defaultWhatsappMsg)}`;
  document.querySelectorAll("[data-config-whatsapp]").forEach(el => {
    if (el.tagName === 'A') {
      el.href = waUrl;
    }
  });

  // Update Instagram links
  document.querySelectorAll("[data-config-instagram]").forEach(el => {
    if (el.tagName === 'A') {
      el.href = SITE_CONFIG.instagramUrl;
    }
    if (el.hasAttribute("data-show-handle")) {
      el.textContent = SITE_CONFIG.instagramUrl.replace("https://www.instagram.com/", "@").replace("https://instagram.com/", "@");
    }
  });

  // Update Email links
  document.querySelectorAll("[data-config-email]").forEach(el => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === 'A') {
      el.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Interior Design Enquiry - RG Decorators")}`;
    }
  });

  // Update Maps links
  document.querySelectorAll("[data-config-maps]").forEach(el => {
    if (el.tagName === 'A') {
      el.href = SITE_CONFIG.mapsUrl;
    }
  });

  // Update Address texts
  document.querySelectorAll("[data-config-address]").forEach(el => {
    el.textContent = SITE_CONFIG.address;
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();
  initHeader();
  initMobileMenu();
  initGallery();
  initConsultationForm();
  initLightbox();
  initCustomizerModal();
});

// 1. Header scroll effect
function initHeader() {
  const header = document.querySelector(".main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 2. Mobile Menu Drawer
function initMobileMenu() {
  const hamburger = document.getElementById("hamburgerBtn");
  const closeBtn = document.getElementById("mobileCloseBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!hamburger || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// 3. Filterable Gallery
function initGallery() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      galleryItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter || category.includes(filter)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.96)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

// 4. Lightbox Modal
let currentLightboxImage = null;
function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const modalTitle = document.getElementById("lightboxTitle");
  const modalCategory = document.getElementById("lightboxCategory");
  const modalWaBtn = document.getElementById("lightboxWaBtn");
  const closeBtn = document.getElementById("lightboxCloseBtn");

  if (!modal || !modalImg) return;

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-item-title")?.textContent || "Interior Project";
      const cat = item.querySelector(".gallery-item-category")?.textContent || "RG Decorators Project";

      modalImg.src = img.src;
      modalImg.alt = title;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = cat;

      if (modalWaBtn) {
        const msg = `Hello RG Decorators, I saw your project "${title}" (${cat}) on your website and would like to get a similar design consultation.`;
        modalWaBtn.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// 5. Consultation & Booking Form
function initConsultationForm() {
  const form = document.getElementById("consultationForm");
  const successModal = document.getElementById("consultationSuccessModal");
  const waDirectBtn = document.getElementById("formWaDirectBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const phone = document.getElementById("formPhone").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const city = document.getElementById("formCity").value.trim() || "Aligarh";
    const propertyType = document.getElementById("formProperty").value;
    const service = document.getElementById("formService").value;
    const budget = document.getElementById("formBudget").value;
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !phone) {
      alert("Please provide at least your Name and Phone Number.");
      return;
    }

    // Format WhatsApp message payload
    const textMsg = 
      `*New Interior Design Consultation Request*\n\n` +
      `👤 *Client Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email || 'Not specified'}\n` +
      `📍 *City:* ${city}\n` +
      `🏠 *Property Type:* ${propertyType}\n` +
      `🎨 *Service Required:* ${service}\n` +
      `💰 *Approx. Budget:* ${budget}\n` +
      `📝 *Message/Notes:* ${message || 'No additional note'}\n\n` +
      `_Sent via RG Decorators Website Form_`;

    const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(textMsg)}`;

    // Set link for immediate WhatsApp action in success modal
    const successWaBtn = document.getElementById("successWaActionBtn");
    if (successWaBtn) {
      successWaBtn.href = waLink;
    }

    // Show custom success modal
    if (successModal) {
      successModal.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      // Direct redirect to WhatsApp if modal element absent
      window.open(waLink, "_blank");
    }

    form.reset();
  });

  // Alternative Quick WhatsApp Button inside the form
  if (waDirectBtn) {
    waDirectBtn.addEventListener("click", () => {
      const name = document.getElementById("formName")?.value.trim() || "Prospective Client";
      const service = document.getElementById("formService")?.value || "Interior Design Consultation";
      const quickMsg = `Hello RG Decorators, my name is ${name}. I am looking for ${service} in Aligarh/nearby area. Let's discuss my project.`;
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(quickMsg)}`, "_blank");
    });
  }

  // Close success modal handler
  const closeSuccess = document.getElementById("closeSuccessModalBtn");
  if (closeSuccess && successModal) {
    closeSuccess.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
}

// 6. User Customizer Settings Modal (For Business Owner to update Links easily)
function initCustomizerModal() {
  const modal = document.getElementById("configModal");
  const openBtns = document.querySelectorAll(".open-config-btn");
  const closeBtn = document.getElementById("closeConfigBtn");
  const saveBtn = document.getElementById("saveConfigBtn");
  const resetBtn = document.getElementById("resetConfigBtn");

  const inputPhone = document.getElementById("cfgPhone");
  const inputWa = document.getElementById("cfgWhatsapp");
  const inputEmail = document.getElementById("cfgEmail");
  const inputInstagram = document.getElementById("cfgInstagram");
  const inputMaps = document.getElementById("cfgMaps");
  const inputAddress = document.getElementById("cfgAddress");

  if (!modal) return;

  function populateInputs() {
    if (inputPhone) inputPhone.value = SITE_CONFIG.phone;
    if (inputWa) inputWa.value = SITE_CONFIG.whatsappNumber;
    if (inputEmail) inputEmail.value = SITE_CONFIG.email;
    if (inputInstagram) inputInstagram.value = SITE_CONFIG.instagramUrl;
    if (inputMaps) inputMaps.value = SITE_CONFIG.mapsUrl;
    if (inputAddress) inputAddress.value = SITE_CONFIG.address;
  }

  function openConfig() {
    populateInputs();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeConfig() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openConfig();
  }));

  if (closeBtn) closeBtn.addEventListener("click", closeConfig);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeConfig();
  });

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (inputPhone) SITE_CONFIG.phone = inputPhone.value.trim();
      if (inputWa) SITE_CONFIG.whatsappNumber = inputWa.value.trim().replace(/[^0-9]/g, '');
      if (inputEmail) SITE_CONFIG.email = inputEmail.value.trim();
      if (inputInstagram) SITE_CONFIG.instagramUrl = inputInstagram.value.trim();
      if (inputMaps) SITE_CONFIG.mapsUrl = inputMaps.value.trim();
      if (inputAddress) SITE_CONFIG.address = inputAddress.value.trim();

      try {
        localStorage.setItem("rg_decorators_config", JSON.stringify(SITE_CONFIG));
      } catch (e) {
        console.error("Storage error", e);
      }

      applySiteConfig();
      closeConfig();
      alert("✅ Business details updated successfully on your website!");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset links and contact info to default template values?")) {
        SITE_CONFIG = { ...DEFAULT_CONFIG };
        localStorage.removeItem("rg_decorators_config");
        applySiteConfig();
        populateInputs();
        closeConfig();
        alert("Restored to defaults.");
      }
    });
  }
}
