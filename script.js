/**
 * GAMA ENGINE - PORTFOLIO CORE SCRIPT 2026
 * Features: 3D Tilt, Persistent Theme, Project Rendering, Typing Effect
 */

// 1. PROJECT DATABASE (Easy to update)
const myProjects = [
    {
        title: "Serverless Image Pipeline",
        image: "assets/pipeline-diagram.webp", // Ensure you have images in assets
        desc: "AWS Lambda & S3 automation for image processing via Terraform.",
        tech: ["AWS", "Terraform", "Python"],
        link: "https://github.com/gama-engine/image-pipeline"
    },
    {
        title: "Cloud Networking Architecture",
        image: "assets/vpc-diagram.webp",
        desc: "Custom VPC with peering and secure subnetting strategy.",
        tech: ["VPC", "AWS", "IaC"],
        link: "https://github.com/gama-engine/vpc-peering"
    },
    {
        title: "Secure S3 Static Hosting",
        image: "assets/s3-diagram.webp",
        desc: "CloudFront + OAC integration for high-performance web hosting.",
        tech: ["S3", "CloudFront", "Security"],
        link: "https://github.com/gama-engine/s3-static-site"
    }
];

// 2. THEME ENGINE (Persistent)
const initTheme = () => {
    const themeBtn = document.getElementById("themeBtn");
    const savedTheme = localStorage.getItem("portfolio-theme");

    // Apply saved theme on load
    if (savedTheme === "light") {
        document.body.classList.add("light");
        if (themeBtn) themeBtn.textContent = "🌙";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light");
            const isLight = document.body.classList.contains("light");
            themeBtn.textContent = isLight ? "🌙" : "☀️";
            localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        });
    }
};

// 3. PROJECT RENDERER
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = myProjects.map(p => `
        <div class="project-card reveal">
            <div class="card-image-container">
                <img src="${p.image}" alt="${p.title}" class="project-diagram" loading="lazy" 
                     onerror="this.src='https://placehold.co/600x400/161b22/38bdf8?text=Architecture+Diagram'">
            </div>
            <div class="card-body">
                <h3>${p.title}</h3>
                <p style="color: var(--text-sec); margin-bottom: 1rem;">${p.desc}</p>
                <div style="margin-bottom: 1.5rem; display: flex; gap: 8px; flex-wrap: wrap;">
                    ${p.tech.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
                <a href="${p.link}" target="_blank" class="btn-secondary">View Architecture ↗</a>
            </div>
        </div>
    `).join('');
}

// 4. UTILITIES (Copy & Share)
const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.textContent = "Copied to clipboard!";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
};

function shareTo(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Madhu's Cloud & DevOps Portfolio!");
    let shareUrl = platform === 'linkedin'
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        : `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(shareUrl, '_blank');
}

function copyLink() {
    copyText(window.location.href);
}

// 5. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderProjects();

    // A. Hero Typing Effect
    const heroText = "Cloud & DevOps Enthusiast";
    const subtitle = document.querySelector(".hero-subtitle");
    if (subtitle) {
        let idx = 0;
        subtitle.textContent = "";
        const typing = () => {
            if (idx < heroText.length) {
                subtitle.textContent += heroText.charAt(idx);
                idx++;
                setTimeout(typing, 60);
            }
        };
        typing();
    }

    // B. 3D Tilt Effect (Desktop Only)
    if (window.innerWidth > 768) {
        document.addEventListener("mousemove", (e) => {
            const cards = document.querySelectorAll(".project-card, .skill-card, .matrix-card");
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                } else {
                    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
                }
            });
        });
    }

    // C. Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .reveal').forEach(el => revealObserver.observe(el));

    // D. Navbar Share Toggle
    const navShareBtn = document.getElementById('navShareBtn');
    const navShareMenu = document.getElementById('navShareMenu');
    if (navShareBtn && navShareMenu) {
        navShareBtn.onclick = (e) => {
            e.stopPropagation();
            navShareMenu.classList.toggle('active');
        };
        document.onclick = () => navShareMenu.classList.remove('active');
    }
});

// 6. DYNAMIC PARTICLES
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.animationDuration = (Math.random() * 10 + 10) + "s";
        p.style.opacity = Math.random() * 0.5;
        particlesContainer.appendChild(p);
    }
}

/* =========================
   AWS DEPLOYMENT LOADER LOGIC
========================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.progress-fill');
    const msg = document.getElementById('loader-msg');

    const messages = [
        "Pulling Terraform state...",
        "Provisioning VPC infrastructure...",
        "Configuring CloudFront OAC...",
        "Gama Engine Ready."
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;

        fill.style.width = `${progress}%`;

        // Update messages based on progress
        if (progress > 25 && msgIndex === 0) msgIndex = 1;
        if (progress > 60 && msgIndex === 1) msgIndex = 2;
        if (progress > 90 && msgIndex === 2) msgIndex = 3;
        msg.textContent = messages[msgIndex];

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('fade-out');
                // Optional: Trigger your hero typing effect here after load
            }, 500);
        }
    }, 200);
});

document
.querySelectorAll("a[href^='#']")
.forEach(a=>{

a.addEventListener("click",e=>{

e.preventDefault();

document
.querySelector(
a.getAttribute("href")
)
.scrollIntoView({

behavior:"smooth"

});

});

});


const philosophies = [
    {
        text: "कर्म ज्ञानात् श्रेष्ठम् | कर्म ज्ञानात् गरियः",
        meaning: "Action is superior to knowledge."
    },

];
let index = 0;

const textEl = document.getElementById("rotating-text");
const meaningEl = document.getElementById("rotating-meaning");

function updatePhilosophy() {
    // fade out
    textEl.style.opacity = 0;
    meaningEl.style.opacity = 0;

    setTimeout(() => {
        textEl.textContent = philosophies[index].text;
        meaningEl.textContent = philosophies[index].meaning;

        // fade in
        textEl.style.opacity = 1;
        meaningEl.style.opacity = 1;

        index = (index + 1) % philosophies.length;
    }, 500);
}

// initial load
updatePhilosophy();

// rotate every 3 seconds
setInterval(updatePhilosophy, 3000);