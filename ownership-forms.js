(() => {
  const items = {
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
  };
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
      maximumFractionDigits: 0,
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
      error(input, message);
      if (message) valid = false;
    });
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
      <div class="review-group"><h3>Your Information</h3><dl>
        <div class="review-row"><dt>Full Name</dt><dd>${escape(v.name)}</dd></div>
        <div class="review-row"><dt>Email</dt><dd>${escape(v.email)}</dd></div>
        <div class="review-row"><dt>Phone</dt><dd>${escape(v.phone || "Not provided")}</dd></div>
      </dl></div>
      <div class="review-group"><h3>Your Offer</h3><dl>
        <div class="review-row"><dt>Offer Amount</dt><dd>${escape(money(v.amount))}</dd></div>
        <div class="review-row"><dt>Expiration</dt><dd>${escape(date(v.expiration))}</dd></div>
        <div class="review-row"><dt>Message</dt><dd>${escape(v.message || "No message provided")}</dd></div>
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
