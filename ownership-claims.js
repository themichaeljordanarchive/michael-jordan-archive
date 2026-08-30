(() => {
  const legacyItems = {
    "8687-home-a": {
      title: "1986–87 Chicago Bulls Home Jersey",
      reference: "Jersey A",
      usage: "Regular / Postseason",
      image: "images/1986-87-home-fb.jpg",
      alt: "1986–87 Chicago Bulls home jersey",
      category: "jersey",
      returnUrl: "jerseys-1986-87.html",
    },
    "8687-away-b": {
      title: "1986–87 Chicago Bulls Away Jersey",
      reference: "Jersey B",
      usage: "Regular / Postseason",
      image: "images/1986-87-away.jpg",
      alt: "1986–87 Chicago Bulls away jersey",
      category: "jersey",
      returnUrl: "jerseys-1986-87.html",
    },
    "aj2-pair-a": {
      title: "1987 Air Jordan II — White | Black",
      reference: "Pair A",
      usage: "Regular Season",
      image: "images/sneakers/aj2/aj2-a-low-8687-1.jpg",
      alt: "1987 Air Jordan II White and Black — Pair A",
      category: "sneaker",
      returnUrl: "sneakers-aj2.html",
    },
    "aj2-pair-b": {
      title: "1987 Air Jordan II — White | Red",
      reference: "Pair B",
      usage: "Unknown",
      image: "images/sneakers/aj2/aj2-b-8687-1.jpg",
      alt: "1987 Air Jordan II White and Red — Pair B",
      category: "sneaker",
      returnUrl: "sneakers-aj2.html",
    },
    "aj2-pair-d": {
      title: "1987 Air Jordan II — White | Black | Red",
      reference: "Pair D",
      usage: "Regular Season",
      image: "images/sneakers/aj2/aj2-d-wlaces-ha-1.jpg",
      alt: "1987 Air Jordan II White, Black and Red — Pair D",
      category: "sneaker",
      returnUrl: "sneakers-aj2.html",
    },
    "aj3-pair-a": {
      title: "1987 Air Jordan III — White | Cement Grey",
      reference: "Pair A",
      usage: "Regular Season",
      image: "images/sneakers/aj3/aj3-a-bbm-8788-1.jpg",
      alt: "1987 Air Jordan III White and Cement Grey — Pair A",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-b": {
      title: "1987 Air Jordan III — White | Cement Grey",
      reference: "Pair B",
      usage: "Regular Season",
      image: "images/sneakers/aj3/aj3-b-bbm-8788-1.jpg",
      alt: "1987 Air Jordan III White and Cement Grey — Pair B",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-c": {
      title: "1988 Air Jordan III — White | Fire Red",
      reference: "Pair C",
      usage: "Unknown",
      image: "images/sneakers/aj3/aj3-c-fr-8889.jpg",
      alt: "1988 Air Jordan III White and Fire Red — Pair C",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-d": {
      title: "1987 Air Jordan III — White | Cement Grey",
      reference: "Pair D",
      usage: "Regular Season",
      image: "images/sneakers/aj3/aj3-d-wc-8788-1.jpg",
      alt: "1987 Air Jordan III White and Cement Grey — Pair D",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-e": {
      title: "1988 Air Jordan III — White | Fire Red",
      reference: "Pair E",
      usage: "Unknown",
      image: "images/sneakers/aj3/aj3-e-FR-8788-1.jpg",
      alt: "1988 Air Jordan III White and Fire Red — Pair E",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-f": {
      title: "1988 Air Jordan III — White | Cement Grey | True Blue",
      reference: "Pair F",
      usage: "Promotional",
      image: "images/sneakers/aj3/aj3-f-tb-8788-2.jpg",
      alt: "1988 Air Jordan III True Blue — Pair F",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-g": {
      title: "1988 Air Jordan III Promo Sample — White | Fire Red",
      reference: "Pair G",
      usage: "Unknown",
      image: "images/sneakers/aj3/aj3-g-fr-promo-8889-1.jpg",
      alt: "1988 Air Jordan III Promo Sample — Pair G",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-h": {
      title: "1988 Air Jordan III — White | Cement Grey",
      reference: "Pair H",
      usage: "Regular Season",
      image: "images/sneakers/aj3/aj3-h-3-10-88-wc-1.jpg",
      alt: "1988 Air Jordan III White and Cement Grey — Pair H",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
    "aj3-pair-j": {
      title: "1987 Air Jordan III — White | Cement Grey",
      reference: "Pair J",
      usage: "Unknown",
      image: "images/sneakers/aj3/aj3-j-classic-wc-1.jpg",
      alt: "1987 Air Jordan III White and Cement Grey — Pair J",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
  };

  const items = window.MJA_OWNERSHIP_ITEMS || legacyItems;
  const form = document.querySelector("#claim-form");
  if (!form) return;

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      navToggle.setAttribute(
        "aria-expanded",
        String(document.body.classList.contains("nav-open")),
      );
    });
  }

  const params = new URLSearchParams(location.search);
  const itemId = items[params.get("item")] ? params.get("item") : "8687-home-a";
  const item = items[itemId];
  let currentStep = 1;
  const get = (id) => document.querySelector(`#${id}`);

  const indexLink = document.querySelector(
    '.site-nav a[href="jerseys.html"], .site-nav a[href="sneakers.html"]',
  );
  if (indexLink) {
    const isSneaker = item.category === "sneaker";
    indexLink.href = isSneaker ? "sneakers.html" : "jerseys.html";
    indexLink.textContent = isSneaker ? "Sneaker Index" : "Jersey Index";
  }

  get("item-id").value = itemId;
  get("artifact-title").textContent = item.title;
  get("artifact-reference").textContent = item.reference;
  get("artifact-usage").textContent = item.usage;
  get("item-title-field").value = item.title;
  get("item-reference-field").value = item.reference;
  get("item-usage-field").value = item.usage;
  const subjectField = document.querySelector('[name="_subject"]');
  if (subjectField)
    subjectField.value = `New MJA Ownership Claim — ${item.title} — ${item.reference}`;
  const backLink = document.querySelector("#artifact-back-link, .back-link");
  if (backLink) backLink.href = item.returnUrl;
  const returnLink = document.querySelector(
    "#confirmation-return-link, .confirmation .button",
  );
  if (returnLink) returnLink.href = item.returnUrl;
  get("artifact-image").src = item.image;
  get("artifact-image").alt = item.alt;

  const isSneaker = item.category === "sneaker";
  const sellerFeeRate =
    Number(item.sellerFeeRate ?? (isSneaker ? 0.06 : 0.025)) * 100;
  const sneakerMinimumField = get("sneaker-minimum-field");
  const sneakerMinimumInput = get("sneaker-minimum");
  if (sneakerMinimumField) sneakerMinimumField.hidden = !isSneaker;
  if (sneakerMinimumInput) {
    sneakerMinimumInput.disabled = !isSneaker;
    sneakerMinimumInput.required = isSneaker;
  }
  const sellerFeePolicy = get("seller-fee-policy");
  if (sellerFeePolicy)
    sellerFeePolicy.innerHTML = `<strong>Seller Service Fee.</strong> If a transaction is completed through the Archive, the seller service fee is ${sellerFeeRate}% of the accepted base purchase price. Taxes, shipping, insurance, escrow, authentication, and related transaction costs vary and are additional.`;

  const escape = (value) =>
    String(value).replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[char],
    );
  const values = () => ({
    name: get("name").value.trim(),
    email: get("email").value.trim(),
    phone: get("phone").value.trim(),
    source: get("acquisition-source").value,
    date: get("acquisition-date").value.trim(),
    history: get("ownership-history").value.trim(),
    documentation: get("documentation").value.trim(),
    notes: get("notes").value.trim(),
    sneakerMinimum: isSneaker
      ? sneakerMinimumInput.value.trim()
      : "Not applicable",
  });

  function setError(input, message) {
    const field = input.closest(".field");
    field?.classList.toggle("is-invalid", Boolean(message));
    if (field) field.querySelector(".field-error").textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateStep(step) {
    const required =
      step === 1
        ? [get("name"), get("email")]
        : [
            get("acquisition-source"),
            get("ownership-history"),
            get("documentation"),
          ];
    let valid = true;

    required.forEach((input) => {
      let message = "";
      if (!input.value.trim()) message = "This field is required.";
      else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value))
        message = "Enter a valid email address.";
      setError(input, message);
      if (message) valid = false;
    });
    if (step === 2 && isSneaker) {
      const message =
        Number(sneakerMinimumInput.value) > 0
          ? ""
          : "Enter the minimum offer you want displayed for this pair.";
      setError(sneakerMinimumInput, message);
      if (message) valid = false;
    }
    return valid;
  }

  function buildReview() {
    const v = values();
    get("review-content").innerHTML = `
      <div class="review-group"><h3>Artifact</h3><dl>
        <div class="review-row"><dt>Title</dt><dd>${escape(item.title)}</dd></div>
        <div class="review-row"><dt>Archive Reference</dt><dd>${escape(item.reference)}</dd></div>
        <div class="review-row"><dt>Usage</dt><dd>${escape(item.usage)}</dd></div>
      </dl></div>
      <div class="review-group"><h3>Claimant</h3><dl>
        <div class="review-row"><dt>Full Name</dt><dd>${escape(v.name)}</dd></div>
        <div class="review-row"><dt>Verified Email</dt><dd>${escape(v.email)}</dd></div>
        <div class="review-row"><dt>Phone</dt><dd>${escape(v.phone || "Not provided")}</dd></div>
      </dl></div>
      <div class="review-group"><h3>Ownership Details</h3><dl>
        <div class="review-row"><dt>Source</dt><dd>${escape(v.source)}</dd></div>
        <div class="review-row"><dt>Acquisition Date</dt><dd>${escape(v.date || "Not provided")}</dd></div>
        <div class="review-row"><dt>Acquisition History</dt><dd>${escape(v.history)}</dd></div>
        <div class="review-row"><dt>Documentation</dt><dd>${escape(v.documentation)}</dd></div>
        <div class="review-row"><dt>Additional Notes</dt><dd>${escape(v.notes || "None")}</dd></div>
        ${isSneaker ? `<div class="review-row"><dt>Requested Minimum Offer</dt><dd>${escape(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(v.sneakerMinimum)))}</dd></div>` : ""}
        <div class="review-row"><dt>Seller Service Fee</dt><dd>${sellerFeeRate}% of the accepted base purchase price</dd></div>
      </dl></div>`;
  }

  function showStep(step) {
    currentStep = step;
    document.querySelectorAll(".form-step").forEach((panel) => {
      const active = Number(panel.dataset.step) === step;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    document.querySelectorAll("[data-step-indicator]").forEach((indicator) => {
      const number = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle("is-active", number === step);
      indicator.classList.toggle("is-complete", number < step);
      if (number === step) indicator.setAttribute("aria-current", "step");
      else indicator.removeAttribute("aria-current");
    });
    get("form-alert").hidden = true;
    document
      .querySelector(".form-card")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea, select"))
      setError(event.target, "");
  });

  form.addEventListener("click", (event) => {
    const next = event.target.closest("[data-next]");
    const back = event.target.closest("[data-back]");
    if (next) {
      if (!validateStep(currentStep)) {
        get("form-alert").textContent =
          "Please complete the required fields before continuing.";
        get("form-alert").hidden = false;
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      if (currentStep === 2) buildReview();
      showStep(currentStep + 1);
    }
    if (back) showStep(currentStep - 1);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const certification = get("certification");
    const acknowledgment = get("verification-acknowledgment");
    if (!certification.checked || !acknowledgment.checked) {
      get("certification-error").textContent =
        "Both confirmations are required before submitting.";
      (!certification.checked ? certification : acknowledgment).focus();
      return;
    }

    get("certification-error").textContent = "";
    const submitButton = get("submit-claim");
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Submitting…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission was not accepted.");
      showStep(4);
      form.reset();
    } catch (submissionError) {
      get("form-alert").textContent =
        "Your claim could not be submitted. Please check your connection and try again.";
      get("form-alert").hidden = false;
      get("form-alert").scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
})();
