// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ================= LIGHTBOX =================
const imgs = document.querySelectorAll(".lightbox-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

if (imgs && lightbox && lightboxImg && closeBtn) {
    imgs.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.onclick = () => lightbox.style.display = "none";

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });
}

// ================= PRELOADER =================
window.addEventListener("load", () => {
    const pre = document.getElementById("preloader");
    if (pre) pre.style.display = "none";
});

// ================= THEME TOGGLE =================
const toggle = document.getElementById("theme-toggle");
if (toggle) {
    const saved = localStorage.getItem("bssraw-theme");
    if (saved === "light") {
        document.body.classList.add("light-theme");
        toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.body.classList.add("light-theme");
            localStorage.setItem("bssraw-theme", "light");
        } else {
            document.body.classList.remove("light-theme");
            localStorage.setItem("bssraw-theme", "dark");
        }
    });
}

// ================= 3D CARD TILT =================
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
            `rotateX(${y * -15}deg) rotateY(${x * 15}deg) scale(1.07)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
});

// =================================================
// ================= CONTACT MODAL =================
// =================================================

let contactSource = "";

function openModal(source) {
  contactSource = source;   // Instagram or WhatsApp
  document.getElementById("contactModal").style.display = "flex";
}


function closeModal() {
    document.getElementById("contactModal").style.display = "none";
}

// =================================================
// =========== SEND DATA → SHEETS → WHATSAPP =========
// =================================================

// ================= OPEN WHATSAPP =================
function sendWhatsApp() {
  const name = document.getElementById("cname").value.trim();
  const email = document.getElementById("cemail").value.trim();
  const msg = document.getElementById("cmessage").value.trim();

  if (!name || !email || !msg) {
    alert("Please fill all fields");
    return;
  }

  const data = {
    name,
    email,
    message: msg,
    source: contactSource
  };

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbye0QHFgX21k51xe-qW-bb70J8HS895Fb2bC03yYpuyuo3dilB8Sb-AYWMWbLBBxP17/exec";

  // ✅ IMPORTANT: no-cors + text/plain (avoids preflight)
  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data)
  })
    .then(() => {
      if (contactSource === "WhatsApp") {
        sendToWhatsApp(data);   
      } else {
        alert("Your message has been sent successfully!");
        closeModal();          
      }
    })

    .catch((err) => {
      alert("Error saving data. Please try again.");
      console.error(err);
    });
}

function sendToWhatsApp(data) {
  const phone = "918465958132";
  const text =
    `📸 New Contact — BssRaw Stories\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Message: ${data.message}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );

  closeModal();
}
