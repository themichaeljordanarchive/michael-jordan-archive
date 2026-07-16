const certificates = {
  "MJA-8-2024-C-001": {
    status: "Verified Archive Record",
    title: "1986-87 Michael Jordan Game Used Sneakers",
    issueDate: "August 2024",
    documentId: "MJA-8-2024-PM-001",
    image: "assets/certificates/MJA-8-2024-C-001.jpg",
  },
  "MJA-4-2026-C-002": {
    status: "Verified Archive Record",
    title: "1985–86 Chicago Bulls Michael Jordan Road Jersey",
    issueDate: "April 2026",
    documentId: "MJA-4-2026-PM-002",
    image: "assets/certificates/MJA-4-2026-C-002.jpg",
  },
  "MJA-6-2026-C-003": {
    status: "Verified Archive Record",
    title: "1995–96 Michael Jordan Game Used Sneakers",
    issueDate: "June 2026",
    documentId: "MJA-6-2026-PM-003",
    image: "assets/certificates/MJA-6-2026-C-003.jpg",
  },
  "MJA-9798-AJXIII-ECF-G2-C-001": {
    status: "Verified Archive Record",
    title: "1997–98 Michael Jordan Game Used Sneakers",
    issueDate: "July 2026",
    documentId: "MJA-9798-AJXIII-ECF-G2-C-001",
    image: "assets/certificates/MJA-9798-AJXIII-ECF-G2-C-001.jpg",
  },
  "MJA-1988-LGU-C-001": {
    status: "Verified Archive Record",
    title: "1988 Michael Jordan Game Worn Uniform",
    issueDate: "July 2026",
    documentId: "MJA-1988-LGU-PM-001",
    image: "assets/certificates/MJA-1988-LGU-C-001.jpg",
  },
  "MJA-9697-SP-HOME-J1-C-001": {
    status: "Verified Archive Record",
    title: "1996-97 Scottie Pippen Game Worn Jersey",
    issueDate: "March 2026",
    documentId: "MJA-9697-SP-HOME-J1-PM-01",
    image: "assets/certificates/MJA-9697-SP-HOME-J1-C-001.jpg",
  },
  "MJA-AJ-IV-7-26-004": {
    status: "Verified Archive Record",
    title: "Air Jordan IV",
    issueDate: "July 16 2026",
    documentId: "MJA-AJ-IV-7-26-004",
    image: "assets/certificates/MJA-AJ-IV-7-26-004.jpg",
  },
  "MJA-J89-7-26-003": {
    status: "Verified Archive Record",
    title: "1989-90 MICHAEL JORDAN HOME JERSEY",
    issueDate: "July 06 2026",
    documentId: "MJA-J89-7-26-003",
    image: "assets/certificates/MJA-J89-7-26-003.jpg",
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
