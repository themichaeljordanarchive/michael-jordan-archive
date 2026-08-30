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
    "aj2-pair-c": {
      title: "1987 Air Jordan II — White | Red",
      reference: "Pair C",
      usage: "Unknown",
      image: "images/sneakers/aj2/aj2-c-scp-1.jpg",
      alt: "1987 Air Jordan II White and Red — Pair C",
      category: "sneaker",
      returnUrl: "sneakers-aj2.html",
    },
    "aj3-pair-i": {
      title: "1989 Air Jordan III — White | Cement Grey",
      reference: "Pair I",
      usage: "Regular Season",
      image: "images/sneakers/aj3/aj3-i-8889-wc-1.jpg",
      alt: "1989 Air Jordan III White and Cement Grey — Pair I",
      category: "sneaker",
      returnUrl: "sneakers-aj3.html",
    },
  };

  const items = window.MJA_OWNERSHIP_ITEMS || legacyItems;
  const form = document.querySelector("#offer-form");
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

  const indexLink = document.querySelector(
    '.site-nav a[href="jerseys.html"], .site-nav a[href="sneakers.html"]',
  );
  if (indexLink) {
    const isSneaker = item.category === "sneaker";
    indexLink.href = isSneaker ? "sneakers.html" : "jerseys.html";
    indexLink.textContent = isSneaker ? "Sneaker Index" : "Jersey Index";
  }

  document.querySelector("#item-id").value = itemId;
  document.querySelector("#artifact-title").textContent = item.title;
  document.querySelector("#artifact-reference").textContent = item.reference;
  document.querySelector("#artifact-usage").textContent = item.usage;
  document.querySelector("#item-title-field").value = item.title;
  document.querySelector("#item-reference-field").value = item.reference;
  document.querySelector("#item-usage-field").value = item.usage;
  const subjectField = document.querySelector('[name="_subject"]');
  if (subjectField)
    subjectField.value = `New MJA Private Offer — ${item.title} — ${item.reference}`;
  const backLink = document.querySelector("#artifact-back-link, .back-link");
  if (backLink) backLink.href = item.returnUrl;
  const returnLink = document.querySelector(
    "#confirmation-return-link, .confirmation .button",
  );
  if (returnLink) returnLink.href = item.returnUrl;
  const artifactImage = document.querySelector("#artifact-image");
  artifactImage.src = item.image;
  artifactImage.alt = item.alt;

  if (item.offerEnabled === false) {
    const formCard = document.querySelector(".form-card");
    formCard.innerHTML = `
      <section class="confirmation is-active" aria-labelledby="offers-unavailable-title">
        <div class="confirmation-mark" aria-hidden="true">—</div>
        <span class="section-kicker">Private Offers</span>
        <h2 id="offers-unavailable-title">Private offers are not currently being accepted.</h2>
        <p>This artifact may be verified without being open to private offers. Offer availability is determined independently by The Michael Jordan Archive.</p>
        <a class="button button-primary" href="${item.returnUrl}">Return to the Artifact Page</a>
      </section>`;
    return;
  }

  const minimumOffer = Number(item.minimumOffer || 0);
  const buyerFeeRate = Number(
    item.buyerFeeRate ?? (item.category === "jersey" ? 0.025 : 0.06),
  );
  const sellerFeeRate = Number(item.sellerFeeRate ?? buyerFeeRate);
  const amountInput = document.querySelector("#amount");
  const minimumNotice = document.querySelector("#minimum-offer-notice");
  if (minimumOffer > 0) {
    amountInput.min = String(minimumOffer);
    amountInput.placeholder = minimumOffer.toLocaleString("en-US");
    minimumNotice.hidden = false;
    minimumNotice.innerHTML =
      item.category === "jersey"
        ? `<strong>Jersey Offer Policy.</strong> All jersey offers are subject to a minimum consideration threshold based on the artifact’s current estimated market value. The minimum submission amount is ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(minimumOffer)}. Jerseys are not represented as being for sale. Offers that are not reasonably aligned with current market value may not be forwarded, acknowledged, or receive a response.`
        : `<strong>Minimum Offer: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(minimumOffer)}.</strong> This owner-established minimum does not represent the sneakers as being for sale and does not require the owner to respond, negotiate, or sell.`;
  }

  const get = (id) => document.querySelector(`#${id}`);
  const values = () => ({
    name: get("name").value.trim(),
    email: get("email").value.trim(),
    phone: get("phone").value.trim(),
    amount: get("amount").value.trim(),
    expiration: get("expiration").value,
    message: get("message").value.trim(),
  });
  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(value));
  const date = (value) =>
    value
      ? new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No expiration specified";
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

  function error(input, message) {
    const field = input.closest(".field");
    field?.classList.toggle("is-invalid", Boolean(message));
    if (field) field.querySelector(".field-error").textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateStep(step) {
    let valid = true;
    const required = step === 1 ? [get("name"), get("email")] : [get("amount")];
    required.forEach((input) => {
      let message = "";
      if (!input.value.trim()) message = "This field is required.";
      else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value))
        message = "Enter a valid email address.";
      else if (input.id === "amount" && Number(input.value) <= 0)
        message = "Enter an offer greater than zero.";
      else if (
        input.id === "amount" &&
        minimumOffer > 0 &&
        Number(input.value) < minimumOffer
      )
        message = `The minimum offer consideration is ${money(minimumOffer)}.`;
      error(input, message);
      if (message) valid = false;
    });
    return valid;
  }

  function buildReview() {
    const v = values();
    const baseOffer = Number(v.amount);
    const buyerFee = baseOffer * buyerFeeRate;
    const buyerTotal = baseOffer + buyerFee;
    get("buyer-fee-rate-field").value = `${buyerFeeRate * 100}%`;
    get("buyer-fee-field").value = money(buyerFee);
    get("buyer-total-field").value = money(buyerTotal);
    get("review-content").innerHTML = `
      <div class="review-group"><h3>Artifact</h3><dl>
        <div class="review-row"><dt>Title</dt><dd>${escape(item.title)}</dd></div>
        <div class="review-row"><dt>Archive Reference</dt><dd>${escape(item.reference)}</dd></div>
        <div class="review-row"><dt>Usage</dt><dd>${escape(item.usage)}</dd></div>
      </dl></div>
      <div class="review-group"><h3>Your Information</h3><dl>
        <div class="review-row"><dt>Full Name</dt><dd>${escape(v.name)}</dd></div>
        <div class="review-row"><dt>Email</dt><dd>${escape(v.email)}</dd></div>
        <div class="review-row"><dt>Phone</dt><dd>${escape(v.phone || "Not provided")}</dd></div>
      </dl></div>
      <div class="review-group"><h3>Your Offer</h3><dl>
        <div class="review-row"><dt>Base Offer</dt><dd>${escape(money(baseOffer))}</dd></div>
        <div class="review-row"><dt>Buyer Service Fee (${buyerFeeRate * 100}%)</dt><dd>${escape(money(buyerFee))}</dd></div>
        <div class="review-row"><dt>Total Buyer Commitment</dt><dd><strong>${escape(money(buyerTotal))}</strong></dd></div>
        <div class="review-row"><dt>Expiration</dt><dd>${escape(date(v.expiration))}</dd></div>
        <div class="review-row"><dt>Message</dt><dd>${escape(v.message || "No message provided")}</dd></div>
      </dl><p class="privacy-note">Taxes, shipping, insurance, escrow, authentication, and related transaction costs vary and are additional. The seller is charged a separate ${sellerFeeRate * 100}% service fee. Submission does not obligate the owner to respond, negotiate, or sell.</p></div>`;
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
    document.querySelector(`[data-step="${step}"] h2`)?.focus?.();
  }

  form.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea")) error(event.target, "");
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
    if (!validateStep(2)) {
      showStep(2);
      get("form-alert").textContent =
        minimumOffer > 0
          ? `This offer is below the ${money(minimumOffer)} minimum consideration threshold and was not submitted.`
          : "Please enter a valid offer amount.";
      get("form-alert").hidden = false;
      return;
    }
    const certification = get("certification");
    if (!certification.checked) {
      get("certification-error").textContent =
        "Please confirm before submitting.";
      certification.focus();
      return;
    }
    get("certification-error").textContent = "";

    const submitButton = get("submit-offer");
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Submitting…";
    get("form-alert").hidden = true;

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
        "Your offer could not be submitted. Please check your connection and try again.";
      get("form-alert").hidden = false;
      get("form-alert").scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
})();
