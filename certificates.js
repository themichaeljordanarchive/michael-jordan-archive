const certificates = {
  "MJA-8-2024-PM-001": {
    status: "Verified Archive Record",
    title: "1986-87 Michael Jordan Game Used Sneakers",
    issueDate: "August 2024",
    documentId: "MJA-8687-AJ2-SNEAKERS",
    image: "assets/certificates/MJA-8-2024-PM-001.jpg",
  },
  "MJA-5-2026-PM-002": {
    status: "Verified Archive Record",
    title: "1985–86 Chicago Bulls Michael Jordan Road Jersey",
    issueDate: "May 2026",
    documentId: "MJA-8586-ROAD-JERSEY",
    image: "assets/certificates/MJA-5-2026-PM-002.jpg",
  },
};

const form = document.getElementById("verifyForm");
const input = document.getElementById("certificateInput");
const result = document.getElementById("verifyResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const certNumber = input.value.trim().toUpperCase();
  const cert = certificates[certNumber];

  if (!cert) {
    result.innerHTML = `
      <div class="verify-message verify-error">
        <h2>Record Not Found</h2>
        <p>No archive record was found for certificate number <strong>${certNumber}</strong>.</p>
      </div>
    `;
    result.classList.add("is-visible");
    return;
  }

  result.innerHTML = `
    <div class="verify-message verify-success">
      <div class="verify-result-kicker">Certificate Verified</div>

      <h2>${cert.title}</h2>

      <div class="verify-details">
        <div>
          <span>Certificate Number</span>
          <strong>${certNumber}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>${cert.status}</strong>
        </div>

        <div>
          <span>Issue Date</span>
          <strong>${cert.issueDate}</strong>
        </div>

      <div>
          <span>Document ID</span>
          <strong>${cert.documentId}</strong>
        </div>
      </div>

      <div class="certificate-preview">
        <img src="${cert.image}" alt="Certificate ${certNumber}" />
      </div>
    </div>
  `;

  result.classList.add("is-visible");
});
